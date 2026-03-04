'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { initialNodes, AINode, Language, levelColors } from '@/data/nodes';

interface Props {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  onSelectNode: (node: AINode) => void;
}

function fuzzyMatch(text: string, query: string): boolean {
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  let qi = 0;
  for (let i = 0; i < lower.length && qi < q.length; i++) {
    if (lower[i] === q[qi]) qi++;
  }
  return qi === q.length;
}

function matchScore(text: string, query: string): number {
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  if (lower === q) return 100;
  if (lower.startsWith(q)) return 80;
  if (lower.includes(q)) return 60;
  return fuzzyMatch(text, query) ? 30 : 0;
}

export default function SearchPalette({ lang, isOpen, onClose, onSelectNode }: Props) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.length > 0
    ? initialNodes
        .map(node => {
          const ruScore = matchScore(node.data.ru.label, query);
          const enScore = matchScore(node.data.en.label, query);
          return { node, score: Math.max(ruScore, enScore) };
        })
        .filter(r => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 12)
    : [];

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      onSelectNode(results[selectedIndex].node);
      onClose();
    }
  }, [results, selectedIndex, onClose, onSelectNode]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  const texts = {
    en: { placeholder: 'Search AI concepts...', noResults: 'No results found', hint: '⌘K to search • ESC to close' },
    ru: { placeholder: 'Поиск AI концепций...', noResults: 'Ничего не найдено', hint: '⌘K поиск • ESC закрыть' },
  };
  const t = texts[lang];

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" onClick={onClose} />
      <div className="fixed top-[15%] left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-[101]">
        <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
          {/* Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800">
            <span className="text-gray-500 text-lg">🔍</span>
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.placeholder}
              className="flex-1 bg-transparent text-white text-lg outline-none placeholder-gray-600"
              autoComplete="off"
              spellCheck={false}
            />
            <kbd className="text-xs text-gray-600 bg-gray-800 px-2 py-0.5 rounded">ESC</kbd>
          </div>

          {/* Results */}
          {query.length > 0 && (
            <div className="max-h-80 overflow-y-auto">
              {results.length === 0 ? (
                <div className="px-4 py-8 text-center text-gray-500">{t.noResults}</div>
              ) : (
                results.map((r, i) => (
                  <button
                    key={r.node.id}
                    onClick={() => { onSelectNode(r.node); onClose(); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      i === selectedIndex ? 'bg-purple-900/40' : 'hover:bg-gray-800/50'
                    }`}
                  >
                    <span className="text-xl">{r.node.data.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-medium truncate">
                        {r.node.data[lang].label}
                      </div>
                      <div className="text-gray-500 text-xs truncate">
                        {r.node.data[lang === 'ru' ? 'en' : 'ru'].label}
                      </div>
                    </div>
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: levelColors[r.node.data.level] }}
                    />
                  </button>
                ))
              )}
            </div>
          )}

          {/* Hint */}
          <div className="px-4 py-2 border-t border-gray-800 text-center">
            <span className="text-xs text-gray-600">{t.hint}</span>
          </div>
        </div>
      </div>
    </>
  );
}
