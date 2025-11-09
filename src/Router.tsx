import { ReactNode } from 'react';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { ContestsBrowse } from './pages/contests/ContestsBrowse';
import { CreateContest } from './pages/contests/CreateContest';
import { Dashboard } from './pages/Dashboard';
import { DiscoverGallery } from './pages/DiscoverGallery';
import { DesignerDirectory } from './pages/DesignerDirectory';
import { HelpCenter } from './pages/HelpCenter';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

interface RouteConfig {
  path: string;
  component: ReactNode;
  showLayout?: boolean;
}

const routes: RouteConfig[] = [
  { path: '/', component: <LandingPage />, showLayout: true },
  { path: '/login', component: <LoginPage />, showLayout: false },
  { path: '/signup', component: <SignupPage />, showLayout: false },
  { path: '/contests', component: <ContestsBrowse />, showLayout: true },
  { path: '/contests/create', component: <CreateContest />, showLayout: true },
  { path: '/dashboard', component: <Dashboard />, showLayout: true },
  { path: '/discover', component: <DiscoverGallery />, showLayout: true },
  { path: '/designers', component: <DesignerDirectory />, showLayout: true },
  { path: '/help', component: <HelpCenter />, showLayout: true },
  { path: '/terms', component: <TermsPage />, showLayout: true },
  { path: '/privacy', component: <PrivacyPage />, showLayout: true },
];

export function Router() {
  const path = window.location.pathname;
  const route = routes.find(r => r.path === path) || routes[0];

  if (route.showLayout === false) {
    return <>{route.component}</>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        {route.component}
      </main>
      <Footer />
    </div>
  );
}
