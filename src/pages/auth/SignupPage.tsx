import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UserPlus, Chrome, Briefcase, Palette } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { authService } from '../../lib/auth';

const signupSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['designer', 'client']),
});

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState<'designer' | 'client'>('client');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: 'client',
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      setIsLoading(true);
      setError('');
      await authService.signUp(data);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError('');
      await authService.signInWithGoogle();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in with Google');
      setIsLoading(false);
    }
  };

  const handleRoleSelect = (role: 'designer' | 'client') => {
    setSelectedRole(role);
    setValue('role', role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-teal-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">77</span>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Join 77S Design
          </h2>
          <p className="text-gray-600">
            Create your account and start your journey
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              I want to
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleRoleSelect('client')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedRole === 'client'
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Briefcase className={`w-6 h-6 mx-auto mb-2 ${selectedRole === 'client' ? 'text-red-500' : 'text-gray-400'}`} />
                <div className="text-sm font-medium text-gray-900">Hire Designers</div>
                <div className="text-xs text-gray-500 mt-1">I'm a client</div>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('designer')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedRole === 'designer'
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Palette className={`w-6 h-6 mx-auto mb-2 ${selectedRole === 'designer' ? 'text-teal-500' : 'text-gray-400'}`} />
                <div className="text-sm font-medium text-gray-900">Work on Projects</div>
                <div className="text-xs text-gray-500 mt-1">I'm a designer</div>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input type="hidden" {...register('role')} />

            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              error={errors.fullName?.message}
              {...register('fullName')}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Create a strong password"
              error={errors.password?.message}
              helperText="Must be at least 6 characters"
              {...register('password')}
            />

            <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
              <UserPlus className="w-5 h-5 mr-2" />
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-red-500 hover:text-red-600">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
