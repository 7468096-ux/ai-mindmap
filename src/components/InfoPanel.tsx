'use client';

import { AINode, levelColors, levelLabels, Language } from '@/data/nodes';
import { hasDemo, getDemo } from './demos';

interface InfoPanelProps {
  node: AINode | null;
  lang: Language;
  onClose: () => void;
}

export default function InfoPanel({ node, lang, onClose }: InfoPanelProps) {
  if (!node) return null;

  const { emoji, level } = node.data;
  const content = node.data[lang];
  const color = levelColors[level];
  
  const DemoComponent = getDemo(node.id);
  const showDemo = hasDemo(node.id);

  // Останавливаем propagation событий мыши чтобы не двигался фон
  const stopPropagation = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="absolute right-4 top-4 w-[420px] bg-gray-900 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-[90vh] overflow-y-auto"
      onMouseDown={stopPropagation}
      onMouseMove={stopPropagation}
      onTouchStart={stopPropagation}
      onTouchMove={stopPropagation}
    >
      {/* Header */}
      <div 
        className="p-4 flex items-center gap-3 sticky top-0 z-10"
        style={{ backgroundColor: color }}
      >
        {emoji && <span className="text-3xl">{emoji}</span>}
        <div className="flex-1">
          <h2 className="text-white font-bold text-lg">{content.label}</h2>
          <span className="text-white/70 text-xs uppercase tracking-wide">
            {levelLabels[lang][level]}
          </span>
        </div>
        <button 
          onClick={onClose}
          className="text-white/70 hover:text-white text-2xl font-light"
        >
          ×
        </button>
      </div>
      
      {/* Interactive Demo */}
      {showDemo && DemoComponent && (
        <div className="p-4 border-b border-gray-800">
          <h3 className="text-gray-400 text-xs uppercase tracking-wide mb-3">
            🎮 {lang === 'ru' ? 'Интерактивное демо' : 'Interactive Demo'}
          </h3>
          <DemoComponent lang={lang} />
        </div>
      )}
      
      {/* Description */}
      <div className="p-4 border-b border-gray-800">
        <p className="text-gray-300 text-sm leading-relaxed">
          {content.description}
        </p>
      </div>
      
      {/* Key Points */}
      <div className="p-4 border-b border-gray-800">
        <h3 className="text-gray-400 text-xs uppercase tracking-wide mb-3">
          📌 {lang === 'ru' ? 'Ключевые моменты' : 'Key Points'}
        </h3>
        <ul className="space-y-2">
          {content.keyPoints.map((point, i) => (
            <li key={i} className="text-gray-300 text-sm leading-relaxed">
              {point}
            </li>
          ))}
        </ul>
      </div>
      
      {/* How It Works */}
      <div className="p-4">
        <h3 className="text-gray-400 text-xs uppercase tracking-wide mb-3">
          ⚙️ {lang === 'ru' ? 'Как это работает' : 'How It Works'}
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
          {content.howItWorks}
        </p>
      </div>
    </div>
  );
}
