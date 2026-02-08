'use client';

import { useState } from 'react';
import { learningPaths, LearningPath } from '@/data/learningPaths';
import { Language } from '@/data/nodes';

interface Props {
  lang: Language;
  activePath: string | null;
  onSelectPath: (pathId: string | null) => void;
  onNodeClick: (nodeId: string) => void;
  completedNodes: string[];
  onResetProgress: () => void;
}

export default function LearningPathsPanel({ 
  lang, 
  activePath, 
  onSelectPath, 
  onNodeClick,
  completedNodes,
  onResetProgress
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const texts = {
    en: {
      title: 'Learning Paths',
      subtitle: 'Choose your journey',
      difficulty: { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' },
      time: 'Estimated time',
      nodes: 'topics',
      start: 'Start Path',
      continue: 'Continue',
      active: 'Active',
      progress: 'Progress',
      completed: 'Completed!',
      reset: 'Reset Progress',
      resetConfirm: 'Are you sure? This will clear all progress.',
    },
    ru: {
      title: 'Пути изучения',
      subtitle: 'Выбери свой путь',
      difficulty: { beginner: 'Начинающий', intermediate: 'Средний', advanced: 'Продвинутый' },
      time: 'Время',
      nodes: 'тем',
      start: 'Начать',
      continue: 'Продолжить',
      active: 'Активный',
      reset: 'Сбросить прогресс',
      resetConfirm: 'Вы уверены? Это удалит весь прогресс.',
      progress: 'Прогресс',
      completed: 'Пройдено!',
    },
  };
  const t = texts[lang];

  const difficultyColors = {
    beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
    intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  const getProgress = (path: LearningPath) => {
    const completed = path.nodeIds.filter(id => completedNodes.includes(id)).length;
    return Math.round((completed / path.nodeIds.length) * 100);
  };

  const getNextNode = (path: LearningPath) => {
    return path.nodeIds.find(id => !completedNodes.includes(id)) || path.nodeIds[0];
  };

  return (
    <>
      {/* Toggle Button - stacked vertically */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed right-4 top-4 z-40 px-4 py-2 rounded-lg font-medium transition-all ${
          isOpen || activePath
            ? 'bg-purple-600 text-white'
            : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'
        }`}
      >
        📚 {t.title}
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed right-4 top-16 z-40 w-80 bg-gray-900/95 backdrop-blur rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-white font-bold text-lg">{t.title}</h2>
                <p className="text-gray-400 text-sm">{t.subtitle}</p>
              </div>
              {completedNodes.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm(t.resetConfirm)) {
                      onResetProgress();
                    }
                  }}
                  className="px-2 py-1 text-xs bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded transition-colors"
                  title={t.reset}
                >
                  🔄
                </button>
              )}
            </div>
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {learningPaths.map(path => {
              const progress = getProgress(path);
              const isActive = activePath === path.id;
              
              return (
                <div
                  key={path.id}
                  className={`p-4 border-b border-gray-800 transition-colors ${
                    isActive ? 'bg-purple-900/30' : 'hover:bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{path.emoji}</span>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">
                        {path.title[lang]}
                      </h3>
                      <p className="text-gray-400 text-xs mt-1">
                        {path.description[lang]}
                      </p>
                      
                      {/* Meta info */}
                      <div className="flex gap-2 mt-2 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${difficultyColors[path.difficulty]}`}>
                          {t.difficulty[path.difficulty]}
                        </span>
                        <span className="text-xs text-gray-500">
                          ⏱ {path.estimatedTime}
                        </span>
                        <span className="text-xs text-gray-500">
                          📖 {path.nodeIds.length} {t.nodes}
                        </span>
                      </div>

                      {/* Progress bar */}
                      {progress > 0 && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>{t.progress}</span>
                            <span>{progress}%</span>
                          </div>
                          <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-purple-500 transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Action button */}
                      <button
                        onClick={() => {
                          if (isActive) {
                            onSelectPath(null);
                          } else {
                            onSelectPath(path.id);
                            onNodeClick(getNextNode(path));
                          }
                          setIsOpen(false);
                        }}
                        className={`mt-3 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : progress === 100
                            ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                            : 'bg-purple-600 text-white hover:bg-purple-500'
                        }`}
                      >
                        {isActive ? '✕ ' + (lang === 'ru' ? 'Закрыть' : 'Close') : 
                         progress === 100 ? '✓ ' + t.completed :
                         progress > 0 ? t.continue : t.start}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Close overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
