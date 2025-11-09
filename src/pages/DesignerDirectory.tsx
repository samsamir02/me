import { useState, useEffect } from 'react';
import { Filter, Search, Star, Award } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { supabase } from '../lib/supabase/client';

interface DesignerProfile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  location: string | null;
  bio: string;
  level: 'entry' | 'mid' | 'advanced';
  skills: string[];
  avg_rating: number;
  completed_jobs: number;
}

export function DesignerDirectory() {
  const [designers, setDesigners] = useState<DesignerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('');

  useEffect(() => {
    loadDesigners();
  }, []);

  const loadDesigners = async () => {
    setLoading(true);
    let query = supabase
      .from('designer_profiles')
      .select('*, profiles!inner(id, full_name, avatar_url, location, bio)');

    if (levelFilter) {
      query = query.eq('level', levelFilter);
    }

    const { data, error } = await query.order('avg_rating', { ascending: false });

    if (error) {
      console.error('Error loading designers:', error);
    } else {
      const designersData = data?.map((d: any) => ({
        id: d.user_id,
        full_name: d.profiles.full_name,
        avatar_url: d.profiles.avatar_url,
        location: d.profiles.location,
        bio: d.profiles.bio,
        level: d.level,
        skills: d.skills,
        avg_rating: d.avg_rating,
        completed_jobs: d.completed_jobs,
      })) || [];

      if (search) {
        setDesigners(designersData.filter(d => d.full_name.toLowerCase().includes(search.toLowerCase())));
      } else {
        setDesigners(designersData);
      }
    }
    setLoading(false);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'entry':
        return 'bg-blue-100 text-blue-800';
      case 'mid':
        return 'bg-teal-100 text-teal-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Designer Directory</h1>
        <p className="text-lg text-gray-600">
          Find and hire talented designers for your projects
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8 mb-8">
        <div className="lg:col-span-1">
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
                  Search by Name
                </label>
                <Input
                  type="text"
                  placeholder="Designer name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Level
                </label>
                <select
                  value={levelFilter}
                  onChange={(e) => {
                    setLevelFilter(e.target.value);
                    loadDesigners();
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                >
                  <option value="">All Levels</option>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <Button variant="secondary" className="w-full" onClick={loadDesigners}>
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </CardContent>
          </Card>
        </div>

        <main className="lg:col-span-3">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading designers...</p>
            </div>
          ) : designers.length === 0 ? (
            <div className="text-center py-12">
              <Award className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No designers found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {designers.map((designer) => (
                <Card key={designer.id} hover>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                          {designer.avatar_url ? (
                            <img src={designer.avatar_url} alt={designer.full_name} className="w-full h-full rounded-full object-cover" />
                          ) : (
                            <span className="text-white font-bold text-lg">{designer.full_name.charAt(0)}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900">{designer.full_name}</h3>
                          {designer.location && (
                            <p className="text-sm text-gray-600 mb-2">{designer.location}</p>
                          )}
                          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{designer.bio}</p>
                          <div className="flex flex-wrap gap-2">
                            {designer.skills.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${getLevelColor(designer.level)}`}>
                          {designer.level.charAt(0).toUpperCase() + designer.level.slice(1)}
                        </div>
                        <div className="flex items-center justify-end space-x-1 mb-3">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium text-gray-900">{designer.avg_rating.toFixed(1)}</span>
                        </div>
                        <p className="text-xs text-gray-500">{designer.completed_jobs} projects</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
