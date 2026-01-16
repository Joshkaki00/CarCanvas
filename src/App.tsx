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
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold text-gray-900">
                  CarFuelCanvas
                </span>
              </Link>

              <div className="hidden sm:flex sm:space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2',
                      location.pathname === item.path
                        ? 'border-automotive-600 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
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

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            Senior Intensive Project by <span className="text-automotive-600 font-semibold">Joshkaki00</span> - Demonstrating CS Data Structures in Automotive ECUs
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
