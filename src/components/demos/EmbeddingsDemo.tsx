'use client';

import { useState } from 'react';

interface Props { lang?: 'ru' | 'en'; }

interface Word {
  text: string;
  x: number;
  y: number;
  category: 'animal' | 'food' | 'tech' | 'emotion';
}

const COLORS = {
  animal: '#10b981',
  food: '#f59e0b', 
  tech: '#6366f1',
  emotion: '#ec4899',
};

const WORDS: Word[] = [
  // Animals cluster
  { text: 'cat', x: 20, y: 25, category: 'animal' },
  { text: 'dog', x: 25, y: 30, category: 'animal' },
  { text: 'bird', x: 18, y: 35, category: 'animal' },
  { text: 'fish', x: 30, y: 28, category: 'animal' },
  // Food cluster
  { text: 'apple', x: 70, y: 25, category: 'food' },
  { text: 'bread', x: 75, y: 30, category: 'food' },
  { text: 'pizza', x: 68, y: 35, category: 'food' },
  { text: 'cake', x: 78, y: 28, category: 'food' },
  // Tech cluster
  { text: 'computer', x: 25, y: 70, category: 'tech' },
  { text: 'phone', x: 30, y: 75, category: 'tech' },
  { text: 'robot', x: 22, y: 78, category: 'tech' },
  { text: 'AI', x: 35, y: 72, category: 'tech' },
  // Emotion cluster
  { text: 'happy', x: 70, y: 70, category: 'emotion' },
  { text: 'sad', x: 75, y: 75, category: 'emotion' },
  { text: 'angry', x: 68, y: 78, category: 'emotion' },
  { text: 'love', x: 78, y: 72, category: 'emotion' },
];

export default function EmbeddingsDemo({ lang = 'ru' }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showSimilar, setShowSimilar] = useState(false);
  
  const selectedWord = WORDS.find(w => w.text === selected);
  
  const getSimilarity = (w1: Word, w2: Word) => {
    const dist = Math.sqrt(Math.pow(w1.x - w2.x, 2) + Math.pow(w1.y - w2.y, 2));
    return Math.max(0, 1 - dist / 100);
  };
  
  const width = 280, height = 160, padding = 20;
  const scaleX = (x: number) => padding + (x / 100) * (width - 2 * padding);
  const scaleY = (y: number) => height - padding - (y / 100) * (height - 2 * padding);
  
  const explanation = lang === 'ru' ? {
    title: '🎯 Что здесь происходит?',
    text: 'Каждое слово — точка в пространстве. Похожие по смыслу слова находятся рядом. Кликни на слово — увидишь расстояние до других.',
    hint: 'Животные рядом с животными, еда рядом с едой',
  } : {
    title: '🎯 What\'s happening?',
    text: 'Each word is a point in space. Similar meaning = nearby points. Click word to see distance to others.',
    hint: 'Animals near animals, food near food',
  };
  
  return (
    <div className="bg-gray-800 rounded-lg p-3">
      <div className="mb-3 p-2 bg-gray-700/50 rounded text-xs">
        <div className="text-amber-400 font-medium mb-1">{explanation.title}</div>
        <div className="text-gray-300 leading-relaxed">{explanation.text}</div>
        <div className="text-gray-500 mt-1 italic">{explanation.hint}</div>
      </div>
      
      <svg width={width} height={height} className="bg-gray-900 rounded">
        {/* Similarity lines when word selected */}
        {showSimilar && selectedWord && WORDS.filter(w => w.text !== selected).map(w => {
          const sim = getSimilarity(selectedWord, w);
          return (
            <line
              key={`line-${w.text}`}
              x1={scaleX(selectedWord.x)} y1={scaleY(selectedWord.y)}
              x2={scaleX(w.x)} y2={scaleY(w.y)}
              stroke="#6366f1"
              strokeWidth={sim * 3}
              opacity={sim * 0.8}
            />
          );
        })}
        
        {/* Words as points */}
        {WORDS.map(word => {
          const isSelected = selected === word.text;
          const sim = selectedWord ? getSimilarity(selectedWord, word) : 0;
          return (
            <g key={word.text} style={{ cursor: 'pointer' }} onClick={() => {
              setSelected(isSelected ? null : word.text);
              setShowSimilar(!isSelected);
            }}>
              <circle
                cx={scaleX(word.x)} cy={scaleY(word.y)}
                r={isSelected ? 8 : 6}
                fill={COLORS[word.category]}
                opacity={selected && !isSelected ? 0.5 + sim * 0.5 : 1}
                stroke={isSelected ? '#fff' : 'none'}
                strokeWidth={2}
              />
              <text
                x={scaleX(word.x)} y={scaleY(word.y) - 10}
                fill="#e5e7eb"
                fontSize="9"
                textAnchor="middle"
              >
                {word.text}
              </text>
              {showSimilar && selectedWord && word.text !== selected && (
                <text
                  x={scaleX(word.x)} y={scaleY(word.y) + 16}
                  fill="#9ca3af"
                  fontSize="8"
                  textAnchor="middle"
                >
                  {(sim * 100).toFixed(0)}%
                </text>
              )}
            </g>
          );
        })}
      </svg>
      
      {/* Legend */}
      <div className="mt-2 flex flex-wrap justify-center gap-2 text-xs">
        {Object.entries(COLORS).map(([cat, color]) => (
          <span key={cat} className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-gray-400">
              {lang === 'ru' 
                ? { animal: 'животные', food: 'еда', tech: 'техника', emotion: 'эмоции' }[cat]
                : cat
              }
            </span>
          </span>
        ))}
      </div>
      
      {/* Arithmetic example */}
      <div className="mt-2 text-center text-xs text-gray-500">
        {lang === 'ru' ? 'Арифметика: king - man + woman ≈ queen' : 'Arithmetic: king - man + woman ≈ queen'}
      </div>
    </div>
  );
}
