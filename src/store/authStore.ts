import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase/client';

interface Profile {
  id: string;
  role: 'designer' | 'client';
  full_name: string;
  bio: string;
  avatar_url: string | null;
  is_verified: boolean;
}

interface AuthStore {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  setLoading: (loading: boolean) => void;
  initialize: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  profile: null,
  loading: true,

  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ loading }),

  initialize: async () => {
    set({ loading: true });

    const { data: { user } } = await supabase.auth.getUser();
    set({ user });

    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      set({ profile });
    }

    set({ loading: false });

    supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        set({ user: session?.user ?? null });

        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();

          set({ profile });
        } else {
          set({ profile: null });
        }
      })();
    });
  },

  refreshProfile: async () => {
    const { user } = get();
    if (!user) return;

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    set({ profile });
  },
}));
