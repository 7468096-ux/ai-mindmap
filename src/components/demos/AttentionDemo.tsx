'use client';

import { useState } from 'react';

interface Example { name: string; source: string[]; target: string[]; weights: number[][]; }

const EXAMPLES: Example[] = [
  { name: '1', source: ['The', 'cat', 'sat'], target: ['Le', 'chat', 'assis'], 
    weights: [[0.9, 0.05, 0.05], [0.05, 0.9, 0.05], [0.05, 0.05, 0.9]] },
  { name: '2', source: ['I', 'love', 'AI'], target: ['Я', 'люблю', 'ИИ'],
    weights: [[0.9, 0.05, 0.05], [0.05, 0.9, 0.05], [0.05, 0.05, 0.9]] },
  { name: '3', source: ['Black', 'cat'], target: ['Чёрная', 'кошка'],
    weights: [[0.85, 0.15], [0.2, 0.8]] },
  { name: '4', source: ['The', 'big', 'dog', 'runs'], target: ['Большая', 'собака', 'бежит'],
    weights: [[0.1, 0.85, 0.03, 0.02], [0.15, 0.05, 0.75, 0.05], [0.05, 0.02, 0.03, 0.9]] },
  { name: '5', source: ['Hello', 'world'], target: ['Hola', 'mundo'],
    weights: [[0.95, 0.05], [0.05, 0.95]] },
  { name: '6', source: ['not', 'good'], target: ['pas', 'bon'],
    weights: [[0.9, 0.1], [0.1, 0.9]] },
  { name: '7', source: ['machine', 'learning', 'is', 'fun'], target: ['ML', 'это', 'весело'],
    weights: [[0.5, 0.45, 0.03, 0.02], [0.05, 0.05, 0.85, 0.05], [0.02, 0.03, 0.05, 0.9]] },
  { name: '8', source: ['red', 'apple'], target: ['manzana', 'roja'],
    weights: [[0.15, 0.85], [0.9, 0.1]] },
  { name: '9', source: ['I', 'am', 'happy'], target: ['Je', 'suis', 'heureux'],
    weights: [[0.9, 0.05, 0.05], [0.05, 0.9, 0.05], [0.05, 0.05, 0.9]] },
  { name: '10', source: ['thank', 'you'], target: ['спасибо'],
    weights: [[0.55, 0.45]] },
];

interface Props { lang?: 'ru' | 'en'; }

export default function AttentionDemo({ lang = 'ru' }: Props) {
  const [exampleIdx, setExampleIdx] = useState(0);
  const [hoveredTarget, setHoveredTarget] = useState<number | null>(null);
  
  const { source, target, weights } = EXAMPLES[exampleIdx];
  
  const getOpacity = (ti: number, si: number) => {
    if (hoveredTarget === null) return 0.2;
    return hoveredTarget === ti ? weights[ti][si] : 0.05;
  };
  
  const explanation = lang === 'ru' ? {
    title: '🎯 Что здесь происходит?',
    text: 'При переводе модель "смотрит" на исходные слова с разной силой. Наведи на слово перевода — увидишь на какие слова оригинала модель обращала внимание. Проценты показывают силу связи. Это и есть механизм Attention!',
    hint: 'Обрати внимание: "red apple" → "manzana roja" — порядок слов меняется',
  } : {
    title: '🎯 What\'s happening?',
    text: 'When translating, model "looks" at source words with different strength. Hover over translation word — see which original words model paid attention to. Percentages show connection strength. This is the Attention mechanism!',
    hint: 'Notice: "red apple" → "manzana roja" — word order changes',
  };
  
  return (
    <div className="bg-gray-800 rounded-lg p-3">
      {/* Explanation */}
      <div className="mb-3 p-2 bg-gray-700/50 rounded text-xs">
        <div className="text-amber-400 font-medium mb-1">{explanation.title}</div>
        <div className="text-gray-300 leading-relaxed">{explanation.text}</div>
        <div className="text-gray-500 mt-1 italic">{explanation.hint}</div>
      </div>
      
      <div className="text-center text-gray-400 text-xs mb-2">
        {lang === 'ru' ? 'Наведи на слово перевода' : 'Hover over translation word'}
      </div>
      
      <div className="relative min-h-[80px]">
        {/* Source */}
        <div className="flex justify-around mb-8">
          {source.map((word, i) => (
            <div key={`s-${i}`}
              className={`px-2 py-1 rounded text-xs transition-all ${
                hoveredTarget !== null && weights[hoveredTarget][i] > 0.4
                  ? 'bg-cyan-600 text-white scale-110' : 'bg-gray-700 text-gray-300'
              }`}>
              {word}
              {hoveredTarget !== null && (
                <div className="text-[10px] text-center text-cyan-300 mt-0.5">
                  {(weights[hoveredTarget][i] * 100).toFixed(0)}%
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Lines */}
        <svg className="absolute top-7 left-0 w-full h-6 pointer-events-none" style={{ overflow: 'visible' }}>
          {target.map((_, ti) => source.map((_, si) => (
            <line key={`${ti}-${si}`}
              x1={`${(si + 0.5) * (100 / source.length)}%`} y1="0"
              x2={`${(ti + 0.5) * (100 / target.length)}%`} y2="100%"
              stroke="#06b6d4" strokeWidth={Math.max(1, getOpacity(ti, si) * 3)} opacity={getOpacity(ti, si)} />
          )))}
        </svg>
        
        {/* Target */}
        <div className="flex justify-around">
          {target.map((word, i) => (
            <div key={`t-${i}`}
              className={`px-2 py-1 rounded text-xs cursor-pointer transition-all ${
                hoveredTarget === i ? 'bg-amber-600 text-white scale-110' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onMouseEnter={() => setHoveredTarget(i)}
              onMouseLeave={() => setHoveredTarget(null)}>
              {word}
            </div>
          ))}
        </div>
      </div>
      
      {/* Selector */}
      <div className="mt-3 flex flex-wrap justify-center gap-1">
        {EXAMPLES.map((ex, i) => (
          <button key={i} onClick={() => { setExampleIdx(i); setHoveredTarget(null); }}
            className={`w-6 h-6 text-xs rounded ${exampleIdx === i ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}>
            {ex.name}
          </button>
        ))}
      </div>
    </div>
  );
}
