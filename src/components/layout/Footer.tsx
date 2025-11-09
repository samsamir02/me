import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">77</span>
              </div>
              <span className="text-2xl font-bold text-white">77S Design</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              The professional design marketplace connecting talented designers with clients worldwide.
              Quality designs, fair pricing, secure platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">For Clients</h3>
            <ul className="space-y-2">
              <li><a href="/contests/create" className="hover:text-white transition-colors">Start Contest</a></li>
              <li><a href="/discover" className="hover:text-white transition-colors">Browse Designs</a></li>
              <li><a href="/designers" className="hover:text-white transition-colors">Find Designers</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">For Designers</h3>
            <ul className="space-y-2">
              <li><a href="/contests" className="hover:text-white transition-colors">Browse Contests</a></li>
              <li><a href="/discover" className="hover:text-white transition-colors">Inspiration</a></li>
              <li><a href="/help" className="hover:text-white transition-colors">Resources</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; 2024 77S Design. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
              Terms
            </a>
            <a href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
              Privacy
            </a>
            <a href="/help" className="text-sm text-gray-400 hover:text-white transition-colors">
              Help Center
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
