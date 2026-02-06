'use client';

import { useState, useCallback, useMemo } from 'react';

interface Point {
  x: number;
  y: number;
  cluster: number;
}

interface Centroid {
  x: number;
  y: number;
}

const COLORS = ['#ef4444', '#10b981', '#6366f1'];
const INITIAL_POINTS: Point[] = [
  // Cluster 1 (top-left)
  { x: 25, y: 30, cluster: -1 },
  { x: 30, y: 25, cluster: -1 },
  { x: 20, y: 35, cluster: -1 },
  { x: 35, y: 30, cluster: -1 },
  { x: 28, y: 40, cluster: -1 },
  // Cluster 2 (bottom-right)
  { x: 70, y: 75, cluster: -1 },
  { x: 75, y: 70, cluster: -1 },
  { x: 80, y: 80, cluster: -1 },
  { x: 65, y: 78, cluster: -1 },
  { x: 72, y: 68, cluster: -1 },
  // Cluster 3 (top-right)
  { x: 75, y: 25, cluster: -1 },
  { x: 80, y: 30, cluster: -1 },
  { x: 70, y: 20, cluster: -1 },
  { x: 78, y: 35, cluster: -1 },
  { x: 72, y: 28, cluster: -1 },
];

export default function KMeansDemo() {
  const [points, setPoints] = useState<Point[]>(INITIAL_POINTS);
  const [centroids, setCentroids] = useState<Centroid[]>([
    { x: 50, y: 50 },
    { x: 30, y: 70 },
    { x: 70, y: 30 },
  ]);
  const [step, setStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  const distance = (p1: { x: number; y: number }, p2: { x: number; y: number }) => 
    Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  
  const assignClusters = useCallback(() => {
    setPoints(prev => prev.map(p => {
      const distances = centroids.map((c, i) => ({ i, d: distance(p, c) }));
      const nearest = distances.reduce((a, b) => a.d < b.d ? a : b);
      return { ...p, cluster: nearest.i };
    }));
  }, [centroids]);
  
  const updateCentroids = useCallback(() => {
    setCentroids(prev => prev.map((_, i) => {
      const clusterPoints = points.filter(p => p.cluster === i);
      if (clusterPoints.length === 0) return prev[i];
      return {
        x: clusterPoints.reduce((s, p) => s + p.x, 0) / clusterPoints.length,
        y: clusterPoints.reduce((s, p) => s + p.y, 0) / clusterPoints.length,
      };
    }));
  }, [points]);
  
  const doStep = useCallback(() => {
    if (step % 2 === 0) {
      assignClusters();
    } else {
      updateCentroids();
    }
    setStep(s => s + 1);
  }, [step, assignClusters, updateCentroids]);
  
  const reset = () => {
    setPoints(INITIAL_POINTS);
    setCentroids([
      { x: 50, y: 50 },
      { x: 30, y: 70 },
      { x: 70, y: 30 },
    ]);
    setStep(0);
    setIsRunning(false);
  };
  
  const runAnimation = async () => {
    setIsRunning(true);
    for (let i = 0; i < 10; i++) {
      await new Promise(r => setTimeout(r, 500));
      doStep();
    }
    setIsRunning(false);
  };
  
  const width = 280;
  const height = 180;
  const padding = 20;
  
  const scaleX = (x: number) => padding + (x / 100) * (width - 2 * padding);
  const scaleY = (y: number) => height - padding - (y / 100) * (height - 2 * padding);
  
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="text-center text-gray-400 text-xs mb-2">
        K=3 | Step: {step} | {step % 2 === 0 ? 'Assign points' : 'Move centroids'}
      </div>
      
      <svg width={width} height={height} className="bg-gray-900 rounded">
        {/* Data points */}
        {points.map((p, i) => (
          <circle
            key={`p-${i}`}
            cx={scaleX(p.x)}
            cy={scaleY(p.y)}
            r="6"
            fill={p.cluster >= 0 ? COLORS[p.cluster] : '#6b7280'}
            opacity={0.8}
          />
        ))}
        
        {/* Centroids */}
        {centroids.map((c, i) => (
          <g key={`c-${i}`}>
            <circle
              cx={scaleX(c.x)}
              cy={scaleY(c.y)}
              r="10"
              fill="none"
              stroke={COLORS[i]}
              strokeWidth="2"
            />
            <line
              x1={scaleX(c.x) - 5} y1={scaleY(c.y)}
              x2={scaleX(c.x) + 5} y2={scaleY(c.y)}
              stroke={COLORS[i]} strokeWidth="2"
            />
            <line
              x1={scaleX(c.x)} y1={scaleY(c.y) - 5}
              x2={scaleX(c.x)} y2={scaleY(c.y) + 5}
              stroke={COLORS[i]} strokeWidth="2"
            />
          </g>
        ))}
      </svg>
      
      {/* Controls */}
      <div className="mt-3 flex gap-2 justify-center">
        <button
          onClick={doStep}
          disabled={isRunning}
          className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 text-white text-xs rounded transition-colors"
        >
          Step
        </button>
        <button
          onClick={runAnimation}
          disabled={isRunning}
          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-600 text-white text-xs rounded transition-colors"
        >
          {isRunning ? 'Running...' : 'Auto Run'}
        </button>
        <button
          onClick={reset}
          disabled={isRunning}
          className="px-3 py-1 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 text-white text-xs rounded transition-colors"
        >
          Reset
        </button>
      </div>
      
      {/* Legend */}
      <div className="mt-2 flex justify-center gap-3 text-xs">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-gray-500"></span> Unassigned
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full border-2 border-gray-400"></span> Centroid
        </span>
      </div>
    </div>
  );
}
