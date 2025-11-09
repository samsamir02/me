import { useAuthStore } from '../store/authStore';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { TrendingUp, Trophy, Users, Wallet, Plus } from 'lucide-react';

export function Dashboard() {
  const { user, profile } = useAuthStore();

  if (!user || !profile) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-center text-gray-600">Please log in to view your dashboard</p>
      </div>
    );
  }

  const isDesigner = profile.role === 'designer';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back, {profile.full_name}!
        </h1>
        <p className="text-lg text-gray-600">
          {isDesigner ? 'Check your contests and earnings' : 'Manage your projects and submissions'}
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  {isDesigner ? 'Completed Jobs' : 'Posted Projects'}
                </p>
                <p className="text-3xl font-bold text-gray-900">0</p>
              </div>
              <Trophy className="w-12 h-12 text-red-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  {isDesigner ? 'Total Earnings' : 'Total Spent'}
                </p>
                <p className="text-3xl font-bold text-gray-900">$0.00</p>
              </div>
              <Wallet className="w-12 h-12 text-teal-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Average Rating</p>
                <p className="text-3xl font-bold text-gray-900">—</p>
              </div>
              <TrendingUp className="w-12 h-12 text-blue-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active</p>
                <p className="text-3xl font-bold text-gray-900">0</p>
              </div>
              <Users className="w-12 h-12 text-purple-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-gray-500">No recent activity yet</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {isDesigner ? (
                <>
                  <Button variant="primary" className="w-full" onClick={() => window.location.href = '/contests'}>
                    Browse Contests
                  </Button>
                  <Button variant="secondary" className="w-full" onClick={() => window.location.href = '/projects'}>
                    Browse Projects
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="primary" className="w-full" onClick={() => window.location.href = '/contests/create'}>
                    <Plus className="w-4 h-4 mr-2" />
                    Start Contest
                  </Button>
                  <Button variant="secondary" className="w-full" onClick={() => window.location.href = '/projects/create'}>
                    <Plus className="w-4 h-4 mr-2" />
                    Post Project
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-xl font-bold text-gray-900">Help & Resources</h3>
            </CardHeader>
            <CardContent className="space-y-2">
              <a href="/help" className="block text-sm text-red-600 hover:text-red-700">
                Help Center
              </a>
              <a href="/terms" className="block text-sm text-red-600 hover:text-red-700">
                Terms of Service
              </a>
              <a href="/settings" className="block text-sm text-red-600 hover:text-red-700">
                Account Settings
              </a>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
