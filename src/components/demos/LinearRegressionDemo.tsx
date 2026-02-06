'use client';

import { useState, useMemo } from 'react';

interface Point {
  x: number;
  y: number;
}

export default function LinearRegressionDemo() {
  const [weight, setWeight] = useState(1.5);
  const [bias, setBias] = useState(20);
  
  // Generate sample data points
  const points: Point[] = useMemo(() => [
    { x: 10, y: 35 },
    { x: 20, y: 50 },
    { x: 30, y: 62 },
    { x: 40, y: 78 },
    { x: 50, y: 90 },
    { x: 60, y: 105 },
    { x: 70, y: 120 },
    { x: 80, y: 135 },
  ], []);
  
  // Calculate MSE
  const mse = useMemo(() => {
    const errors = points.map(p => {
      const predicted = weight * p.x + bias;
      return Math.pow(p.y - predicted, 2);
    });
    return errors.reduce((a, b) => a + b, 0) / errors.length;
  }, [weight, bias, points]);
  
  // SVG dimensions
  const width = 280;
  const height = 180;
  const padding = 30;
  
  // Scale functions
  const scaleX = (x: number) => padding + (x / 100) * (width - 2 * padding);
  const scaleY = (y: number) => height - padding - (y / 160) * (height - 2 * padding);
  
  // Line endpoints
  const lineStart = { x: scaleX(0), y: scaleY(weight * 0 + bias) };
  const lineEnd = { x: scaleX(100), y: scaleY(weight * 100 + bias) };
  
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="text-center text-gray-400 text-xs mb-2">
        y = <span className="text-cyan-400">{weight.toFixed(1)}</span>x + <span className="text-amber-400">{bias.toFixed(0)}</span>
      </div>
      
      {/* SVG Chart */}
      <svg width={width} height={height} className="bg-gray-900 rounded">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(v => (
          <line 
            key={`gx-${v}`}
            x1={scaleX(v)} y1={padding} 
            x2={scaleX(v)} y2={height - padding}
            stroke="#374151" strokeWidth="1"
          />
        ))}
        {[0, 40, 80, 120, 160].map(v => (
          <line 
            key={`gy-${v}`}
            x1={padding} y1={scaleY(v)} 
            x2={width - padding} y2={scaleY(v)}
            stroke="#374151" strokeWidth="1"
          />
        ))}
        
        {/* Regression line */}
        <line
          x1={lineStart.x} y1={lineStart.y}
          x2={lineEnd.x} y2={lineEnd.y}
          stroke="#06b6d4" strokeWidth="2"
        />
        
        {/* Error lines */}
        {points.map((p, i) => {
          const predicted = weight * p.x + bias;
          return (
            <line
              key={`err-${i}`}
              x1={scaleX(p.x)} y1={scaleY(p.y)}
              x2={scaleX(p.x)} y2={scaleY(predicted)}
              stroke="#ef4444" strokeWidth="1" strokeDasharray="3,3"
            />
          );
        })}
        
        {/* Data points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={scaleX(p.x)}
            cy={scaleY(p.y)}
            r="5"
            fill="#10b981"
          />
        ))}
        
        {/* Axes labels */}
        <text x={width / 2} y={height - 5} fill="#9ca3af" fontSize="10" textAnchor="middle">x</text>
        <text x={10} y={height / 2} fill="#9ca3af" fontSize="10" textAnchor="middle" transform={`rotate(-90, 10, ${height/2})`}>y</text>
      </svg>
      
      {/* Controls */}
      <div className="mt-3 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 text-xs w-8">w:</span>
          <input
            type="range"
            min="0"
            max="3"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value))}
            className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
          <span className="text-gray-400 text-xs w-8">{weight.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-amber-400 text-xs w-8">b:</span>
          <input
            type="range"
            min="-20"
            max="60"
            step="1"
            value={bias}
            onChange={(e) => setBias(parseFloat(e.target.value))}
            className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <span className="text-gray-400 text-xs w-8">{bias.toFixed(0)}</span>
        </div>
      </div>
      
      {/* MSE display */}
      <div className="mt-3 text-center">
        <span className="text-gray-500 text-xs">MSE: </span>
        <span className={`text-sm font-mono ${mse < 50 ? 'text-green-400' : mse < 200 ? 'text-yellow-400' : 'text-red-400'}`}>
          {mse.toFixed(1)}
        </span>
        {mse < 50 && <span className="ml-2 text-green-400 text-xs">✓ Good fit!</span>}
      </div>
    </div>
  );
}
