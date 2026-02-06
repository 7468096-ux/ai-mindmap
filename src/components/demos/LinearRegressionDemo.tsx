'use client';

import { useState, useMemo } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Seed {
  name: string;
  points: Point[];
  optimalW: number;
  optimalB: number;
}

// 10 different datasets
const SEEDS: Seed[] = [
  {
    name: '1',
    points: [{ x: 10, y: 35 }, { x: 20, y: 50 }, { x: 30, y: 62 }, { x: 40, y: 78 }, { x: 50, y: 90 }, { x: 60, y: 105 }, { x: 70, y: 120 }, { x: 80, y: 135 }],
    optimalW: 1.5, optimalB: 20
  },
  {
    name: '2',
    points: [{ x: 10, y: 80 }, { x: 25, y: 70 }, { x: 40, y: 55 }, { x: 55, y: 45 }, { x: 70, y: 30 }, { x: 85, y: 20 }],
    optimalW: -0.8, optimalB: 90
  },
  {
    name: '3',
    points: [{ x: 5, y: 10 }, { x: 15, y: 25 }, { x: 25, y: 55 }, { x: 35, y: 70 }, { x: 45, y: 95 }, { x: 55, y: 115 }, { x: 65, y: 140 }],
    optimalW: 2.2, optimalB: 0
  },
  {
    name: '4',
    points: [{ x: 10, y: 50 }, { x: 20, y: 52 }, { x: 30, y: 48 }, { x: 40, y: 55 }, { x: 50, y: 50 }, { x: 60, y: 53 }, { x: 70, y: 49 }, { x: 80, y: 51 }],
    optimalW: 0.02, optimalB: 50
  },
  {
    name: '5',
    points: [{ x: 20, y: 25 }, { x: 30, y: 50 }, { x: 40, y: 45 }, { x: 50, y: 70 }, { x: 60, y: 65 }, { x: 70, y: 90 }, { x: 80, y: 85 }],
    optimalW: 1.1, optimalB: 5
  },
  {
    name: '6',
    points: [{ x: 10, y: 120 }, { x: 30, y: 100 }, { x: 50, y: 80 }, { x: 70, y: 60 }, { x: 90, y: 40 }],
    optimalW: -1.0, optimalB: 130
  },
  {
    name: '7',
    points: [{ x: 15, y: 20 }, { x: 25, y: 35 }, { x: 35, y: 40 }, { x: 45, y: 60 }, { x: 55, y: 70 }, { x: 65, y: 85 }, { x: 75, y: 95 }, { x: 85, y: 110 }],
    optimalW: 1.3, optimalB: 5
  },
  {
    name: '8',
    points: [{ x: 10, y: 60 }, { x: 20, y: 55 }, { x: 40, y: 70 }, { x: 50, y: 80 }, { x: 70, y: 75 }, { x: 80, y: 90 }, { x: 90, y: 85 }],
    optimalW: 0.4, optimalB: 55
  },
  {
    name: '9',
    points: [{ x: 5, y: 5 }, { x: 20, y: 30 }, { x: 35, y: 50 }, { x: 50, y: 75 }, { x: 65, y: 100 }, { x: 80, y: 120 }, { x: 95, y: 145 }],
    optimalW: 1.55, optimalB: -2
  },
  {
    name: '10',
    points: [{ x: 10, y: 100 }, { x: 25, y: 85 }, { x: 35, y: 90 }, { x: 50, y: 70 }, { x: 60, y: 75 }, { x: 75, y: 55 }, { x: 90, y: 50 }],
    optimalW: -0.65, optimalB: 110
  },
];

