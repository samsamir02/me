import { useState } from 'react';
import { Menu, X, Bell, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';
import { authService } from '../../lib/auth';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile } = useAuthStore();

  const handleSignOut = async () => {
    await authService.signOut();
    window.location.href = '/';
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">77</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-teal-500 bg-clip-text text-transparent">
                77S Design
              </span>
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="/contests" className="text-gray-700 hover:text-red-500 transition-colors">
              Contests
            </a>
            <a href="/designers" className="text-gray-700 hover:text-red-500 transition-colors">
              Designers
            </a>
            <a href="/discover" className="text-gray-700 hover:text-red-500 transition-colors">
              Discover
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user && profile ? (
              <>
                <a href="/notifications" className="relative p-2 text-gray-600 hover:text-red-500 transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </a>
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-teal-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{profile.full_name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <a href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Dashboard
                    </a>
                    <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Settings
                    </a>
                    <hr className="my-2" />
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => window.location.href = '/login'}>
                  Sign In
                </Button>
                <Button variant="primary" onClick={() => window.location.href = '/signup'}>
                  Get Started
                </Button>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 text-gray-600 hover:text-red-500"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <a href="/contests" className="text-gray-700 hover:text-red-500 transition-colors">
                Contests
              </a>
              <a href="/designers" className="text-gray-700 hover:text-red-500 transition-colors">
                Designers
              </a>
              <a href="/discover" className="text-gray-700 hover:text-red-500 transition-colors">
                Discover
              </a>
              {user && profile ? (
                <>
                  <a href="/dashboard" className="text-gray-700 hover:text-red-500 transition-colors">
                    Dashboard
                  </a>
                  <button onClick={handleSignOut} className="text-left text-red-600 hover:text-red-700">
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => window.location.href = '/login'}>
                    Sign In
                  </Button>
                  <Button variant="primary" onClick={() => window.location.href = '/signup'}>
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
