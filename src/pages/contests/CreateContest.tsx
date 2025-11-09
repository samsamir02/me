import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Upload } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useAuthStore } from '../../store/authStore';
import { supabase } from '../../lib/supabase/client';

const createContestSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  category: z.string().min(1, 'Please select a category'),
  requirements: z.string().min(20, 'Requirements must be at least 20 characters'),
  formatType: z.enum(['rgb', 'cmyk']),
  contestType: z.enum(['standard', 'blind', 'urgent']),
  packageTier: z.enum(['bronze', 'silver', 'gold']),
  prizeAmountUsd: z.number().min(100, 'Minimum prize is $100'),
});

type CreateContestFormData = z.infer<typeof createContestSchema>;

const categories = [
  'Logo Design',
  'Brand Identity',
  'Web Design',
  'App Design',
  'Illustration',
  'Packaging',
  'Print Design',
  'Social Media',
];

const pricing = {
  bronze: { title: 'Bronze', usd: 300, finalists: 3, days: 7 },
  silver: { title: 'Silver', usd: 600, finalists: 5, days: 7 },
  gold: { title: 'Gold', usd: 1200, finalists: 10, days: 7 },
};

export function CreateContest() {
  const { user, profile } = useAuthStore();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<'bronze' | 'silver' | 'gold'>('silver');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CreateContestFormData>({
    resolver: zodResolver(createContestSchema),
    defaultValues: {
      formatType: 'rgb',
      contestType: 'standard',
      packageTier: 'silver',
      prizeAmountUsd: 600,
    },
  });

  const contestType = watch('contestType');
  const prizeAmount = watch('prizeAmountUsd');

  if (!user || profile?.role !== 'client') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-red-600 font-medium">
            Only clients can create contests. Please switch to client role.
          </p>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: CreateContestFormData) => {
    try {
      setIsSubmitting(true);

      const now = new Date();
      const round1End = new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000);
      const end = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      const { error } = await supabase.from('contests').insert({
        client_id: user.id,
        title: data.title,
        description: data.description,
        category: data.category,
        requirements: data.requirements,
        format_type: data.formatType,
        contest_type: data.contestType,
        package_tier: data.packageTier,
        prize_amount_usd: data.prizeAmountUsd,
        prize_amount_egp: data.prizeAmountUsd * 30.5,
        status: 'active',
        start_date: now.toISOString(),
        round1_end_date: round1End.toISOString(),
        end_date: end.toISOString(),
      });

      if (error) throw error;

      window.location.href = '/contests';
    } catch (err) {
      console.error('Error creating contest:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Launch Your Contest</h1>
        <p className="text-lg text-gray-600">
          Describe your project and let talented designers compete
        </p>
      </div>

      {step === 1 ? (
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold text-gray-900">Choose Your Package</h2>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {Object.entries(pricing).map(([key, pkg]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedPackage(key as 'bronze' | 'silver' | 'gold')}
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      selectedPackage === key
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{pkg.title}</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-600">Starting From</div>
                        <div className="text-3xl font-bold text-gray-900">${pkg.usd}</div>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center text-gray-700">
                          ✓ Up to {pkg.finalists} finalists
                        </li>
                        <li className="flex items-center text-gray-700">
                          ✓ {pkg.days} day contest
                        </li>
                        <li className="flex items-center text-gray-700">
                          ✓ Premium support
                        </li>
                      </ul>
                    </div>
                  </button>
                ))}
              </div>
              <Button
                variant="primary"
                className="w-full mt-8"
                onClick={() => setStep(2)}
              >
                Continue to Details
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold text-gray-900">Contest Details</h2>
            </CardHeader>
            <CardContent className="space-y-6">
              <Input
                label="Contest Title"
                placeholder="e.g., Modern Logo Design for Tech Startup"
                error={errors.title?.message}
                {...register('title')}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Describe your project, vision, and any specific requirements..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows={6}
                  {...register('description')}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    {...register('category')}
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contest Type
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    {...register('contestType')}
                  >
                    <option value="standard">Standard</option>
                    <option value="blind">Blind</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Requirements
                </label>
                <textarea
                  placeholder="Specify technical requirements, design preferences, file formats, etc."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows={4}
                  {...register('requirements')}
                />
                {errors.requirements && (
                  <p className="mt-1 text-sm text-red-600">{errors.requirements.message}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Format
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    {...register('formatType')}
                  >
                    <option value="rgb">RGB</option>
                    <option value="cmyk">CMYK</option>
                  </select>
                </div>

                <Input
                  label="Prize Amount (USD)"
                  type="number"
                  min="100"
                  placeholder="600"
                  error={errors.prizeAmountUsd?.message}
                  {...register('prizeAmountUsd', { valueAsNumber: true })}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-teal-200 bg-teal-50">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Contest Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Package Tier</span>
                  <span className="font-medium">{pricing[selectedPackage].title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Prize Amount</span>
                  <span className="font-medium">${prizeAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">7 days (4 + 3 rounds)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform Fee</span>
                  <span className="font-medium text-red-600">40% of prize</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button type="submit" variant="primary" className="flex-1" isLoading={isSubmitting}>
              <Plus className="w-5 h-5 mr-2" />
              Launch Contest
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
