'use client';

import { AINode, levelColors, levelLabels, Language } from '@/data/nodes';
import { hasDemo, getDemo } from './demos';
import { getComparisonsForNode } from '@/data/comparisons';
import ComparisonTable from './ComparisonTable';

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
    <>
      {/* Mobile overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
      />
      
      <div 
        className="fixed md:absolute inset-x-2 bottom-2 md:bottom-auto md:inset-x-auto md:right-4 md:top-4 md:w-[420px] bg-gray-900 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-[70vh] md:max-h-[90vh] overflow-y-auto"
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
          className="text-white/70 hover:text-white text-2xl font-light w-8 h-8 flex items-center justify-center bg-black/20 rounded-full"
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
      <div className="p-4 border-b border-gray-800">
        <h3 className="text-gray-400 text-xs uppercase tracking-wide mb-3">
          ⚙️ {lang === 'ru' ? 'Как это работает' : 'How It Works'}
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
          {content.howItWorks}
        </p>
      </div>
      
      {/* Use Cases - only show if available */}
      {content.useCases && content.useCases.length > 0 && (
        <div className="p-4 border-b border-gray-800">
          <h3 className="text-gray-400 text-xs uppercase tracking-wide mb-3">
            🌍 {lang === 'ru' ? 'Где применяется' : 'Real-World Use Cases'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {content.useCases.map((useCase, i) => (
              <span 
                key={i} 
                className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
              >
                {useCase}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* When to Use - only show if available */}
      {content.whenToUse && (
        <div className="p-4 border-b border-gray-800">
          <h3 className="text-gray-400 text-xs uppercase tracking-wide mb-3">
            🎯 {lang === 'ru' ? 'Когда использовать' : 'When to Use'}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            {content.whenToUse}
          </p>
        </div>
      )}
      
      {/* Code Example - only show if available */}
      {content.codeExample && (
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-400 text-xs uppercase tracking-wide">
              💻 {lang === 'ru' ? 'Пример кода' : 'Code Example'}
            </h3>
            <button
              onClick={() => navigator.clipboard.writeText(content.codeExample!.code)}
              className="text-xs text-gray-500 hover:text-purple-400 transition-colors"
            >
              📋 {lang === 'ru' ? 'Копировать' : 'Copy'}
            </button>
          </div>
          <pre className="bg-gray-950 rounded-lg p-3 overflow-x-auto text-xs">
            <code className="text-green-400 font-mono whitespace-pre">
              {content.codeExample.code}
            </code>
          </pre>
        </div>
      )}
      
      {/* Comparison Tables - only show if available */}
      {getComparisonsForNode(node.id).map(comparison => (
        <div key={comparison.id} className="p-4 border-b border-gray-800">
          <h3 className="text-gray-400 text-xs uppercase tracking-wide mb-3">
            📊 {comparison.title[lang]}
          </h3>
          <ComparisonTable 
            comparison={comparison} 
            currentNodeId={node.id} 
            lang={lang} 
          />
        </div>
      ))}
    </div>
    </>
  );
}
