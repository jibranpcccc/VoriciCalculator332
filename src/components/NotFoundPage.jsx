import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Home, Calculator, HelpCircle, Info, Search, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Update page title for 404
    document.title = '404 - Page Not Found | Vorici Calculator';
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Page not found. Return to the Vorici Calculator homepage to continue using our Path of Exile socket coloring tools.');
    }

    // Add canonical URL for 404 page
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://ahhqpson.manus.space/404');
    }
  }, []);

  const quickLinks = [
    {
      title: 'Calculator',
      description: 'Calculate chromatic orb costs and success rates',
      icon: Calculator,
      path: '/',
      color: 'text-blue-600'
    },
    {
      title: 'Guide',
      description: 'Learn about Vorici crafting and socket mechanics',
      icon: Info,
      path: '/guide',
      color: 'text-green-600'
    },
    {
      title: 'FAQ',
      description: 'Find answers to common questions',
      icon: HelpCircle,
      path: '/faq',
      color: 'text-purple-600'
    },
    {
      title: 'About',
      description: 'Learn more about our calculator and team',
      icon: Info,
      path: '/about',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-6">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* 404 Header */}
        <div className="space-y-4">
          <div className="text-8xl font-bold text-primary/20">404</div>
          <h1 className="text-4xl font-bold text-foreground">Page Not Found</h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back to calculating socket colors!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate('/')} 
            size="lg"
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Go to Calculator
          </Button>
          <Button 
            onClick={() => navigate(-1)} 
            variant="outline" 
            size="lg"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Popular Pages
            </CardTitle>
            <CardDescription>
              Quick access to our most useful tools and information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickLinks.map((link, index) => (
                <Card 
                  key={index} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(link.path)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <link.icon className={`h-5 w-5 ${link.color} mt-0.5`} />
                      <div className="space-y-1">
                        <h3 className="font-semibold text-sm">{link.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {link.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="bg-muted/30">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Looking for something specific?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Our Vorici Calculator helps Path of Exile players optimize their socket coloring strategy. 
              If you were looking for a specific feature, try these popular sections:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="outline">Socket Calculations</Badge>
              <Badge variant="outline">Vorici Recipes</Badge>
              <Badge variant="outline">Chromatic Orb Costs</Badge>
              <Badge variant="outline">Crafting Guide</Badge>
              <Badge variant="outline">FAQ</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-sm text-muted-foreground">
          <p>
            If you believe this is an error, please check the URL or return to our homepage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

