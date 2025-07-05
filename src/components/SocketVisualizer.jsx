import React from 'react';

const SocketVisualizer = ({ sockets, desiredColors }) => {
  // Generate socket array based on desired colors
  const generateSockets = () => {
    const socketArray = [];
    const { red, green, blue } = desiredColors;
    
    // Add red sockets
    for (let i = 0; i < red; i++) {
      socketArray.push('red');
    }
    
    // Add green sockets
    for (let i = 0; i < green; i++) {
      socketArray.push('green');
    }
    
    // Add blue sockets
    for (let i = 0; i < blue; i++) {
      socketArray.push('blue');
    }
    
    // Fill remaining with empty sockets
    while (socketArray.length < sockets) {
      socketArray.push('empty');
    }
    
    return socketArray.slice(0, sockets);
  };

  const socketColors = generateSockets();

  // Socket color mapping
  const getSocketColor = (color) => {
    switch (color) {
      case 'red':
        return '#ef4444'; // red-500
      case 'green':
        return '#22c55e'; // green-500
      case 'blue':
        return '#3b82f6'; // blue-500
      default:
        return '#6b7280'; // gray-500
    }
  };

  const getSocketStroke = (color) => {
    switch (color) {
      case 'red':
        return '#dc2626'; // red-600
      case 'green':
        return '#16a34a'; // green-600
      case 'blue':
        return '#2563eb'; // blue-600
      default:
        return '#4b5563'; // gray-600
    }
  };

  // Calculate layout based on socket count
  const getSocketLayout = (socketCount) => {
    switch (socketCount) {
      case 1:
        return { rows: 1, cols: 1, positions: [[0, 0]] };
      case 2:
        return { rows: 1, cols: 2, positions: [[0, 0], [0, 1]] };
      case 3:
        return { rows: 1, cols: 3, positions: [[0, 0], [0, 1], [0, 2]] };
      case 4:
        return { rows: 2, cols: 2, positions: [[0, 0], [0, 1], [1, 0], [1, 1]] };
      case 5:
        return { rows: 2, cols: 3, positions: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1]] };
      case 6:
        return { rows: 2, cols: 3, positions: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]] };
      default:
        return { rows: 1, cols: 1, positions: [[0, 0]] };
    }
  };

  const layout = getSocketLayout(sockets);
  const socketSize = 40;
  const socketSpacing = 8;
  const svgWidth = layout.cols * socketSize + (layout.cols - 1) * socketSpacing;
  const svgHeight = layout.rows * socketSize + (layout.rows - 1) * socketSpacing;

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Socket Display */}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
        <svg
          width={svgWidth}
          height={svgHeight}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="drop-shadow-sm"
        >
          {/* Background item shape */}
          <rect
            x="-4"
            y="-4"
            width={svgWidth + 8}
            height={svgHeight + 8}
            rx="8"
            fill="#1f2937"
            stroke="#374151"
            strokeWidth="2"
            opacity="0.8"
          />
          
          {/* Sockets */}
          {layout.positions.map((position, index) => {
            if (index >= sockets) return null;
            
            const x = position[1] * (socketSize + socketSpacing) + socketSize / 2;
            const y = position[0] * (socketSize + socketSpacing) + socketSize / 2;
            const color = socketColors[index] || 'empty';
            
            return (
              <g key={index}>
                {/* Socket hole (background) */}
                <circle
                  cx={x}
                  cy={y}
                  r={socketSize / 2 - 2}
                  fill="#000000"
                  stroke="#4b5563"
                  strokeWidth="1"
                />
                
                {/* Socket color */}
                <circle
                  cx={x}
                  cy={y}
                  r={socketSize / 2 - 4}
                  fill={getSocketColor(color)}
                  stroke={getSocketStroke(color)}
                  strokeWidth="2"
                  className="transition-all duration-300"
                  style={{
                    filter: color !== 'empty' ? 'drop-shadow(0 0 4px rgba(0,0,0,0.3))' : 'none',
                    opacity: color !== 'empty' ? 1 : 0.3
                  }}
                />
                
                {/* Socket highlight */}
                {color !== 'empty' && (
                  <circle
                    cx={x - 4}
                    cy={y - 4}
                    r={4}
                    fill="rgba(255,255,255,0.6)"
                    className="animate-pulse"
                  />
                )}
                
                {/* Link lines for connected sockets */}
                {index < sockets - 1 && index % layout.cols !== layout.cols - 1 && (
                  <line
                    x1={x + socketSize / 2 - 2}
                    y1={y}
                    x2={x + socketSize / 2 + socketSpacing + 2}
                    y2={y}
                    stroke="#6b7280"
                    strokeWidth="3"
                    opacity="0.7"
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Color Legend */}
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500 border border-red-600"></div>
          <span>Red ({desiredColors.red})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500 border border-green-600"></div>
          <span>Green ({desiredColors.green})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-500 border border-blue-600"></div>
          <span>Blue ({desiredColors.blue})</span>
        </div>
      </div>

      {/* Socket Configuration Summary */}
      <div className="text-center text-sm text-muted-foreground">
        <p>{sockets}-Socket Item</p>
        <p className="font-mono">
          {Array(desiredColors.red).fill('R').join('')}
          {Array(desiredColors.green).fill('G').join('')}
          {Array(desiredColors.blue).fill('B').join('')}
        </p>
      </div>
    </div>
  );
};

export default SocketVisualizer;

