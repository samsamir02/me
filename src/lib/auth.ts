import { supabase } from './supabase/client';

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  role: 'designer' | 'client';
}

export interface SignInData {
  email: string;
  password: string;
}

export const authService = {
  async signUp({ email, password, fullName, role }: SignUpData) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('Failed to create user');

    const { error: profileError } = await supabase.from('profiles').insert({
      id: authData.user.id,
      role,
      full_name: fullName,
      bio: '',
      is_verified: false,
    });

    if (profileError) throw profileError;

    if (role === 'designer') {
      const { error: designerError } = await supabase.from('designer_profiles').insert({
        user_id: authData.user.id,
        level: 'entry',
        skills: [],
        experience_years: 0,
        completed_jobs: 0,
        total_earnings: 0,
        avg_rating: 0,
      });
      if (designerError) throw designerError;
    } else {
      const { error: clientError } = await supabase.from('client_profiles').insert({
        user_id: authData.user.id,
        posted_projects: 0,
        total_spend: 0,
        avg_rating: 0,
      });
      if (clientError) throw clientError;
    }

    return authData;
  },

  async signIn({ email, password }: SignInData) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async updateRole(userId: string, newRole: 'designer' | 'client') {
    const { data, error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userId)
      .select()
      .maybeSingle();

    if (error) throw error;

    if (newRole === 'designer') {
      const { data: existingDesigner } = await supabase
        .from('designer_profiles')
        .select('user_id')
        .eq('user_id', userId)
        .maybeSingle();

      if (!existingDesigner) {
        await supabase.from('designer_profiles').insert({
          user_id: userId,
          level: 'entry',
          skills: [],
          experience_years: 0,
          completed_jobs: 0,
          total_earnings: 0,
          avg_rating: 0,
        });
      }
    } else {
      const { data: existingClient } = await supabase
        .from('client_profiles')
        .select('user_id')
        .eq('user_id', userId)
        .maybeSingle();

      if (!existingClient) {
        await supabase.from('client_profiles').insert({
          user_id: userId,
          posted_projects: 0,
          total_spend: 0,
          avg_rating: 0,
        });
      }
    }

    return data;
  },
};
