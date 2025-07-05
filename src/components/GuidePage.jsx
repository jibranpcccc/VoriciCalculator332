import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Target, Zap, Crown, AlertTriangle, TrendingUp, Calculator } from 'lucide-react';
import voriciMaster from '../assets/vorici-master.png';
import chromaticOrb from '../assets/chromatic-orb.jpg';
import craftingBench from '../assets/crafting-bench.png';

const GuidePage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Complete Vorici Crafting Guide
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Master socket coloring in Path of Exile with our comprehensive guide to Vorici crafting methods, 
          strategies, and cost optimization techniques.
        </p>
      </div>

      {/* Introduction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            What is Vorici Crafting?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <img 
              src={voriciMaster} 
              alt="Vorici, Master Assassin" 
              className="w-32 h-32 object-cover rounded-lg border"
            />
            <div className="flex-1 space-y-3">
              <p className="text-muted-foreground">
                Vorici crafting refers to the socket coloring methods available through the crafting bench in Path of Exile. 
                Named after Vorici, the Master Assassin, these recipes allow players to guarantee specific socket colors 
                on their items for a fixed cost in chromatic orbs.
              </p>
              <p className="text-muted-foreground">
                Unlike random chromatic orb rolling, Vorici recipes provide guaranteed results, making them essential 
                for achieving difficult color combinations, especially "off-colors" that would otherwise be extremely 
                expensive to obtain through pure chance.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Socket Color Basics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Understanding Socket Color Mechanics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2"></div>
              <h3 className="font-semibold text-red-600">Red Sockets</h3>
              <p className="text-sm text-muted-foreground">Strength Requirement</p>
              <p className="text-xs text-muted-foreground mt-1">
                Higher strength increases red socket probability
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2"></div>
              <h3 className="font-semibold text-green-600">Green Sockets</h3>
              <p className="text-sm text-muted-foreground">Dexterity Requirement</p>
              <p className="text-xs text-muted-foreground mt-1">
                Higher dexterity increases green socket probability
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2"></div>
              <h3 className="font-semibold text-blue-600">Blue Sockets</h3>
              <p className="text-sm text-muted-foreground">Intelligence Requirement</p>
              <p className="text-xs text-muted-foreground mt-1">
                Higher intelligence increases blue socket probability
              </p>
            </div>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Probability Formula</h4>
            <p className="text-sm text-muted-foreground">
              Socket color probability is determined by the ratio of attribute requirements:
            </p>
            <div className="mt-2 font-mono text-sm bg-background p-2 rounded border">
              Red Probability = Strength / (Strength + Dexterity + Intelligence)
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vorici Recipes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5" />
            Vorici Recipe Table
          </CardTitle>
          <CardDescription>
            Complete list of available Vorici crafting recipes with costs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-semibold">Recipe</th>
                  <th className="text-left p-2 font-semibold">Description</th>
                  <th className="text-right p-2 font-semibold">Cost (Chromatic Orbs)</th>
                  <th className="text-center p-2 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b">
                  <td className="p-2 font-mono">1R</td>
                  <td className="p-2">At least 1 Red Socket</td>
                  <td className="p-2 text-right">4</td>
                  <td className="p-2 text-center"><Badge variant="outline">Basic</Badge></td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">1G</td>
                  <td className="p-2">At least 1 Green Socket</td>
                  <td className="p-2 text-right">4</td>
                  <td className="p-2 text-center"><Badge variant="outline">Basic</Badge></td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">1B</td>
                  <td className="p-2">At least 1 Blue Socket</td>
                  <td className="p-2 text-right">4</td>
                  <td className="p-2 text-center"><Badge variant="outline">Basic</Badge></td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">2R</td>
                  <td className="p-2">At least 2 Red Sockets</td>
                  <td className="p-2 text-right">25</td>
                  <td className="p-2 text-center"><Badge variant="secondary">Intermediate</Badge></td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">2G</td>
                  <td className="p-2">At least 2 Green Sockets</td>
                  <td className="p-2 text-right">25</td>
                  <td className="p-2 text-center"><Badge variant="secondary">Intermediate</Badge></td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">2B</td>
                  <td className="p-2">At least 2 Blue Sockets</td>
                  <td className="p-2 text-right">25</td>
                  <td className="p-2 text-center"><Badge variant="secondary">Intermediate</Badge></td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">3R</td>
                  <td className="p-2">At least 3 Red Sockets</td>
                  <td className="p-2 text-right">120</td>
                  <td className="p-2 text-center"><Badge variant="destructive">Advanced</Badge></td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">3G</td>
                  <td className="p-2">At least 3 Green Sockets</td>
                  <td className="p-2 text-right">120</td>
                  <td className="p-2 text-center"><Badge variant="destructive">Advanced</Badge></td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">3B</td>
                  <td className="p-2">At least 3 Blue Sockets</td>
                  <td className="p-2 text-right">120</td>
                  <td className="p-2 text-center"><Badge variant="destructive">Advanced</Badge></td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">1R1G</td>
                  <td className="p-2">At least 1 Red and 1 Green</td>
                  <td className="p-2 text-right">15</td>
                  <td className="p-2 text-center"><Badge variant="secondary">Hybrid</Badge></td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">1R1B</td>
                  <td className="p-2">At least 1 Red and 1 Blue</td>
                  <td className="p-2 text-right">15</td>
                  <td className="p-2 text-center"><Badge variant="secondary">Hybrid</Badge></td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">1G1B</td>
                  <td className="p-2">At least 1 Green and 1 Blue</td>
                  <td className="p-2 text-right">15</td>
                  <td className="p-2 text-center"><Badge variant="secondary">Hybrid</Badge></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Crafting Strategies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Advanced Crafting Strategies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-600">Cost-Effective Approaches</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Use our calculator to compare all methods</li>
                <li>• Consider hybrid recipes for mixed colors</li>
                <li>• Factor in remaining socket probability</li>
                <li>• Account for your budget constraints</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-600">Off-Color Techniques</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Vorici recipes excel at off-colors</li>
                <li>• Calculate probability vs. guaranteed cost</li>
                <li>• Consider item value vs. crafting cost</li>
                <li>• Use step-by-step approach for complex colors</li>
              </ul>
            </div>
          </div>

          <Separator />

          <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Pro Tip</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                  Always use our Vorici calculator before crafting. It compares all available methods 
                  and recommends the most cost-effective approach for your specific item and desired colors.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Common Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle>Common Crafting Scenarios</CardTitle>
          <CardDescription>
            Real-world examples of when to use different Vorici methods
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Strength-based Armor (3R3G)</h4>
              <p className="text-sm text-muted-foreground mb-2">
                High strength requirement makes green sockets expensive
              </p>
              <Badge variant="outline" className="text-xs">Recommended: Vorici 3G</Badge>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Intelligence Weapon (2B2R)</h4>
              <p className="text-sm text-muted-foreground mb-2">
                High intelligence makes red sockets very rare
              </p>
              <Badge variant="outline" className="text-xs">Recommended: Vorici 2R</Badge>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Balanced Requirements (2R2G2B)</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Equal requirements make chromatic rolling viable
              </p>
              <Badge variant="outline" className="text-xs">Compare: Chromatic vs Vorici</Badge>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Single Off-Color (5R1B)</h4>
              <p className="text-sm text-muted-foreground mb-2">
                One difficult color among many easy ones
              </p>
              <Badge variant="outline" className="text-xs">Recommended: Vorici 1B</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calculator CTA */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6 text-center">
          <Calculator className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Ready to Calculate?</h3>
          <p className="text-muted-foreground mb-4">
            Use our advanced Vorici calculator to find the best crafting method for your specific item.
          </p>
          <a 
            href="#calculator" 
            className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 text-sm font-medium transition-colors"
          >
            Open Calculator
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuidePage;

