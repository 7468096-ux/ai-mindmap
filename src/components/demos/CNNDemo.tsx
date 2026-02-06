'use client';

import { useState, useMemo } from 'react';

interface Props { lang?: 'ru' | 'en'; }

// 8x8 simple image patterns
const IMAGES = [
  { name: 'edge_v', data: [
    [0,0,1,1,1,1,0,0],
    [0,0,1,1,1,1,0,0],
    [0,0,1,1,1,1,0,0],
    [0,0,1,1,1,1,0,0],
    [0,0,1,1,1,1,0,0],
    [0,0,1,1,1,1,0,0],
    [0,0,1,1,1,1,0,0],
    [0,0,1,1,1,1,0,0],
  ]},
  { name: 'edge_h', data: [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
  ]},
  { name: 'cross', data: [
    [0,0,0,1,1,0,0,0],
    [0,0,0,1,1,0,0,0],
    [0,0,0,1,1,0,0,0],
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
    [0,0,0,1,1,0,0,0],
    [0,0,0,1,1,0,0,0],
    [0,0,0,1,1,0,0,0],
  ]},
  { name: 'diag', data: [
    [1,0,0,0,0,0,0,0],
    [1,1,0,0,0,0,0,0],
    [0,1,1,0,0,0,0,0],
    [0,0,1,1,0,0,0,0],
    [0,0,0,1,1,0,0,0],
    [0,0,0,0,1,1,0,0],
    [0,0,0,0,0,1,1,0],
    [0,0,0,0,0,0,1,1],
  ]},
];

// 3x3 filters
const FILTERS = {
  'edge_v': [[-1,0,1],[-1,0,1],[-1,0,1]],
  'edge_h': [[-1,-1,-1],[0,0,0],[1,1,1]],
  'blur': [[1,1,1],[1,1,1],[1,1,1]],
  'sharpen': [[0,-1,0],[-1,5,-1],[0,-1,0]],
};

