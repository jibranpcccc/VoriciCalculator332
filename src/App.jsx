import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Calculator, BookOpen, HelpCircle, Info, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import VoriciCalculatorComponent from './components/VoriciCalculator';
import GuidePage from './components/GuidePage';
import EnhancedFAQPage from './components/FAQPage';
import AboutPage from './components/AboutPage';
import NotFoundPage from './components/NotFoundPage';
import './App.css';

// Navigation component
const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Calculator', icon: Calculator },
    { path: '/guide', label: 'Guide', icon: BookOpen },
    { path: '/faq', label: 'FAQ', icon: HelpCircle },
    { path: '/about', label: 'About', icon: Info },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Vorici Calculator
              </span>
              <div className="text-xs text-muted-foreground">Path of Exile Socket Tool</div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.path}
                  asChild
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Link to={item.path}>
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                    {item.path === '/faq' && (
                      <Badge variant="secondary" className="ml-1 text-xs">16</Badge>
                    )}
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Footer component
const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="text-lg font-bold">Vorici Calculator</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The ultimate tool for Path of Exile socket coloring calculations.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Calculator</Link></li>
              <li><Link to="/guide" className="text-muted-foreground hover:text-foreground transition-colors">Crafting Guide</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://www.pathofexile.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  Path of Exile <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://pathofexile.fandom.com/wiki/Path_of_Exile_Wiki" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  PoE Wiki <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.reddit.com/r/pathofexile/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  PoE Reddit <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>© 2025 Manus AI</li>
              <li>Path of Exile © Grinding Gear Games</li>
              <li>This tool is not affiliated with GGG</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Built with ❤️ for the Path of Exile community
          </p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <Badge variant="outline" className="text-xs">
              Updated for PoE 3.25
            </Badge>
            <Badge variant="outline" className="text-xs">
              v1.0.0
            </Badge>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App component
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<VoriciCalculatorComponent />} />
            <Route path="/guide" element={<GuidePage />} />
            <Route path="/faq" element={<EnhancedFAQPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

