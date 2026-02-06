'use client';

import { useState } from 'react';

const EXAMPLES = [
  {
    source: ['The', 'cat', 'sat', 'on', 'the', 'mat'],
    target: ['Le', 'chat', 'assis', 'sur', 'le', 'tapis'],
    // Attention weights: target[i] attends to source[j]
    weights: [
      [0.9, 0.05, 0.02, 0.01, 0.01, 0.01], // Le → The
      [0.05, 0.85, 0.05, 0.02, 0.02, 0.01], // chat → cat
      [0.02, 0.05, 0.8, 0.08, 0.03, 0.02], // assis → sat
      [0.02, 0.02, 0.05, 0.85, 0.04, 0.02], // sur → on
      [0.02, 0.02, 0.02, 0.04, 0.85, 0.05], // le → the
      [0.01, 0.02, 0.02, 0.03, 0.02, 0.9], // tapis → mat
    ],
  },
  {
    source: ['I', 'love', 'machine', 'learning'],
    target: ['Я', 'люблю', 'машинное', 'обучение'],
    weights: [
      [0.9, 0.05, 0.03, 0.02],
      [0.05, 0.88, 0.04, 0.03],
      [0.02, 0.03, 0.9, 0.05],
      [0.02, 0.04, 0.06, 0.88],
    ],
  },
];

export default function AttentionDemo() {
  const [exampleIdx, setExampleIdx] = useState(0);
  const [hoveredTarget, setHoveredTarget] = useState<number | null>(null);
  
  const example = EXAMPLES[exampleIdx];
  const { source, target, weights } = example;
  
  const getOpacity = (targetIdx: number, sourceIdx: number) => {
    if (hoveredTarget === null) return 0.3;
    if (hoveredTarget === targetIdx) return weights[targetIdx][sourceIdx];
    return 0.1;
  };
  
  const getWeight = (targetIdx: number, sourceIdx: number) => {
    return weights[targetIdx][sourceIdx];
  };
  
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="text-center text-gray-400 text-xs mb-3">
        Hover over target word to see attention
      </div>
      
      <div className="relative">
        {/* Source words (top) */}
        <div className="flex justify-around mb-12">
          {source.map((word, i) => (
            <div
              key={`s-${i}`}
              className={`px-2 py-1 rounded text-sm transition-all ${
                hoveredTarget !== null && weights[hoveredTarget][i] > 0.5
                  ? 'bg-cyan-600 text-white scale-110'
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              {word}
              {hoveredTarget !== null && (
                <div className="text-xs text-center text-cyan-300 mt-1">
                  {(weights[hoveredTarget][i] * 100).toFixed(0)}%
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Connection lines (SVG overlay) */}
        <svg 
          className="absolute top-8 left-0 w-full h-8 pointer-events-none"
          style={{ overflow: 'visible' }}
        >
          {target.map((_, ti) =>
            source.map((_, si) => {
              const x1 = (si + 0.5) * (100 / source.length);
              const x2 = (ti + 0.5) * (100 / target.length);
              const opacity = getOpacity(ti, si);
              return (
                <line
                  key={`line-${ti}-${si}`}
                  x1={`${x1}%`} y1="0"
                  x2={`${x2}%`} y2="100%"
                  stroke="#06b6d4"
                  strokeWidth={Math.max(1, opacity * 4)}
                  opacity={opacity}
                />
              );
            })
          )}
        </svg>
        
        {/* Target words (bottom) */}
        <div className="flex justify-around">
          {target.map((word, i) => (
            <div
              key={`t-${i}`}
              className={`px-2 py-1 rounded text-sm cursor-pointer transition-all ${
                hoveredTarget === i
                  ? 'bg-amber-600 text-white scale-110'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onMouseEnter={() => setHoveredTarget(i)}
              onMouseLeave={() => setHoveredTarget(null)}
            >
              {word}
            </div>
          ))}
        </div>
      </div>
      
      {/* Example switcher */}
      <div className="mt-4 flex justify-center gap-2">
        {EXAMPLES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setExampleIdx(i); setHoveredTarget(null); }}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              exampleIdx === i
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
          >
            Example {i + 1}
          </button>
        ))}
      </div>
      
      {/* Info */}
      <div className="mt-2 text-center text-gray-500 text-xs">
        {hoveredTarget !== null 
          ? `"${target[hoveredTarget]}" attends to "${source[weights[hoveredTarget].indexOf(Math.max(...weights[hoveredTarget]))]}"` 
          : 'Cross-attention in translation'
        }
      </div>
    </div>
  );
}
