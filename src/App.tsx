import { type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home } from '@routes/Home';
import { LookupPage } from '@routes/LookupPage';
import { VisualizationPage } from '@routes/VisualizationPage';
import { ComparisonPage } from '@routes/ComparisonPage';
import { cn } from '@shared/utils/cn';

function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/lookup', label: 'Lookup Tables' },
    { path: '/visualization', label: 'Visualization' },
    { path: '/comparison', label: 'Performance' },
  ];

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      <nav className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-dashboard-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <Link to="/" className="flex items-center group">
                <span className="text-xl font-bold font-digital text-automotive-600 group-hover:text-automotive-500 transition-colors tracking-wide">
                  CarFuelCanvas
                </span>
              </Link>

              <div className="hidden sm:flex sm:space-x-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg',
                      location.pathname === item.path
                        ? 'text-white bg-automotive-500 shadow-lg border-2 border-automotive-600'
                        : 'text-gray-600 bg-gray-100 border-2 border-transparent',
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>

      <footer className="bg-white/60 backdrop-blur-sm border-t border-dashboard-border mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-metallic-silver">
            Senior Intensive Project by <span className="text-automotive-600 font-semibold">Joshua Kakinuki</span> - Demonstrating CS Data Structures in Automotive ECUs
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lookup" element={<LookupPage />} />
          <Route path="/visualization" element={<VisualizationPage />} />
          <Route path="/comparison" element={<ComparisonPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
