'use client';

import { useState } from 'react';
import { Language } from '@/data/nodes';

interface Props {
  lang?: Language;
}

export default function LogisticRegressionDemo({ lang = 'en' }: Props) {
  const [x, setX] = useState(0);
  
  // Sigmoid function
  const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));
  const probability = sigmoid(x);
  const prediction = probability >= 0.5 ? 1 : 0;
  
  // Generate sigmoid curve points
  const curvePoints = [];
  for (let i = -6; i <= 6; i += 0.5) {
    curvePoints.push({ x: i, y: sigmoid(i) });
  }

  return (
    <div className="space-y-4">
      <div className="text-center text-gray-400 text-xs mb-2">
        {lang === 'ru' ? 'Сигмоида: σ(x) = 1/(1+e^(-x))' : 'Sigmoid: σ(x) = 1/(1+e^(-x))'}
      </div>
      
      {/* SVG Graph */}
      <svg viewBox="0 0 200 100" className="w-full h-32 bg-gray-800/50 rounded-lg">
        {/* Grid */}
        <line x1="100" y1="0" x2="100" y2="100" stroke="#374151" strokeWidth="0.5" />
        <line x1="0" y1="50" x2="200" y2="50" stroke="#374151" strokeWidth="0.5" />
        
        {/* Threshold line at 0.5 */}
        <line x1="0" y1="50" x2="200" y2="50" stroke="#6366f1" strokeWidth="1" strokeDasharray="4" />
        <text x="5" y="47" fill="#6366f1" fontSize="8">0.5</text>
        
        {/* Sigmoid curve */}
        <path
          d={curvePoints.map((p, i) => 
            `${i === 0 ? 'M' : 'L'} ${100 + p.x * 15} ${100 - p.y * 100}`
          ).join(' ')}
          fill="none"
          stroke="#a855f7"
          strokeWidth="2"
        />
        
        {/* Current point */}
        <circle
          cx={100 + x * 15}
          cy={100 - probability * 100}
          r="5"
          fill={prediction === 1 ? '#10b981' : '#ef4444'}
          stroke="white"
          strokeWidth="1"
        />
        
        {/* Axis labels */}
        <text x="190" y="55" fill="#9ca3af" fontSize="8">x</text>
        <text x="105" y="10" fill="#9ca3af" fontSize="8">P</text>
      </svg>
      
      {/* Slider */}
      <div>
        <label className="text-gray-400 text-xs block mb-1">
          x = {x.toFixed(1)}
        </label>
        <input
          type="range"
          min="-5"
          max="5"
          step="0.1"
          value={x}
          onChange={(e) => setX(parseFloat(e.target.value))}
          className="w-full accent-purple-500"
        />
      </div>
      
      {/* Result */}
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">
          P(y=1) = <span className="text-purple-400">{(probability * 100).toFixed(1)}%</span>
        </span>
        <span className={prediction === 1 ? 'text-green-400' : 'text-red-400'}>
          {lang === 'ru' ? 'Класс' : 'Class'}: {prediction}
        </span>
      </div>
    </div>
  );
}