export default function LinearRegressionDemo() {
  const [seedIdx, setSeedIdx] = useState(0);
  const [weight, setWeight] = useState(1.5);
  const [bias, setBias] = useState(20);
  
  const seed = SEEDS[seedIdx];
  const points = seed.points;
  
  // Calculate MSE
  const mse = useMemo(() => {
    const errors = points.map(p => {
      const predicted = weight * p.x + bias;
      return Math.pow(p.y - predicted, 2);
    });
    return errors.reduce((a, b) => a + b, 0) / errors.length;
  }, [weight, bias, points]);
  
  const changeSeed = (idx: number) => {
    setSeedIdx(idx);
    setWeight(1.0);
    setBias(50);
  };
  
  // SVG dimensions
  const width = 280;
  const height = 150;
  const padding = 25;
  
  const scaleX = (x: number) => padding + (x / 100) * (width - 2 * padding);
  const scaleY = (y: number) => height - padding - (y / 160) * (height - 2 * padding);
  
  // Line endpoints
  const lineStart = { x: scaleX(0), y: scaleY(weight * 0 + bias) };
  const lineEnd = { x: scaleX(100), y: scaleY(weight * 100 + bias) };
  
  return (
    <div className="bg-gray-800 rounded-lg p-3">
      <div className="text-center text-gray-400 text-xs mb-1">
        y = <span className="text-cyan-400">{weight.toFixed(1)}</span>x + <span className="text-amber-400">{bias.toFixed(0)}</span>
      </div>
      
      {/* SVG Chart */}
      <svg width={width} height={height} className="bg-gray-900 rounded">
        {/* Grid */}
        {[0, 25, 50, 75, 100].map(v => (
          <line key={`gx-${v}`} x1={scaleX(v)} y1={padding} x2={scaleX(v)} y2={height - padding} stroke="#374151" strokeWidth="1" />
        ))}
        {[0, 40, 80, 120, 160].map(v => (
          <line key={`gy-${v}`} x1={padding} y1={scaleY(v)} x2={width - padding} y2={scaleY(v)} stroke="#374151" strokeWidth="1" />
        ))}
        
        {/* Regression line */}
        <line x1={lineStart.x} y1={lineStart.y} x2={lineEnd.x} y2={lineEnd.y} stroke="#06b6d4" strokeWidth="2" />
        
        {/* Error lines */}
        {points.map((p, i) => {
          const predicted = weight * p.x + bias;
          return (
            <line key={`err-${i}`} x1={scaleX(p.x)} y1={scaleY(p.y)} x2={scaleX(p.x)} y2={scaleY(predicted)} stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
          );
        })}
        
        {/* Data points */}
        {points.map((p, i) => (
          <circle key={i} cx={scaleX(p.x)} cy={scaleY(p.y)} r="4" fill="#10b981" />
        ))}
      </svg>
      
      {/* Seed selector */}
      <div className="mt-2 flex flex-wrap justify-center gap-1">
        {SEEDS.map((s, i) => (
          <button
            key={i}
            onClick={() => changeSeed(i)}
            className={`w-6 h-6 text-xs rounded transition-colors ${
              seedIdx === i ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>
      
      {/* Controls */}
      <div className="mt-2 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 text-xs w-6">w:</span>
          <input
            type="range" min="-2" max="3" step="0.1" value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value))}
            className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
          <span className="text-gray-400 text-xs w-8">{weight.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-amber-400 text-xs w-6">b:</span>
          <input
            type="range" min="-20" max="140" step="1" value={bias}
            onChange={(e) => setBias(parseFloat(e.target.value))}
            className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <span className="text-gray-400 text-xs w-8">{bias.toFixed(0)}</span>
        </div>
      </div>
      
      {/* MSE */}
      <div className="mt-2 text-center">
        <span className="text-gray-500 text-xs">MSE: </span>
        <span className={`text-sm font-mono ${mse < 100 ? 'text-green-400' : mse < 500 ? 'text-yellow-400' : 'text-red-400'}`}>
          {mse.toFixed(0)}
        </span>
        {mse < 100 && <span className="ml-1 text-green-400 text-xs">✓</span>}
      </div>
    </div>
  );
}
