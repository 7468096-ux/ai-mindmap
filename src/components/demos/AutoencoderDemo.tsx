'use client';

import { useState } from 'react';
import { Language } from '@/data/nodes';

interface Props {
  lang?: Language;
}

export default function AutoencoderDemo({ lang = 'en' }: Props) {
  const [latentDim, setLatentDim] = useState(2);
  const inputDim = 8;
  
  // Simulate compression ratio
  const compressionRatio = ((inputDim - latentDim) / inputDim * 100).toFixed(0);
  
  // Generate random "data"
  const inputData = Array.from({ length: inputDim }, () => Math.random());
  
  return (
    <div className="space-y-4">
      <div className="text-center text-gray-400 text-xs mb-2">
        {lang === 'ru' 
          ? 'Encoder сжимает → Latent → Decoder восстанавливает' 
          : 'Encoder compresses → Latent → Decoder reconstructs'}
      </div>
      
      {/* Architecture visualization */}
      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
        {/* Input */}
        <div className="flex flex-col gap-1">
          {Array.from({ length: inputDim }).map((_, i) => (
            <div
              key={i}
              className="w-4 h-3 rounded-sm bg-blue-500"
              style={{ opacity: 0.5 + inputData[i] * 0.5 }}
            />
          ))}
          <span className="text-xs text-gray-500 mt-1">{inputDim}D</span>
        </div>
        
        {/* Encoder arrow */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-400">Encoder</span>
          <span className="text-lg">→</span>
        </div>
        
        {/* Latent space (bottleneck) */}
        <div className="flex flex-col gap-1 px-3 py-2 bg-purple-900/50 rounded-lg border border-purple-500/30">
          {Array.from({ length: latentDim }).map((_, i) => (
            <div
              key={i}
              className="w-6 h-4 rounded-sm bg-purple-500"
            />
          ))}
          <span className="text-xs text-purple-400 mt-1">{latentDim}D</span>
        </div>
        
        {/* Decoder arrow */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-400">Decoder</span>
          <span className="text-lg">→</span>
        </div>
        
        {/* Output */}
        <div className="flex flex-col gap-1">
          {Array.from({ length: inputDim }).map((_, i) => (
            <div
              key={i}
              className="w-4 h-3 rounded-sm bg-green-500"
              style={{ opacity: 0.4 + inputData[i] * 0.5 }}
            />
          ))}
          <span className="text-xs text-gray-500 mt-1">{inputDim}D</span>
        </div>
      </div>
      
      {/* Slider */}
      <div>
        <label className="text-gray-400 text-xs block mb-1">
          Latent dimension: {latentDim}
        </label>
        <input
          type="range"
          min="1"
          max="6"
          step="1"
          value={latentDim}
          onChange={(e) => setLatentDim(parseInt(e.target.value))}
          className="w-full accent-purple-500"
        />
      </div>
      
      {/* Stats */}
      <div className="flex justify-between text-xs">
        <span className="text-gray-400">
          {lang === 'ru' ? 'Сжатие' : 'Compression'}: 
          <span className="text-purple-400 ml-1">{compressionRatio}%</span>
        </span>
        <span className="text-gray-400">
          {lang === 'ru' ? 'Потеря инфо' : 'Info loss'}: 
          <span className={latentDim < 3 ? 'text-red-400' : 'text-green-400'}>
            {latentDim < 3 ? (lang === 'ru' ? 'высокая' : 'high') : (lang === 'ru' ? 'низкая' : 'low')}
          </span>
        </span>
      </div>
    </div>
  );
}
