'use client';

import { useState, useEffect } from 'react';
import { Language } from '@/data/nodes';

interface Props {
  lang?: Language;
}

export default function DropoutDemo({ lang = 'en' }: Props) {
  const [dropoutRate, setDropoutRate] = useState(0.3);
  const [droppedNeurons, setDroppedNeurons] = useState<Set<number>>(new Set());
  const neurons = Array.from({ length: 16 }, (_, i) => i);
  
  // Regenerate dropped neurons when rate changes
  useEffect(() => {
    const dropped = new Set<number>();
    neurons.forEach(i => {
      if (Math.random() < dropoutRate) {
        dropped.add(i);
      }
    });
    setDroppedNeurons(dropped);
  }, [dropoutRate]);
  
  const reshuffle = () => {
    const dropped = new Set<number>();
    neurons.forEach(i => {
      if (Math.random() < dropoutRate) {
        dropped.add(i);
      }
    });
    setDroppedNeurons(dropped);
  };

  return (
    <div className="space-y-4">
      <div className="text-center text-gray-400 text-xs mb-2">
        {lang === 'ru' 
          ? 'Случайное выключение нейронов при обучении' 
          : 'Random neuron deactivation during training'}
      </div>
      
      {/* Neuron grid */}
      <div className="grid grid-cols-4 gap-2 p-3 bg-gray-800/50 rounded-lg">
        {neurons.map(i => (
          <div
            key={i}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
              ${droppedNeurons.has(i) 
                ? 'bg-gray-700 text-gray-500 scale-75 opacity-40' 
                : 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white'
              }`}
          >
            {droppedNeurons.has(i) ? '✕' : i + 1}
          </div>
        ))}
      </div>
      
      {/* Stats */}
      <div className="flex justify-between text-xs text-gray-400">
        <span>
          {lang === 'ru' ? 'Активно' : 'Active'}: 
          <span className="text-green-400 ml-1">{16 - droppedNeurons.size}</span>
        </span>
        <span>
          {lang === 'ru' ? 'Выключено' : 'Dropped'}: 
          <span className="text-red-400 ml-1">{droppedNeurons.size}</span>
        </span>
      </div>
      
      {/* Slider */}
      <div>
        <label className="text-gray-400 text-xs block mb-1">
          Dropout rate: {(dropoutRate * 100).toFixed(0)}%
        </label>
        <input
          type="range"
          min="0"
          max="0.8"
          step="0.1"
          value={dropoutRate}
          onChange={(e) => setDropoutRate(parseFloat(e.target.value))}
          className="w-full accent-purple-500"
        />
      </div>
      
      {/* Reshuffle button */}
      <button
        onClick={reshuffle}
        className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm rounded-lg transition"
      >
        🎲 {lang === 'ru' ? 'Новый batch' : 'New batch'}
      </button>
    </div>
  );
}
