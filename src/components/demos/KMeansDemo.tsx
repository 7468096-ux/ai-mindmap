'use client';

import { useState, useCallback } from 'react';

interface Point {
  x: number;
  y: number;
  cluster: number;
}

interface Centroid {
  x: number;
  y: number;
}

interface Seed {
  name: string;
  centroids: Centroid[];
}

const COLORS = ['#ef4444', '#10b981', '#6366f1'];

// Fixed data points (3 natural clusters)
const DATA_POINTS: Omit<Point, 'cluster'>[] = [
  // Cluster 1 (top-left)
  { x: 25, y: 30 }, { x: 30, y: 25 }, { x: 20, y: 35 },
  { x: 35, y: 30 }, { x: 28, y: 40 },
  // Cluster 2 (bottom-right)
  { x: 70, y: 75 }, { x: 75, y: 70 }, { x: 80, y: 80 },
  { x: 65, y: 78 }, { x: 72, y: 68 },
  // Cluster 3 (top-right)
  { x: 75, y: 25 }, { x: 80, y: 30 }, { x: 70, y: 20 },
  { x: 78, y: 35 }, { x: 72, y: 28 },
];

// 10 different seeds (initial centroid positions)
const SEEDS: Seed[] = [
  { name: '1', centroids: [{ x: 50, y: 50 }, { x: 30, y: 70 }, { x: 70, y: 30 }] },
  { name: '2', centroids: [{ x: 20, y: 20 }, { x: 80, y: 80 }, { x: 50, y: 50 }] },
  { name: '3', centroids: [{ x: 10, y: 50 }, { x: 90, y: 50 }, { x: 50, y: 90 }] },
  { name: '4', centroids: [{ x: 25, y: 75 }, { x: 75, y: 25 }, { x: 75, y: 75 }] },
  { name: '5', centroids: [{ x: 50, y: 10 }, { x: 10, y: 90 }, { x: 90, y: 90 }] },
  { name: '6', centroids: [{ x: 33, y: 33 }, { x: 66, y: 33 }, { x: 50, y: 66 }] },
  { name: '7', centroids: [{ x: 15, y: 15 }, { x: 50, y: 85 }, { x: 85, y: 50 }] },
  { name: '8', centroids: [{ x: 40, y: 20 }, { x: 60, y: 80 }, { x: 20, y: 60 }] },
  { name: '9', centroids: [{ x: 80, y: 20 }, { x: 20, y: 80 }, { x: 50, y: 50 }] },
  { name: '10', centroids: [{ x: 30, y: 50 }, { x: 70, y: 50 }, { x: 50, y: 20 }] },
];

export default function KMeansDemo() {
  const [seedIdx, setSeedIdx] = useState(0);
  const [points, setPoints] = useState<Point[]>(DATA_POINTS.map(p => ({ ...p, cluster: -1 })));
  const [centroids, setCentroids] = useState<Centroid[]>(SEEDS[0].centroids);
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
  
  const changeSeed = (idx: number) => {
    setSeedIdx(idx);
    setPoints(DATA_POINTS.map(p => ({ ...p, cluster: -1 })));
    setCentroids([...SEEDS[idx].centroids]);
    setStep(0);
    setIsRunning(false);
  };
  
  const reset = () => {
    changeSeed(seedIdx);
  };
  
  const runAnimation = async () => {
    setIsRunning(true);
    for (let i = 0; i < 10; i++) {
      await new Promise(r => setTimeout(r, 400));
      doStep();
    }
    setIsRunning(false);
  };
  
  const width = 280;
  const height = 160;
  const padding = 15;
  
  const scaleX = (x: number) => padding + (x / 100) * (width - 2 * padding);
  const scaleY = (y: number) => height - padding - (y / 100) * (height - 2 * padding);
  
  return (
    <div className="bg-gray-800 rounded-lg p-3">
      <div className="text-center text-gray-400 text-xs mb-2">
        Seed: {seedIdx + 1} | Step: {step} | {step % 2 === 0 ? 'Assign' : 'Update'}
      </div>
      
      <svg width={width} height={height} className="bg-gray-900 rounded">
        {/* Data points */}
        {points.map((p, i) => (
          <circle
            key={`p-${i}`}
            cx={scaleX(p.x)}
            cy={scaleY(p.y)}
            r="5"
            fill={p.cluster >= 0 ? COLORS[p.cluster] : '#6b7280'}
            opacity={0.8}
          />
        ))}
        
        {/* Centroids */}
        {centroids.map((c, i) => (
          <g key={`c-${i}`}>
            <circle
              cx={scaleX(c.x)} cy={scaleY(c.y)} r="8"
              fill="none" stroke={COLORS[i]} strokeWidth="2"
            />
            <line
              x1={scaleX(c.x) - 4} y1={scaleY(c.y)}
              x2={scaleX(c.x) + 4} y2={scaleY(c.y)}
              stroke={COLORS[i]} strokeWidth="2"
            />
            <line
              x1={scaleX(c.x)} y1={scaleY(c.y) - 4}
              x2={scaleX(c.x)} y2={scaleY(c.y) + 4}
              stroke={COLORS[i]} strokeWidth="2"
            />
          </g>
        ))}
      </svg>
      
      {/* Seed selector */}
      <div className="mt-2 flex flex-wrap justify-center gap-1">
        {SEEDS.map((seed, i) => (
          <button
            key={i}
            onClick={() => changeSeed(i)}
            disabled={isRunning}
            className={`w-6 h-6 text-xs rounded transition-colors ${
              seedIdx === i
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            } disabled:opacity-50`}
          >
            {seed.name}
          </button>
        ))}
      </div>
      
      {/* Controls */}
      <div className="mt-2 flex gap-2 justify-center">
        <button
          onClick={doStep}
          disabled={isRunning}
          className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 text-white text-xs rounded"
        >
          Step
        </button>
        <button
          onClick={runAnimation}
          disabled={isRunning}
          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-600 text-white text-xs rounded"
        >
          {isRunning ? '...' : 'Run'}
        </button>
        <button
          onClick={reset}
          disabled={isRunning}
          className="px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white text-xs rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
