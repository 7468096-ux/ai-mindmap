'use client';

import { useState } from 'react';
import './space.css';

// Тестовые ноды
const testNodes = [
  { id: 1, name: 'Input Layer', type: 'input', x: 15, y: 30 },
  { id: 2, name: 'Hidden Layer 1', type: 'hidden', x: 40, y: 20 },
  { id: 3, name: 'Hidden Layer 2', type: 'hidden', x: 40, y: 50 },
  { id: 4, name: 'Attention', type: 'hidden', x: 65, y: 35 },
  { id: 5, name: 'Output', type: 'output', x: 85, y: 35 },
];

export default function Playground() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="space-container">
      {/* Звёзды */}
      <div className="stars stars-small"></div>
      <div className="stars stars-medium"></div>
      <div className="stars stars-large"></div>

      {/* Заголовок */}
      <h1 className="space-title">🌌 Neural Explorer - Space Design</h1>
      <p className="space-subtitle">Кликни на ноду чтобы увидеть свечение</p>

      {/* Ноды */}
      {testNodes.map((node) => (
        <div
          key={node.id}
          className={`space-node node-${node.type} ${selectedId === node.id ? 'selected' : ''}`}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          onClick={() => setSelectedId(selectedId === node.id ? null : node.id)}
        >
          <div className="node-glow"></div>
          <div className="node-content">
            <span className="node-icon">
              {node.type === 'input' ? '📥' : node.type === 'output' ? '📤' : '🧠'}
            </span>
            <span className="node-name">{node.name}</span>
          </div>
        </div>
      ))}

      {/* Линии связей */}
      <svg className="connections">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <line x1="18%" y1="32%" x2="38%" y2="22%" stroke="url(#lineGradient)" strokeWidth="2" />
        <line x1="18%" y1="32%" x2="38%" y2="52%" stroke="url(#lineGradient)" strokeWidth="2" />
        <line x1="43%" y1="22%" x2="63%" y2="37%" stroke="url(#lineGradient)" strokeWidth="2" />
        <line x1="43%" y1="52%" x2="63%" y2="37%" stroke="url(#lineGradient)" strokeWidth="2" />
        <line x1="68%" y1="37%" x2="83%" y2="37%" stroke="url(#lineGradient)" strokeWidth="2" />
      </svg>
    </div>
  );
}
