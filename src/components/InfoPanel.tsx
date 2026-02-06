'use client';

import { AINode, categoryColors } from '@/data/nodes';

interface InfoPanelProps {
  node: AINode | null;
  onClose: () => void;
}

const categoryLabels = {
  root: 'Корень',
  branch: 'Ветка',
  concept: 'Концепция', 
  technique: 'Техника',
};

export default function InfoPanel({ node, onClose }: InfoPanelProps) {
  if (!node) return null;

  const { label, emoji, description, category } = node.data;
  const color = categoryColors[category];

  return (
    <div className="absolute right-4 top-4 w-80 bg-gray-900 rounded-2xl shadow-2xl overflow-hidden z-50">
      {/* Header */}
      <div 
        className="p-4 flex items-center gap-3"
        style={{ backgroundColor: color }}
      >
        {emoji && <span className="text-3xl">{emoji}</span>}
        <div>
          <h2 className="text-white font-bold text-lg">{label}</h2>
          <span className="text-white/70 text-xs uppercase tracking-wide">
            {categoryLabels[category]}
          </span>
        </div>
        <button 
          onClick={onClose}
          className="ml-auto text-white/70 hover:text-white text-xl"
        >
          ×
        </button>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <p className="text-gray-300 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
