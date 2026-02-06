'use client';

import { useState, useMemo } from 'react';

interface Props { lang?: 'ru' | 'en'; }

interface Point { x: number; y: number; }

// Generate correlated 2D points
const generatePoints = (seed: number): Point[] => {
  const points: Point[] = [];
  for (let i = 0; i < 20; i++) {
    const t = (i / 20) * 80 + 10;
    const noise = ((seed * (i + 1) * 17) % 30) - 15;
    points.push({
      x: t + noise * 0.5,
      y: t * 0.8 + 10 + noise,
    });
  }
  return points;
};

const SEEDS = [1, 7, 13, 29, 37, 43, 53, 67, 79, 89];

export default function PCADemo({ lang = 'ru' }: Props) {
  const [seedIdx, setSeedIdx] = useState(0);
  const [showProjection, setShowProjection] = useState(false);
  const [angle, setAngle] = useState(40);
  
  const points = useMemo(() => generatePoints(SEEDS[seedIdx]), [seedIdx]);
  
  // Calculate projection onto line at angle
  const project = (p: Point, angleDeg: number): number => {
    const rad = (angleDeg * Math.PI) / 180;
    return p.x * Math.cos(rad) + p.y * Math.sin(rad);
  };
  
  // Calculate variance along projection
  const variance = useMemo(() => {
    const projections = points.map(p => project(p, angle));
    const mean = projections.reduce((a, b) => a + b, 0) / projections.length;
    return projections.reduce((sum, p) => sum + Math.pow(p - mean, 2), 0) / projections.length;
  }, [points, angle]);
  
  const maxVariance = 1600; // approximate max
  const variancePercent = Math.min(100, (variance / maxVariance) * 100);
  
  const width = 200, height = 200, padding = 20;
  const scaleX = (x: number) => padding + (x / 100) * (width - 2 * padding);
  const scaleY = (y: number) => height - padding - (y / 100) * (height - 2 * padding);
  
  // Line endpoints for current angle
  const rad = (angle * Math.PI) / 180;
  const lineLen = 120;
  const centerX = 50, centerY = 50;
  
  const explanation = lang === 'ru' ? {
    title: '🎯 Что здесь происходит?',
    text: 'PCA ищет направление максимального "разброса" данных. Крути угол — смотри как меняется дисперсия. При правильном угле точки максимально "растянуты" вдоль линии.',
    hint: 'Максимальная дисперсия = первая главная компонента (PC1)',
  } : {
    title: '🎯 What\'s happening?',
    text: 'PCA finds direction of maximum data "spread". Rotate angle — see how variance changes. At right angle, points are maximally "stretched" along line.',
    hint: 'Maximum variance = first principal component (PC1)',
  };
  
  return (
    <div className="bg-gray-800 rounded-lg p-3">
      <div className="mb-3 p-2 bg-gray-700/50 rounded text-xs">
        <div className="text-amber-400 font-medium mb-1">{explanation.title}</div>
        <div className="text-gray-300 leading-relaxed">{explanation.text}</div>
        <div className="text-gray-500 mt-1 italic">{explanation.hint}</div>
      </div>
      
      <div className="flex gap-4">
        {/* 2D plot */}
        <svg width={width} height={height} className="bg-gray-900 rounded flex-shrink-0">
          {/* Grid */}
          {[0, 25, 50, 75, 100].map(v => (
            <g key={v}>
              <line x1={scaleX(v)} y1={padding} x2={scaleX(v)} y2={height-padding} stroke="#374151" strokeWidth="1" />
              <line x1={padding} y1={scaleY(v)} x2={width-padding} y2={scaleY(v)} stroke="#374151" strokeWidth="1" />
            </g>
          ))}
          
          {/* Projection line */}
          <line
            x1={scaleX(centerX - Math.cos(rad) * lineLen/2)}
            y1={scaleY(centerY - Math.sin(rad) * lineLen/2)}
            x2={scaleX(centerX + Math.cos(rad) * lineLen/2)}
            y2={scaleY(centerY + Math.sin(rad) * lineLen/2)}
            stroke="#6366f1"
            strokeWidth="2"
            strokeDasharray={showProjection ? 'none' : '5,5'}
          />
          
          {/* Projection lines from points */}
          {showProjection && points.map((p, i) => {
            const projLen = project(p, angle);
            const projX = centerX + Math.cos(rad) * (projLen - 50) * 0.8;
            const projY = centerY + Math.sin(rad) * (projLen - 50) * 0.8;
            return (
              <line key={`proj-${i}`}
                x1={scaleX(p.x)} y1={scaleY(p.y)}
                x2={scaleX(projX)} y2={scaleY(projY)}
                stroke="#6366f1" strokeWidth="1" opacity="0.3"
              />
            );
          })}
          
          {/* Data points */}
          {points.map((p, i) => (
            <circle key={i} cx={scaleX(p.x)} cy={scaleY(p.y)} r="4" fill="#10b981" />
          ))}
        </svg>
        
        {/* 1D projection */}
        <div className="flex-1">
          <div className="text-gray-400 text-xs mb-1">{lang === 'ru' ? 'Проекция (1D):' : 'Projection (1D):'}</div>
          <div className="h-4 bg-gray-900 rounded relative mb-2">
            {points.map((p, i) => {
              const proj = project(p, angle);
              const pos = ((proj - 20) / 80) * 100;
              return (
                <div key={i} className="absolute w-2 h-2 bg-indigo-500 rounded-full -translate-y-1/2 top-1/2"
                  style={{ left: `${Math.max(0, Math.min(100, pos))}%` }} />
              );
            })}
          </div>
          
          {/* Variance meter */}
          <div className="text-gray-400 text-xs mb-1">
            {lang === 'ru' ? 'Дисперсия:' : 'Variance:'}
          </div>
          <div className="h-3 bg-gray-900 rounded overflow-hidden mb-1">
            <div className={`h-full transition-all ${variancePercent > 80 ? 'bg-green-500' : variancePercent > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ width: `${variancePercent}%` }} />
          </div>
          <div className="text-right text-xs text-gray-400">{variancePercent.toFixed(0)}%</div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="mt-3 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-xs">{lang === 'ru' ? 'Угол:' : 'Angle:'}</span>
          <input type="range" min="0" max="90" value={angle} onChange={(e) => setAngle(parseInt(e.target.value))}
            className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
          <span className="text-white text-xs w-8">{angle}°</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {SEEDS.map((_, i) => (
              <button key={i} onClick={() => setSeedIdx(i)}
                className={`w-5 h-5 text-xs rounded ${seedIdx === i ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-400'}`}>
                {i+1}
              </button>
            ))}
          </div>
          <button onClick={() => setShowProjection(!showProjection)}
            className={`px-2 py-1 text-xs rounded ${showProjection ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-400'}`}>
            {lang === 'ru' ? 'Показать проекции' : 'Show projections'}
          </button>
        </div>
      </div>
    </div>
  );
}
