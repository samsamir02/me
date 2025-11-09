import { useState, useEffect } from 'react';
import { Filter, Search, Trophy, Clock, Users } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { supabase } from '../../lib/supabase/client';
import { formatCurrency, formatRelativeTime, getDaysRemaining } from '../../lib/utils';

interface Contest {
  id: string;
  title: string;
  description: string;
  category: string;
  prize_amount_usd: number;
  prize_amount_egp: number;
  status: string;
  contest_type: string;
  end_date: string;
  created_at: string;
  client_id: string;
}

export function ContestsBrowse() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [contestType, setContestType] = useState('');

  useEffect(() => {
    loadContests();
  }, []);

  const loadContests = async () => {
    setLoading(true);
    let query = supabase.from('contests').select('*').eq('status', 'active');

    if (search) {
      query = query.ilike('title', `%${search}%`);
    }
    if (category) {
      query = query.eq('category', category);
    }
    if (contestType) {
      query = query.eq('contest_type', contestType);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading contests:', error);
    } else {
      setContests(data || []);
    }
    setLoading(false);
  };

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

  const contestTypes = [
    { label: 'Standard', value: 'standard' },
    { label: 'Blind', value: 'blind' },
    { label: 'Urgent', value: 'urgent' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Browse Contests</h1>
        <p className="text-lg text-gray-600">
          Find design contests that match your skills and interests
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <Input
                  type="text"
                  placeholder="Contest title..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    loadContests();
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    loadContests();
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={contestType}
                  onChange={(e) => {
                    setContestType(e.target.value);
                    loadContests();
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                >
                  <option value="">All Types</option>
                  {contestTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <Button variant="secondary" className="w-full" onClick={loadContests}>
                <Search className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </CardContent>
          </Card>
        </aside>

        <main className="lg:col-span-3 space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading contests...</p>
            </div>
          ) : contests.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No contests found</p>
            </div>
          ) : (
            contests.map((contest) => (
              <Card key={contest.id} hover>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {contest.title}
                      </h2>
                      <p className="text-gray-600 line-clamp-2">
                        {contest.description}
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-3xl font-bold bg-gradient-to-r from-red-500 to-teal-500 bg-clip-text text-transparent">
                        {formatCurrency(contest.prize_amount_usd, 'USD')}
                      </div>
                      <div className="text-sm text-gray-500">
                        or {formatCurrency(contest.prize_amount_egp, 'EGP')}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="primary">{contest.category}</Badge>
                    <Badge variant="secondary">{contest.contest_type}</Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-200 mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center text-red-500 mb-1">
                        <Clock className="w-4 h-4 mr-1" />
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {getDaysRemaining(contest.end_date)}d left
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center text-teal-500 mb-1">
                        <Users className="w-4 h-4 mr-1" />
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        Active
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">
                        Posted {formatRelativeTime(contest.created_at)}
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    onClick={() => (window.location.href = `/contests/${contest.id}`)}
                  >
                    View Contest
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </main>
      </div>
    </div>
  );
}
