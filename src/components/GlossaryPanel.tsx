'use client';

import { useState, useMemo } from 'react';
import { Language, initialNodes } from '@/data/nodes';

interface Props {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  onNodeClick: (nodeId: string) => void;
}

export default function GlossaryPanel({ lang, isOpen, onClose, onNodeClick }: Props) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('all');

  const entries = useMemo(() => {
    return initialNodes
      .map(n => ({
        id: n.id,
        label: n.data[lang].label,
        labelAlt: n.data[lang === 'ru' ? 'en' : 'ru'].label,
        emoji: n.data.emoji || '📦',
        level: n.data.level,
        description: n.data[lang].description,
      }))
      .sort((a, b) => a.label.localeCompare(b.label, lang));
  }, [lang]);

  const filtered = useMemo(() => {
    let result = entries;
    if (filter !== 'all') result = result.filter(e => e.level === filter);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(e =>
        e.label.toLowerCase().includes(q) ||
        e.labelAlt.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [entries, filter, search]);

  if (!isOpen) return null;

  const t = {
    en: { title: 'Glossary', subtitle: `${entries.length} AI terms`, search: 'Search terms...', all: 'All', noResults: 'No results' },
    ru: { title: 'Глоссарий', subtitle: `${entries.length} AI терминов`, search: 'Поиск терминов...', all: 'Все', noResults: 'Ничего не найдено' },
  }[lang];

  const levels = [
    { id: 'all', label: t.all },
    { id: 'field', label: '🏛', color: '#6366f1' },
    { id: 'theory', label: '📖', color: '#8b5cf6' },
    { id: 'method', label: '🔧', color: '#06b6d4' },
    { id: 'algorithm', label: '⚙️', color: '#10b981' },
    { id: 'implementation', label: '🚀', color: '#f59e0b' },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-x-2 bottom-2 md:inset-x-auto md:bottom-auto md:right-4 md:top-16 md:w-[420px] z-50 max-h-[80vh] md:max-h-[85vh] overflow-hidden bg-gray-900/95 backdrop-blur rounded-2xl shadow-2xl border border-gray-700 flex flex-col"
        onMouseDown={e => e.stopPropagation()} onTouchStart={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-white font-bold text-lg">📖 {t.title}</h2>
              <p className="text-gray-400 text-xs">{t.subtitle}</p>
            </div>
            <button onClick={onClose} className="text-white/60 hover:text-white text-xl w-8 h-8 flex items-center justify-center bg-black/20 rounded-full">×</button>
          </div>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t.search}
            className="w-full bg-gray-800 text-white text-sm rounded-lg px-3 py-2 outline-none placeholder-gray-500 border border-gray-700 focus:border-purple-500"
          />
          <div className="flex gap-1 mt-2">
            {levels.map(l => (
              <button key={l.id} onClick={() => setFilter(l.id)}
                className={`px-2 py-1 rounded text-xs transition-colors ${filter === l.id ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-gray-500">{t.noResults}</div>
          ) : (
            filtered.map(entry => (
              <button
                key={entry.id}
                onClick={() => { onNodeClick(entry.id); onClose(); }}
                className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-gray-800/50 transition-colors border-b border-gray-800/50"
              >
                <span className="text-lg mt-0.5">{entry.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium">{entry.label}</div>
                  <div className="text-gray-500 text-[10px]">{entry.labelAlt}</div>
                  <div className="text-gray-400 text-xs mt-0.5 line-clamp-2 leading-relaxed">{entry.description}</div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </>
  );
}
