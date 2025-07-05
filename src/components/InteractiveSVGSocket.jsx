import React, { useState, useEffect } from 'react';

const InteractiveSVGSocket = ({ 
  color, 
  size = 40, 
  isActive = false, 
  isAnimated = false,
  onClick,
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    if (isAnimated) {
      const interval = setInterval(() => {
        setAnimationPhase(prev => (prev + 1) % 3);
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isAnimated]);

  const getSocketColor = () => {
    switch (color) {
      case 'R': return '#ef4444'; // red-500
      case 'G': return '#22c55e'; // green-500
      case 'B': return '#3b82f6'; // blue-500
      case 'W': return '#f8fafc'; // slate-50
      default: return '#64748b'; // slate-500
    }
  };

  const getGlowColor = () => {
    switch (color) {
      case 'R': return '#fca5a5'; // red-300
      case 'G': return '#86efac'; // green-300
      case 'B': return '#93c5fd'; // blue-300
      case 'W': return '#e2e8f0'; // slate-200
      default: return '#cbd5e1'; // slate-300
    }
  };

  const socketColor = getSocketColor();
  const glowColor = getGlowColor();
  const scale = isHovered ? 1.1 : 1;
  const opacity = isActive ? 1 : 0.7;

  return (
    <div 
      className={`inline-block cursor-pointer transition-transform duration-200 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{ transform: `scale(${scale})` }}
    >
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100"
        className="drop-shadow-lg"
      >
        {/* Outer glow effect */}
        <defs>
          <radialGradient id={`glow-${color}-${size}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={glowColor} stopOpacity="0.8" />
            <stop offset="70%" stopColor={glowColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
          </radialGradient>
          
          <radialGradient id={`socket-${color}-${size}`} cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor={socketColor} stopOpacity="1" />
            <stop offset="100%" stopColor={socketColor} stopOpacity="0.8" />
          </radialGradient>

          <filter id={`shadow-${color}-${size}`}>
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
          </filter>

          {isAnimated && (
            <animate 
              attributeName="r" 
              values="45;55;45" 
              dur="1.6s" 
              repeatCount="indefinite"
            />
          )}
        </defs>

        {/* Glow background */}
        {(isHovered || isActive) && (
          <circle
            cx="50"
            cy="50"
            r="48"
            fill={`url(#glow-${color}-${size})`}
            opacity={isAnimated ? 0.6 + animationPhase * 0.2 : 0.4}
          />
        )}

        {/* Socket base (dark background) */}
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="#1e293b"
          stroke="#334155"
          strokeWidth="2"
          filter={`url(#shadow-${color}-${size})`}
        />

        {/* Socket inner ring */}
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="#475569"
          strokeWidth="1"
          opacity="0.6"
        />

        {/* Main socket color */}
        <circle
          cx="50"
          cy="50"
          r={isAnimated ? 28 + animationPhase * 2 : 28}
          fill={`url(#socket-${color}-${size})`}
          opacity={opacity}
        />

        {/* Highlight effect */}
        <circle
          cx="42"
          cy="42"
          r="8"
          fill="white"
          opacity={isHovered ? 0.4 : 0.2}
        />

        {/* Inner shadow */}
        <circle
          cx="50"
          cy="50"
          r="28"
          fill="none"
          stroke="#000000"
          strokeWidth="1"
          opacity="0.2"
        />

        {/* Animated pulse for active state */}
        {isAnimated && (
          <circle
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke={socketColor}
            strokeWidth="2"
            opacity="0.6"
          >
            <animate 
              attributeName="r" 
              values="20;35;20" 
              dur="2s" 
              repeatCount="indefinite"
            />
            <animate 
              attributeName="opacity" 
              values="0.6;0;0.6" 
              dur="2s" 
              repeatCount="indefinite"
            />
          </circle>
        )}
      </svg>
    </div>
  );
};

export default InteractiveSVGSocket;