export default function CNNDemo({ lang = 'ru' }: Props) {
  const [imageIdx, setImageIdx] = useState(0);
  const [filterKey, setFilterKey] = useState<keyof typeof FILTERS>('edge_v');
  const [filterPos, setFilterPos] = useState({ x: 0, y: 0 });
  
  const image = IMAGES[imageIdx].data;
  const filter = FILTERS[filterKey];
  
  // Compute convolution output
  const output = useMemo(() => {
    const result: number[][] = [];
    for (let y = 0; y <= 5; y++) {
      const row: number[] = [];
      for (let x = 0; x <= 5; x++) {
        let sum = 0;
        for (let fy = 0; fy < 3; fy++) {
          for (let fx = 0; fx < 3; fx++) {
            sum += image[y + fy][x + fx] * filter[fy][fx];
          }
        }
        row.push(sum);
      }
      result.push(row);
    }
    return result;
  }, [image, filter]);
  
  const maxVal = Math.max(...output.flat().map(Math.abs));
  
  const cellSize = 18;
  const filterCellSize = 22;
  
  const explanation = lang === 'ru' ? {
    title: '🎯 Что здесь происходит?',
    text: 'Фильтр (ядро) 3×3 скользит по картинке. В каждой позиции: умножаем пиксели на фильтр и складываем. Результат = новый пиксель. Так CNN находит края, линии, текстуры.',
    hint: 'Кликай по картинке чтобы двигать фильтр',
  } : {
    title: '🎯 What\'s happening?',
    text: 'Filter (kernel) 3×3 slides over image. At each position: multiply pixels by filter and sum. Result = new pixel. This is how CNN finds edges, lines, textures.',
    hint: 'Click on image to move filter',
  };
  
  const filterNames = lang === 'ru' 
    ? { edge_v: 'Верт. край', edge_h: 'Гор. край', blur: 'Размытие', sharpen: 'Резкость' }
    : { edge_v: 'V Edge', edge_h: 'H Edge', blur: 'Blur', sharpen: 'Sharpen' };
  
  return (
    <div className="bg-gray-800 rounded-lg p-3">
      <div className="mb-3 p-2 bg-gray-700/50 rounded text-xs">
        <div className="text-amber-400 font-medium mb-1">{explanation.title}</div>
        <div className="text-gray-300 leading-relaxed">{explanation.text}</div>
        <div className="text-gray-500 mt-1 italic">{explanation.hint}</div>
      </div>
      
      <div className="flex justify-around items-start">
        {/* Input image */}
        <div>
          <div className="text-gray-400 text-xs mb-1 text-center">{lang === 'ru' ? 'Вход' : 'Input'}</div>
          <div className="relative" style={{ width: cellSize * 8, height: cellSize * 8 }}>
            {image.map((row, y) => row.map((val, x) => (
              <div
                key={`${x}-${y}`}
                className="absolute cursor-pointer"
                style={{
                  left: x * cellSize, top: y * cellSize,
                  width: cellSize - 1, height: cellSize - 1,
                  backgroundColor: val ? '#10b981' : '#1f2937',
                }}
                onClick={() => setFilterPos({ x: Math.min(x, 5), y: Math.min(y, 5) })}
              />
            )))}
            {/* Filter overlay */}
            <div
              className="absolute border-2 border-cyan-400 pointer-events-none"
              style={{
                left: filterPos.x * cellSize - 1,
                top: filterPos.y * cellSize - 1,
                width: cellSize * 3 + 1,
                height: cellSize * 3 + 1,
              }}
            />
          </div>
        </div>
        
        {/* Filter */}
        <div>
          <div className="text-gray-400 text-xs mb-1 text-center">{lang === 'ru' ? 'Фильтр' : 'Filter'}</div>
          <div style={{ width: filterCellSize * 3, height: filterCellSize * 3 }}>
            {filter.map((row, y) => row.map((val, x) => (
              <div
                key={`f-${x}-${y}`}
                className="inline-flex items-center justify-center text-xs font-mono"
                style={{
                  width: filterCellSize - 1, height: filterCellSize - 1,
                  backgroundColor: val > 0 ? '#10b981' : val < 0 ? '#ef4444' : '#374151',
                  color: '#fff',
                }}
              >
                {val}
              </div>
            )))}
          </div>
        </div>
        
        {/* Output */}
        <div>
          <div className="text-gray-400 text-xs mb-1 text-center">{lang === 'ru' ? 'Выход' : 'Output'}</div>
          <div style={{ width: cellSize * 6, height: cellSize * 6 }}>
            {output.map((row, y) => row.map((val, x) => {
              const intensity = maxVal > 0 ? Math.abs(val) / maxVal : 0;
              const isActive = x === filterPos.x && y === filterPos.y;
              return (
                <div
                  key={`o-${x}-${y}`}
                  className={`inline-flex items-center justify-center text-[8px] font-mono ${isActive ? 'ring-2 ring-cyan-400' : ''}`}
                  style={{
                    width: cellSize - 1, height: cellSize - 1,
                    backgroundColor: val > 0 
                      ? `rgba(16, 185, 129, ${intensity})` 
                      : `rgba(239, 68, 68, ${intensity})`,
                    color: intensity > 0.5 ? '#fff' : '#9ca3af',
                  }}
                >
                  {val}
                </div>
              );
            }))}
          </div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="mt-3 flex flex-wrap justify-center gap-1">
        {IMAGES.map((img, i) => (
          <button key={i} onClick={() => setImageIdx(i)}
            className={`px-2 py-1 text-xs rounded ${imageIdx === i ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-400'}`}>
            {i + 1}
          </button>
        ))}
        <span className="text-gray-600 mx-1">|</span>
        {(Object.keys(FILTERS) as Array<keyof typeof FILTERS>).map(key => (
          <button key={key} onClick={() => setFilterKey(key)}
            className={`px-2 py-1 text-xs rounded ${filterKey === key ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-400'}`}>
            {filterNames[key]}
          </button>
        ))}
      </div>
    </div>
  );
}
