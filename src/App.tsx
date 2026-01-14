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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold text-automotive-600 dark:text-automotive-400">
                  CarFuelCanvas
                </span>
              </Link>

              <div className="hidden sm:flex sm:space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                      location.pathname === item.path
                        ? 'text-automotive-600 dark:text-automotive-400 bg-automotive-50 dark:bg-automotive-900/20'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100',
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

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Senior Intensive Project by Joshkaki00 - Demonstrating CS Data Structures in Automotive ECUs
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
