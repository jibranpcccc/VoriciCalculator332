import React from 'react';
import { Loader2, Zap, Calculator } from 'lucide-react';
import InteractiveSVGSocket from './InteractiveSVGSocket';

const LoadingAnimation = ({ 
  type = 'calculating', 
  message = 'Calculating...', 
  size = 'medium' 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  };

  const containerClasses = {
    small: 'gap-2 text-sm',
    medium: 'gap-3 text-base',
    large: 'gap-4 text-lg'
  };

  if (type === 'sockets') {
    return (
      <div className={`flex items-center justify-center ${containerClasses[size]}`}>
        <div className="flex gap-1">
          <InteractiveSVGSocket color="R" size={size === 'small' ? 20 : size === 'medium' ? 24 : 32} isAnimated />
          <InteractiveSVGSocket color="G" size={size === 'small' ? 20 : size === 'medium' ? 24 : 32} isAnimated />
          <InteractiveSVGSocket color="B" size={size === 'small' ? 20 : size === 'medium' ? 24 : 32} isAnimated />
        </div>
        <span className="text-muted-foreground animate-pulse">{message}</span>
      </div>
    );
  }

  if (type === 'chromatic') {
    return (
      <div className={`flex items-center justify-center ${containerClasses[size]}`}>
        <div className="relative">
          <Zap className={`${sizeClasses[size]} text-yellow-500 animate-pulse`} />
          <div className="absolute inset-0 animate-ping">
            <Zap className={`${sizeClasses[size]} text-yellow-300 opacity-75`} />
          </div>
        </div>
        <span className="text-muted-foreground animate-pulse">{message}</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${containerClasses[size]}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
      <span className="text-muted-foreground">{message}</span>
    </div>
  );
};

export default LoadingAnimation;

