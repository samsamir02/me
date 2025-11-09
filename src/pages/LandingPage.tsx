import { ArrowRight, Trophy, Users, Shield, Zap, Star, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-red-50 via-white to-teal-50 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Where Creativity Meets
              <span className="block bg-gradient-to-r from-red-500 via-red-600 to-teal-500 bg-clip-text text-transparent">
                Opportunity
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              The professional design marketplace for Egypt and the world. Connect with top designers,
              launch contests, or find your next project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="primary" onClick={() => window.location.href = '/signup?role=client'}>
                Start a Contest
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => window.location.href = '/signup?role=designer'}>
                Join as Designer
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600 mt-1">Designers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600 mt-1">Contests</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-600 mt-1">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get your perfect design in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card hover>
              <CardContent className="text-center pt-8">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Launch Contest</h3>
                <p className="text-gray-600 leading-relaxed">
                  Describe your project, set your budget, and choose your package. Multiple designers
                  will compete to create your perfect design.
                </p>
              </CardContent>
            </Card>

            <Card hover>
              <CardContent className="text-center pt-8">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Receive Designs</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get dozens of unique designs from talented designers. Provide feedback and select
                  finalists for the final round.
                </p>
              </CardContent>
            </Card>

            <Card hover>
              <CardContent className="text-center pt-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Choose Winner</h3>
                <p className="text-gray-600 leading-relaxed">
                  Select your favorite design and work with the designer for final revisions. Get all
                  source files and formats.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose 77S Design?
            </h2>
            <p className="text-xl text-gray-600">
              The most trusted platform for design contests and projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Platform</h3>
              <p className="text-gray-600 text-sm">
                Your payments are protected until you're 100% satisfied with the final design.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Talented Designers</h3>
              <p className="text-gray-600 text-sm">
                Work with verified designers from entry to advanced levels across all categories.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Turnaround</h3>
              <p className="text-gray-600 text-sm">
                Get quality designs in just 7 days. Urgent options available for rush projects.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fair Pricing</h3>
              <p className="text-gray-600 text-sm">
                Transparent pricing with special discounts for Egyptian market. Pay only when satisfied.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-red-500 to-teal-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of satisfied clients and talented designers on 77S Design
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-red-600 hover:bg-gray-100"
              onClick={() => window.location.href = '/signup'}
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10"
              onClick={() => window.location.href = '/discover'}
            >
              View Gallery
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
