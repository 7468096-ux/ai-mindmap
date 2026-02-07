'use client';

import { useState, useEffect } from 'react';
import { Language } from '@/data/nodes';

interface Props {
  lang?: Language;
}

export default function DiffusionDemo({ lang = 'en' }: Props) {
  const [step, setStep] = useState(10);
  const [isAnimating, setIsAnimating] = useState(false);
  const totalSteps = 10;
  
  // Generate noise pattern based on step
  const generatePixels = () => {
    const pixels = [];
    const noiseAmount = step / totalSteps;
    
    for (let i = 0; i < 64; i++) {
      // Original pattern: simple gradient
      const row = Math.floor(i / 8);
      const col = i % 8;
      const originalValue = (row + col) / 14;
      
      // Add noise
      const noise = (Math.random() - 0.5) * noiseAmount * 2;
      const value = Math.max(0, Math.min(1, originalValue * (1 - noiseAmount) + noise + noiseAmount * 0.5));
      
      pixels.push(value);
    }
    return pixels;
  };
  
  const [pixels, setPixels] = useState(generatePixels());
  
  useEffect(() => {
    setPixels(generatePixels());
  }, [step]);
  
  // Animation
  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setStep(prev => {
          if (prev <= 0) {
            setIsAnimating(false);
            return 0;
          }
          return prev - 1;
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [isAnimating]);
  
  const startDenoising = () => {
    setStep(10);
    setIsAnimating(true);
  };

  return (
    <div className="space-y-4">
      <div className="text-center text-gray-400 text-xs mb-2">
        {lang === 'ru' 
          ? 'Постепенное удаление шума (denoising)' 
          : 'Gradual noise removal (denoising)'}
      </div>
      
      {/* Image grid */}
      <div className="flex justify-center">
        <div className="grid grid-cols-8 gap-0.5 p-2 bg-gray-800/50 rounded-lg">
          {pixels.map((value, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-sm transition-colors duration-200"
              style={{
                backgroundColor: `rgb(${Math.round(value * 100 + 100)}, ${Math.round(value * 80 + 80)}, ${Math.round(value * 200 + 55)})`,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Step indicator */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400">
          {lang === 'ru' ? 'Шум' : 'Noise'}
        </span>
        <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300"
            style={{ width: `${(1 - step / totalSteps) * 100}%` }}
          />
        </div>
        <span className="text-xs text-gray-400">
          {lang === 'ru' ? 'Чисто' : 'Clean'}
        </span>
      </div>
      
      {/* Step slider */}
      <div>
        <label className="text-gray-400 text-xs block mb-1">
          {lang === 'ru' ? 'Шаг' : 'Step'}: {totalSteps - step}/{totalSteps}
        </label>
        <input
          type="range"
          min="0"
          max="10"
          step="1"
          value={10 - step}
          onChange={(e) => setStep(10 - parseInt(e.target.value))}
          className="w-full accent-purple-500"
          disabled={isAnimating}
        />
      </div>
      
      {/* Denoise button */}
      <button
        onClick={startDenoising}
        disabled={isAnimating}
        className="w-full py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-600 text-white text-sm rounded-lg transition"
      >
        {isAnimating 
          ? (lang === 'ru' ? '⏳ Удаляем шум...' : '⏳ Denoising...') 
          : (lang === 'ru' ? '🎨 Запустить denoising' : '🎨 Start denoising')}
      </button>
    </div>
  );
}
