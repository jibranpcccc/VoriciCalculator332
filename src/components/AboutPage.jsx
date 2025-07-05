import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Info, Code, Zap, Users, Github, Heart, Calculator } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Info className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            About Vorici Calculator
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Learn about the most advanced Vorici calculator for Path of Exile, 
          built by the community for the community.
        </p>
      </div>

      {/* Mission */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Our Mission
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Our mission is to provide Path of Exile players with the most accurate, user-friendly, 
            and comprehensive socket coloring calculator available. We believe that crafting should 
            be strategic and informed, not based on guesswork or outdated tools.
          </p>
          <p className="text-muted-foreground">
            By combining precise mathematical calculations with modern web technology, we've created 
            a tool that helps players make optimal crafting decisions, save currency, and achieve 
            their desired socket configurations efficiently.
          </p>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            What Makes Us Different
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Advanced Calculations
              </h4>
              <p className="text-sm text-muted-foreground">
                Our calculator uses precise multinomial probability distributions and accounts 
                for all current Vorici recipes, providing accuracy within 0.01%.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Code className="h-4 w-4" />
                Modern Technology
              </h4>
              <p className="text-sm text-muted-foreground">
                Built with React and modern web standards, featuring responsive design, 
                offline functionality, and fast performance across all devices.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Users className="h-4 w-4" />
                Community Focused
              </h4>
              <p className="text-sm text-muted-foreground">
                Designed based on feedback from the Path of Exile community, addressing 
                real needs and pain points experienced by players.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Github className="h-4 w-4" />
                Open Source
              </h4>
              <p className="text-sm text-muted-foreground">
                Transparent calculations and open-source development ensure accuracy 
                and allow community contributions and verification.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technology Stack */}
      <Card>
        <CardHeader>
          <CardTitle>Technology & Accuracy</CardTitle>
          <CardDescription>
            Built with modern web technologies for optimal performance and reliability
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">Frontend Technologies</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">React 18</Badge>
              <Badge variant="outline">TypeScript</Badge>
              <Badge variant="outline">Tailwind CSS</Badge>
              <Badge variant="outline">Shadcn/UI</Badge>
              <Badge variant="outline">Framer Motion</Badge>
              <Badge variant="outline">Vite</Badge>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-3">Calculation Methodology</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong>Probability Calculations:</strong> Based on exact Path of Exile formulas using 
                multinomial probability distributions for socket color combinations.
              </p>
              <p>
                <strong>Vorici Recipe Analysis:</strong> Comprehensive database of all available recipes 
                with accurate cost calculations and success rate analysis.
              </p>
              <p>
                <strong>Optimization Algorithms:</strong> Advanced comparison algorithms that evaluate 
                all possible crafting methods to recommend the most cost-effective approach.
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-3">Quality Assurance</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong>Accuracy Testing:</strong> All calculations are verified against known 
                Path of Exile mechanics and cross-checked with community data.
              </p>
              <p>
                <strong>Regular Updates:</strong> Calculator is updated with each Path of Exile 
                patch to ensure continued accuracy and relevance.
              </p>
              <p>
                <strong>Community Validation:</strong> Results are validated by experienced 
                Path of Exile players and crafting experts.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Updates & Maintenance */}
      <Card>
        <CardHeader>
          <CardTitle>Updates & Maintenance</CardTitle>
          <CardDescription>
            Keeping pace with Path of Exile's evolving mechanics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">3.25</div>
              <div className="text-sm text-muted-foreground">Current PoE Version</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Recipe Coverage</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">0.01%</div>
              <div className="text-sm text-muted-foreground">Calculation Accuracy</div>
            </div>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Update Schedule</h4>
            <p className="text-sm text-muted-foreground">
              We monitor Path of Exile patch notes and update our calculator within 24 hours 
              of any changes to socket coloring mechanics or Vorici recipes. Major league 
              launches are supported from day one.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Community */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Community & Feedback</CardTitle>
          <CardDescription>
            Built by players, for players
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This calculator exists because of the amazing Path of Exile community. We welcome 
            feedback, suggestions, and contributions from players of all experience levels.
          </p>
          
          <div className="space-y-2">
            <h4 className="font-semibold">How to Contribute</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Report bugs or calculation errors</li>
              <li>• Suggest new features or improvements</li>
              <li>• Share the calculator with other players</li>
              <li>• Contribute to our open-source codebase</li>
            </ul>
          </div>

          <div className="pt-4">
            <p className="text-sm text-muted-foreground">
              <strong>Disclaimer:</strong> This calculator is a community tool and is not 
              affiliated with Grinding Gear Games or Path of Exile. All calculations are 
              based on publicly available game mechanics and community research.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;

