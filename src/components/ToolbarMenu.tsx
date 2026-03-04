'use client';

import { useState, useRef, useEffect } from 'react';
import { Language } from '@/data/nodes';
import { GamificationState, getLevel } from '@/data/gamification';

export type PanelId = 'paths' | 'flashcards' | 'quiz' | 'support' | 'stats' | 'settings' | null;

interface Props {
  lang: Language;
  openPanel: PanelId;
  onPanelChange: (panel: PanelId) => void;
  onSearch: () => void;
  expandAll: boolean;
  onToggleExpandAll: () => void;
  gamification: GamificationState;
  dueCards: number;
  totalNodes: number;
  completedNodes: number;
}

interface MenuItem {
  id: PanelId;
  emoji: string;
  label: { en: string; ru: string };
  badge?: string | number;
  dividerAfter?: boolean;
}

export default function ToolbarMenu({
  lang, openPanel, onPanelChange, onSearch,
  expandAll, onToggleExpandAll, gamification,
  dueCards, totalNodes, completedNodes,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  const level = getLevel(gamification.totalXP);

  const menuItems: MenuItem[] = [
    {
      id: 'paths',
      emoji: '📚',
      label: { en: 'Learning Paths', ru: 'Пути изучения' },
    },
    {
      id: 'flashcards',
      emoji: '🎴',
      label: { en: 'Flashcards (SM-2)', ru: 'Карточки (SM-2)' },
      badge: dueCards > 0 ? dueCards : undefined,
    },
    {
      id: 'quiz',
      emoji: '📝',
      label: { en: 'Mini-Quiz', ru: 'Мини-тест' },
      dividerAfter: true,
    },
    {
      id: 'stats',
      emoji: '📊',
      label: { en: 'My Progress', ru: 'Мой прогресс' },
    },
    {
      id: 'settings',
      emoji: '⚙️',
      label: { en: 'Settings', ru: 'Настройки' },
      dividerAfter: true,
    },
    {
      id: 'support',
      emoji: '☕',
      label: { en: 'Support Project', ru: 'Поддержать проект' },
    },
  ];

  const handleItemClick = (id: PanelId) => {
    onPanelChange(openPanel === id ? null : id);
    setIsOpen(false);
  };

  return (
    <div ref={menuRef} className="fixed right-4 top-4 z-40" data-no-pan>
      {/* Main menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl font-medium transition-all shadow-lg ${
          isOpen
            ? 'bg-purple-600 text-white'
            : 'bg-gray-800/90 backdrop-blur text-gray-200 hover:bg-gray-700/90'
        }`}
      >
        <span className="text-lg">{isOpen ? '✕' : '☰'}</span>
        <span className="hidden sm:inline text-sm">{lang === 'ru' ? 'Меню' : 'Menu'}</span>
        {/* Due cards indicator */}
        {dueCards > 0 && !isOpen && (
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-64 bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/80 overflow-hidden">
          {/* Profile header */}
          <div className="px-4 py-3 bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-b border-gray-700/50">
            <div className="flex items-center gap-2">
              <span className="text-xl">{level.emoji}</span>
              <div>
                <div className="text-white text-sm font-semibold">
                  {lang === 'ru' ? level.nameRu : level.name}
                </div>
                <div className="text-gray-400 text-xs">
                  {gamification.totalXP} XP • {completedNodes}/{totalNodes} {lang === 'ru' ? 'нод' : 'nodes'}
                </div>
              </div>
              {gamification.streak.currentStreak > 0 && (
                <div className="ml-auto flex items-center gap-1 text-orange-400 text-sm font-bold">
                  🔥 {gamification.streak.currentStreak}
                </div>
              )}
            </div>
          </div>

          {/* Search shortcut */}
          <button
            onClick={() => { onSearch(); setIsOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:bg-gray-800/60 transition-colors"
          >
            <span>🔍</span>
            <span className="flex-1 text-left text-sm">{lang === 'ru' ? 'Поиск' : 'Search'}</span>
            <kbd className="text-[10px] text-gray-500 bg-gray-800 px-1.5 py-0.5 rounded">⌘K</kbd>
          </button>

          {/* Expand/Collapse */}
          <button
            onClick={() => { onToggleExpandAll(); setIsOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:bg-gray-800/60 transition-colors"
          >
            <span>{expandAll ? '📁' : '📂'}</span>
            <span className="flex-1 text-left text-sm">
              {expandAll
                ? (lang === 'ru' ? 'Свернуть дерево' : 'Collapse Tree')
                : (lang === 'ru' ? 'Показать все ноды' : 'Show All Nodes')
              }
            </span>
          </button>

          <div className="border-t border-gray-700/50 my-1" />

          {/* Menu items */}
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors ${
                  openPanel === item.id
                    ? 'bg-purple-900/30 text-purple-300'
                    : 'text-gray-300 hover:bg-gray-800/60'
                }`}
              >
                <span>{item.emoji}</span>
                <span className="flex-1 text-left text-sm">{item.label[lang]}</span>
                {item.badge && (
                  <span className="text-[10px] bg-red-500/80 text-white px-1.5 py-0.5 rounded-full font-bold animate-pulse">
                    {item.badge}
                  </span>
                )}
                {openPanel === item.id && (
                  <span className="text-purple-400 text-xs">●</span>
                )}
              </button>
              {item.dividerAfter && <div className="border-t border-gray-700/50 my-1" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
