'use client';

import { useState } from 'react';
import { Language } from '@/data/nodes';

interface Props {
  lang?: Language;
}

// Simplified word vectors (2D for visualization)
const wordVectors: Record<string, [number, number]> = {
  'king': [0.8, 0.9],
  'queen': [0.85, 0.3],
  'man': [0.3, 0.85],
  'woman': [0.35, 0.25],
  'prince': [0.6, 0.8],
  'princess': [0.65, 0.2],
};

export default function Word2VecDemo({ lang = 'en' }: Props) {
  const [operation, setOperation] = useState<'king-man+woman' | 'prince-man+woman'>('king-man+woman');
  
  // Calculate result vector
  const calculate = () => {
    if (operation === 'king-man+woman') {
      return [
        wordVectors.king[0] - wordVectors.man[0] + wordVectors.woman[0],
        wordVectors.king[1] - wordVectors.man[1] + wordVectors.woman[1],
      ];
    } else {
      return [
        wordVectors.prince[0] - wordVectors.man[0] + wordVectors.woman[0],
        wordVectors.prince[1] - wordVectors.man[1] + wordVectors.woman[1],
      ];
    }
  };
  
  const result = calculate();
  const target = operation === 'king-man+woman' ? 'queen' : 'princess';

  return (
    <div className="space-y-4">
      <div className="text-center text-gray-400 text-xs mb-2">
        {lang === 'ru' 
          ? 'Семантическая арифметика с векторами слов' 
          : 'Semantic arithmetic with word vectors'}
      </div>
      
      {/* 2D Vector space */}
      <svg viewBox="0 0 200 200" className="w-full h-40 bg-gray-800/50 rounded-lg">
        {/* Grid */}
        <line x1="0" y1="100" x2="200" y2="100" stroke="#374151" strokeWidth="0.5" />
        <line x1="100" y1="0" x2="100" y2="200" stroke="#374151" strokeWidth="0.5" />
        
        {/* Word points */}
        {Object.entries(wordVectors).map(([word, [x, y]]) => (
          <g key={word}>
            <circle
              cx={x * 180 + 10}
              cy={200 - (y * 180 + 10)}
              r="6"
              fill={word === target ? '#10b981' : '#6366f1'}
              stroke="white"
              strokeWidth="1"
            />
            <text
              x={x * 180 + 10}
              y={200 - (y * 180 + 10) - 10}
              fill="#9ca3af"
              fontSize="9"
              textAnchor="middle"
            >
              {word}
            </text>
          </g>
        ))}
        
        {/* Result point */}
        <circle
          cx={result[0] * 180 + 10}
          cy={200 - (result[1] * 180 + 10)}
          r="8"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeDasharray="3"
        />
        <text
          x={result[0] * 180 + 10}
          y={200 - (result[1] * 180 + 10) + 18}
          fill="#f59e0b"
          fontSize="8"
          textAnchor="middle"
        >
          result
        </text>
      </svg>
      
      {/* Operation selector */}
      <div className="flex gap-2">
        <button
          onClick={() => setOperation('king-man+woman')}
          className={`flex-1 py-2 text-xs rounded-lg transition ${
            operation === 'king-man+woman' 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-700 text-gray-300'
          }`}
        >
          king - man + woman
        </button>
        <button
          onClick={() => setOperation('prince-man+woman')}
          className={`flex-1 py-2 text-xs rounded-lg transition ${
            operation === 'prince-man+woman' 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-700 text-gray-300'
          }`}
        >
          prince - man + woman
        </button>
      </div>
      
      {/* Result */}
      <div className="text-center">
        <span className="text-gray-400 text-sm">
          {operation.replace('-', ' − ').replace('+', ' + ')} ≈{' '}
          <span className="text-green-400 font-bold">{target}</span>
        </span>
      </div>
    </div>
  );
}
