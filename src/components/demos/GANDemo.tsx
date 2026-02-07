'use client';

import { useState, useEffect } from 'react';
import { Language } from '@/data/nodes';

interface Props {
  lang?: Language;
}

export default function GANDemo({ lang = 'en' }: Props) {
  const [epoch, setEpoch] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  
  // Generate fake image quality based on epoch
  const generateFakeImage = () => {
    const quality = Math.min(epoch / 100, 1);
    const pixels = [];
    
    for (let i = 0; i < 36; i++) {
      const row = Math.floor(i / 6);
      const col = i % 6;
      
      // Target: simple smiley face pattern
      const isEye = (row === 1 && (col === 1 || col === 4));
      const isMouth = (row === 4 && col >= 1 && col <= 4);
      const isFace = row >= 0 && row <= 5 && col >= 0 && col <= 5;
      
      let target = isFace ? 0.8 : 0.2;
      if (isEye || isMouth) target = 0.3;
      
      // Add noise based on training progress
      const noise = (Math.random() - 0.5) * (1 - quality) * 1.5;
      pixels.push(Math.max(0, Math.min(1, target * quality + 0.5 * (1 - quality) + noise)));
    }
    return pixels;
  };
  
  const [fakePixels, setFakePixels] = useState(generateFakeImage());
  
  // Update when epoch changes
  useEffect(() => {
    setFakePixels(generateFakeImage());
  }, [epoch]);
  
  // Training animation
  useEffect(() => {
    if (isTraining && epoch < 100) {
      const timer = setTimeout(() => {
        setEpoch(prev => Math.min(prev + 5, 100));
      }, 100);
      return () => clearTimeout(timer);
    } else if (epoch >= 100) {
      setIsTraining(false);
    }
  }, [isTraining, epoch]);
  
  const startTraining = () => {
    setEpoch(0);
    setIsTraining(true);
  };
  
  const discriminatorScore = Math.min(0.5 + epoch / 200, 0.95);

  return (
    <div className="space-y-4">
      <div className="text-center text-gray-400 text-xs mb-2">
        {lang === 'ru' 
          ? 'Generator создаёт, Discriminator оценивает' 
          : 'Generator creates, Discriminator evaluates'}
      </div>
      
      <div className="flex gap-4 justify-center">
        {/* Real image */}
        <div className="text-center">
          <div className="grid grid-cols-6 gap-0.5 p-2 bg-gray-800/50 rounded-lg border border-green-500/30">
            {Array.from({ length: 36 }).map((_, i) => {
              const row = Math.floor(i / 6);
              const col = i % 6;
              const isEye = (row === 1 && (col === 1 || col === 4));
              const isMouth = (row === 4 && col >= 1 && col <= 4);
              const value = isEye || isMouth ? 0.3 : 0.8;
              return (
                <div
                  key={i}
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: `rgb(${value * 255}, ${value * 200}, ${value * 100})` }}
                />
              );
            })}
          </div>
          <span className="text-xs text-green-400">Real</span>
        </div>
        
        {/* Fake image */}
        <div className="text-center">
          <div className="grid grid-cols-6 gap-0.5 p-2 bg-gray-800/50 rounded-lg border border-purple-500/30">
            {fakePixels.map((value, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-sm transition-colors duration-150"
                style={{ backgroundColor: `rgb(${value * 255}, ${value * 200}, ${value * 100})` }}
              />
            ))}
          </div>
          <span className="text-xs text-purple-400">Generated</span>
        </div>
      </div>
      
      {/* Discriminator score */}
      <div className="text-center text-xs">
        <span className="text-gray-400">Discriminator: </span>
        <span className={discriminatorScore > 0.8 ? 'text-red-400' : 'text-yellow-400'}>
          {epoch < 100 
            ? (lang === 'ru' ? '"Это фейк!"' : '"It\'s fake!"')
            : (lang === 'ru' ? '"Не уверен..."' : '"Not sure..."')}
        </span>
      </div>
      
      {/* Epoch indicator */}
      <div>
        <label className="text-gray-400 text-xs block mb-1">
          Epoch: {epoch}/100
        </label>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-100"
            style={{ width: `${epoch}%` }}
          />
        </div>
      </div>
      
      {/* Train button */}
      <button
        onClick={startTraining}
        disabled={isTraining}
        className="w-full py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-600 text-white text-sm rounded-lg transition"
      >
        {isTraining 
          ? (lang === 'ru' ? '⚔️ Обучаем...' : '⚔️ Training...') 
          : (lang === 'ru' ? '🎮 Обучить GAN' : '🎮 Train GAN')}
      </button>
    </div>
  );
}
