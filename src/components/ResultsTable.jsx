import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Crown, Zap, Target, TrendingUp, Info } from 'lucide-react';

const ResultsTable = ({ results }) => {
  if (!results || results.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Info className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No calculation results available</p>
      </div>
    );
  }

  // Find best method by cost
  const bestCost = Math.min(...results.map(r => r.cost));
  const bestChance = Math.max(...results.map(r => r.successChance));

  const formatCost = (cost) => {
    if (cost === Infinity) return '∞';
    return cost.toFixed(1);
  };

  const formatChance = (chance) => {
    if (chance === 0) return '0%';
    if (chance === 100) return '100%';
    return `${chance.toFixed(2)}%`;
  };

  const formatAttempts = (attempts) => {
    if (attempts === Infinity) return '∞';
    return attempts.toFixed(1);
  };

  const getMethodIcon = (method) => {
    if (method.includes('Vorici')) {
      return <Crown className="h-4 w-4 text-yellow-500" />;
    }
    return <Zap className="h-4 w-4 text-blue-500" />;
  };

  const getMethodBadge = (result) => {
    const badges = [];
    
    if (result.cost === bestCost) {
      badges.push(
        <Badge key="best-cost" variant="default" className="bg-green-500 hover:bg-green-600">
          <TrendingUp className="h-3 w-3 mr-1" />
          Best Cost
        </Badge>
      );
    }
    
    if (result.successChance === bestChance && result.successChance === 100) {
      badges.push(
        <Badge key="guaranteed" variant="default" className="bg-blue-500 hover:bg-blue-600">
          <Target className="h-3 w-3 mr-1" />
          Guaranteed
        </Badge>
      );
    }
    
    return badges;
  };

  return (
    <div className="space-y-4">
      {/* Mobile-friendly card layout */}
      <div className="block md:hidden space-y-3">
        {results.map((result, index) => (
          <Card key={index} className={`p-4 ${result.cost === bestCost ? 'ring-2 ring-primary' : ''}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {getMethodIcon(result.method)}
                <h3 className="font-semibold">{result.method}</h3>
              </div>
              <div className="flex flex-wrap gap-1">
                {getMethodBadge(result)}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">{result.description}</p>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Cost:</span>
                <div className="font-semibold text-lg">{formatCost(result.cost)} ⚡</div>
              </div>
              <div>
                <span className="text-muted-foreground">Success Rate:</span>
                <div className="font-semibold text-lg">{formatChance(result.successChance)}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Avg. Attempts:</span>
                <div className="font-semibold">{formatAttempts(result.averageAttempts)}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Std. Deviation:</span>
                <div className="font-semibold">{formatAttempts(result.standardDeviation)}</div>
              </div>
            </div>
            
            {result.type === 'vorici' && result.guaranteedCost && (
              <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Guaranteed Cost:</span>
                  <span>{result.guaranteedCost} ⚡</span>
                </div>
                <div className="flex justify-between">
                  <span>Remaining Cost:</span>
                  <span>{formatCost(result.remainingCost)} ⚡</span>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Desktop table layout */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-semibold">Method</th>
                <th className="text-left p-3 font-semibold">Description</th>
                <th className="text-right p-3 font-semibold">Cost (⚡)</th>
                <th className="text-right p-3 font-semibold">Success Rate</th>
                <th className="text-right p-3 font-semibold">Avg. Attempts</th>
                <th className="text-right p-3 font-semibold">Std. Dev.</th>
                <th className="text-center p-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr 
                  key={index} 
                  className={`border-b hover:bg-muted/50 transition-colors ${
                    result.cost === bestCost ? 'bg-primary/5 border-primary/20' : ''
                  }`}
                >
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {getMethodIcon(result.method)}
                      <span className="font-medium">{result.method}</span>
                    </div>
                  </td>
                  <td className="p-3 text-sm text-muted-foreground max-w-xs">
                    {result.description}
                  </td>
                  <td className="p-3 text-right">
                    <span className={`font-semibold ${result.cost === bestCost ? 'text-primary' : ''}`}>
                      {formatCost(result.cost)}
                    </span>
                    {result.type === 'vorici' && result.guaranteedCost && (
                      <div className="text-xs text-muted-foreground">
                        ({result.guaranteedCost} + {formatCost(result.remainingCost)})
                      </div>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <span className={`font-semibold ${result.successChance === 100 ? 'text-green-600' : ''}`}>
                      {formatChance(result.successChance)}
                    </span>
                  </td>
                  <td className="p-3 text-right font-mono">
                    {formatAttempts(result.averageAttempts)}
                  </td>
                  <td className="p-3 text-right font-mono">
                    {formatAttempts(result.standardDeviation)}
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {getMethodBadge(result)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <Info className="h-4 w-4" />
          Understanding the Results
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
          <div>
            <strong>Cost (⚡):</strong> Average chromatic orbs needed
          </div>
          <div>
            <strong>Success Rate:</strong> Probability of getting desired colors
          </div>
          <div>
            <strong>Avg. Attempts:</strong> Expected number of crafting attempts
          </div>
          <div>
            <strong>Std. Deviation:</strong> Variability in attempt count
          </div>
        </div>
        <div className="mt-3 pt-3 border-t text-xs">
          <p>
            <strong>Tip:</strong> Methods with lower cost are more economical. 
            Vorici recipes provide guaranteed results but may cost more upfront.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsTable;

