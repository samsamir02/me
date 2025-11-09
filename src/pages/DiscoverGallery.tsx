import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Star } from 'lucide-react';

const winningDesigns = [
  {
    id: 1,
    title: 'TechFlow Logo Design',
    category: 'Logo Design',
    designer: 'Alex Designer',
    rating: 5,
    image: 'https://images.pexels.com/photos/355952/caliper-mechanical-tools-metal-363-355952.jpeg?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    title: 'Modern Brand Identity',
    category: 'Brand Identity',
    designer: 'Sarah Creative',
    rating: 5,
    image: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    title: 'E-commerce Web Design',
    category: 'Web Design',
    designer: 'John Studio',
    rating: 4.8,
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?w=400&h=300&fit=crop',
  },
  {
    id: 4,
    title: 'Mobile App UI',
    category: 'App Design',
    designer: 'Emma Design',
    rating: 4.9,
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?w=400&h=300&fit=crop',
  },
  {
    id: 5,
    title: 'Packaging Design',
    category: 'Packaging',
    designer: 'Mike Creative',
    rating: 5,
    image: 'https://images.pexels.com/photos/4246196/pexels-photo-4246196.jpeg?w=400&h=300&fit=crop',
  },
  {
    id: 6,
    title: 'Social Media Campaign',
    category: 'Social Media',
    designer: 'Lisa Designer',
    rating: 4.7,
    image: 'https://images.pexels.com/photos/3808517/pexels-photo-3808517.jpeg?w=400&h=300&fit=crop',
  },
];

export function DiscoverGallery() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Discover Amazing Designs</h1>
        <p className="text-lg text-gray-600">
          Browse winning designs from our community of talented designers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {winningDesigns.map((design) => (
          <Card key={design.id} hover className="cursor-pointer overflow-hidden">
            <div className="aspect-square bg-gray-200 overflow-hidden">
              <img
                src={design.image}
                alt={design.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardContent className="p-4">
              <Badge variant="primary" className="mb-3">{design.category}</Badge>
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{design.title}</h3>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">{design.designer}</p>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-900">{design.rating}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
