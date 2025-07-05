import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Shuffle, Zap, Target } from 'lucide-react';
import InteractiveSVGSocket from './InteractiveSVGSocket';

const EnhancedSocketVisualizer = ({ 
  sockets, 
  desiredColors, 
  isCalculating = false,
  onSocketClick 
}) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'item'
  const [animationEnabled, setAnimationEnabled] = useState(true);
  const [highlightMode, setHighlightMode] = useState('desired'); // 'desired', 'all', 'none'

  // Generate socket pattern based on desired colors
  const generateSocketPattern = () => {
    const pattern = [];
    const { red, green, blue } = desiredColors;
    
    // Add desired colors first
    for (let i = 0; i < red; i++) pattern.push('R');
    for (let i = 0; i < green; i++) pattern.push('G');
    for (let i = 0; i < blue; i++) pattern.push('B');
    
    // Fill remaining sockets with random colors (for visualization)
    while (pattern.length < sockets) {
      const colors = ['R', 'G', 'B'];
      const weights = [red || 1, green || 1, blue || 1];
      const totalWeight = weights.reduce((a, b) => a + b, 0);
      const random = Math.random() * totalWeight;
      
      let cumulative = 0;
      for (let i = 0; i < colors.length; i++) {
        cumulative += weights[i];
        if (random <= cumulative) {
          pattern.push(colors[i]);
          break;
        }
      }
    }
    
    return pattern;
  };

  const socketPattern = generateSocketPattern();
  const totalDesired = desiredColors.red + desiredColors.green + desiredColors.blue;

  // Socket layout configurations
  const getSocketLayout = (socketCount) => {
    switch (socketCount) {
      case 1: return { rows: 1, cols: 1, arrangement: [[0]] };
      case 2: return { rows: 1, cols: 2, arrangement: [[0, 1]] };
      case 3: return { rows: 1, cols: 3, arrangement: [[0, 1, 2]] };
      case 4: return { rows: 2, cols: 2, arrangement: [[0, 1], [2, 3]] };
      case 5: return { rows: 2, cols: 3, arrangement: [[0, 1, 2], [3, 4, null]] };
      case 6: return { rows: 2, cols: 3, arrangement: [[0, 1, 2], [3, 4, 5]] };
      default: return { rows: 2, cols: 3, arrangement: [[0, 1, 2], [3, 4, 5]] };
    }
  };

  const layout = getSocketLayout(sockets);

  const isSocketDesired = (index) => {
    const color = socketPattern[index];
    const desiredCount = desiredColors[color.toLowerCase()];
    const currentCount = socketPattern.slice(0, index + 1).filter(c => c === color).length;
    return currentCount <= desiredCount;
  };

  const getSocketStats = () => {
    const stats = { R: 0, G: 0, B: 0 };
    socketPattern.forEach(color => stats[color]++);
    return stats;
  };

  const stats = getSocketStats();

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Socket Preview
            </CardTitle>
            <CardDescription>
              Visual representation of your desired socket colors
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === 'item' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('item')}
            >
              Item
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Socket Color Summary */}
        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <InteractiveSVGSocket color="R" size={24} />
            <span className="font-medium text-red-600">Red ({stats.R})</span>
          </div>
          <div className="flex items-center gap-2">
            <InteractiveSVGSocket color="G" size={24} />
            <span className="font-medium text-green-600">Green ({stats.G})</span>
          </div>
          <div className="flex items-center gap-2">
            <InteractiveSVGSocket color="B" size={24} />
            <span className="font-medium text-blue-600">Blue ({stats.B})</span>
          </div>
        </div>

        {/* Main Socket Visualization */}
        <div className="flex flex-col items-center space-y-4">
          {viewMode === 'grid' ? (
            // Grid Layout
            <div className="relative">
              <div 
                className="grid gap-3 p-6 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-xl border-2 border-slate-300 dark:border-slate-600"
                style={{ 
                  gridTemplateColumns: `repeat(${layout.cols}, 1fr)`,
                  gridTemplateRows: `repeat(${layout.rows}, 1fr)`
                }}
              >
                {layout.arrangement.flat().map((socketIndex, gridIndex) => (
                  <div key={gridIndex} className="flex items-center justify-center">
                    {socketIndex !== null ? (
                      <InteractiveSVGSocket
                        color={socketPattern[socketIndex]}
                        size={50}
                        isActive={highlightMode === 'all' || (highlightMode === 'desired' && isSocketDesired(socketIndex))}
                        isAnimated={animationEnabled && isCalculating}
                        onClick={() => onSocketClick?.(socketIndex)}
                        className="transition-all duration-300"
                      />
                    ) : (
                      <div className="w-[50px] h-[50px]" />
                    )}
                  </div>
                ))}
              </div>
              
              {/* Item Type Label */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <Badge variant="outline" className="bg-background">
                  {sockets}-Socket Item
                </Badge>
              </div>
            </div>
          ) : (
            // Item Layout (Linear)
            <div className="relative">
              <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-xl border-2 border-slate-300 dark:border-slate-600">
                {socketPattern.map((color, index) => (
                  <InteractiveSVGSocket
                    key={index}
                    color={color}
                    size={45}
                    isActive={highlightMode === 'all' || (highlightMode === 'desired' && isSocketDesired(index))}
                    isAnimated={animationEnabled && isCalculating}
                    onClick={() => onSocketClick?.(index)}
                    className="transition-all duration-300"
                  />
                ))}
              </div>
              
              {/* Socket Pattern Text */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <Badge variant="outline" className="bg-background font-mono">
                  {socketPattern.join('')}
                </Badge>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 pt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAnimationEnabled(!animationEnabled)}
            className="flex items-center gap-2"
          >
            <Zap className={`h-4 w-4 ${animationEnabled ? 'text-yellow-500' : 'text-gray-400'}`} />
            {animationEnabled ? 'Disable' : 'Enable'} Animation
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const modes = ['desired', 'all', 'none'];
              const currentIndex = modes.indexOf(highlightMode);
              setHighlightMode(modes[(currentIndex + 1) % modes.length]);
            }}
            className="flex items-center gap-2"
          >
            <Target className="h-4 w-4" />
            Highlight: {highlightMode}
          </Button>
        </div>

        {/* Statistics */}
        {totalDesired > 0 && (
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-sm">Socket Analysis</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Desired Colors:</span>
                <div className="font-mono">
                  {desiredColors.red > 0 && `${desiredColors.red}R `}
                  {desiredColors.green > 0 && `${desiredColors.green}G `}
                  {desiredColors.blue > 0 && `${desiredColors.blue}B`}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Current Pattern:</span>
                <div className="font-mono">{socketPattern.join('')}</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedSocketVisualizer;

