'use client';

import { useMemo } from 'react';
import { Language, initialNodes, levelColors, AbstractionLevel } from '@/data/nodes';
import { GamificationState, getLevel, getNextLevel, getLevelProgress, LEVELS } from '@/data/gamification';
import { flashcardsData, CardState, loadSM2, getDueCount } from '@/data/flashcards';

interface Props {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  gamification: GamificationState;
  completedNodes: string[];
}

export default function StatsPanel({ lang, isOpen, onClose, gamification, completedNodes }: Props) {
  if (!isOpen) return null;

  const level = getLevel(gamification.totalXP);
  const nextLevel = getNextLevel(gamification.totalXP);
  const progress = getLevelProgress(gamification.totalXP);
  const sm2States = loadSM2();

  // Stats by level
  const levelStats = useMemo(() => {
    const stats: Record<AbstractionLevel, { total: number; completed: number }> = {
      field: { total: 0, completed: 0 },
      theory: { total: 0, completed: 0 },
      method: { total: 0, completed: 0 },
      algorithm: { total: 0, completed: 0 },
      implementation: { total: 0, completed: 0 },
    };
    initialNodes.forEach(n => {
      stats[n.data.level].total++;
      if (completedNodes.includes(n.id)) stats[n.data.level].completed++;
    });
    return stats;
  }, [completedNodes]);

  const totalCompleted = completedNodes.length;
  const totalNodes = initialNodes.length;
  const completionPercent = Math.round((totalCompleted / totalNodes) * 100);

  // Flashcard stats
  const masteredCards = flashcardsData.filter(c => {
    const s = sm2States[c.id];
    return s && s.repetitions >= 3;
  }).length;
  const dueCards = getDueCount(flashcardsData, sm2States);

  // Study time estimate (rough: 3 min per node read)
  const estimatedMinutes = totalCompleted * 3;

  const texts = {
    en: {
      title: 'My Progress',
      overallProgress: 'Overall Progress',
      nodesExplored: 'Nodes Explored',
      level: 'Current Level',
      nextLevel: 'Next Level',
      xpNeeded: 'XP needed',
      streak: 'Current Streak',
      longestStreak: 'Best Streak',
      days: 'days',
      flashcards: 'Flashcards',
      mastered: 'Mastered',
      dueToday: 'Due Today',
      byCategory: 'By Category',
      studyTime: 'Est. Study Time',
      minutes: 'min',
      maxLevel: 'Max level reached!',
      achievements: 'Achievements',
    },
    ru: {
      title: 'Мой прогресс',
      overallProgress: 'Общий прогресс',
      nodesExplored: 'Изучено нод',
      level: 'Текущий уровень',
      nextLevel: 'Следующий уровень',
      xpNeeded: 'XP до уровня',
      streak: 'Текущая серия',
      longestStreak: 'Лучшая серия',
      days: 'дн.',
      flashcards: 'Карточки',
      mastered: 'Выучено',
      dueToday: 'На повтор',
      byCategory: 'По категориям',
      studyTime: 'Время обучения',
      minutes: 'мин',
      maxLevel: 'Максимальный уровень!',
      achievements: 'Достижения',
    },
  };
  const t = texts[lang];

  const levelLabelsLocal: Record<string, Record<AbstractionLevel, string>> = {
    en: { field: 'Fields', theory: 'Theory', method: 'Methods', algorithm: 'Algorithms', implementation: 'Implementations' },
    ru: { field: 'Области', theory: 'Теория', method: 'Методы', algorithm: 'Алгоритмы', implementation: 'Имплементации' },
  };

  // Achievements
  const achievements = [
    { emoji: '🌱', name: lang === 'ru' ? 'Первые шаги' : 'First Steps', desc: lang === 'ru' ? 'Изучи 1 ноду' : 'Read 1 node', done: totalCompleted >= 1 },
    { emoji: '🔟', name: lang === 'ru' ? 'Десяточка' : 'Top 10', desc: lang === 'ru' ? 'Изучи 10 нод' : 'Read 10 nodes', done: totalCompleted >= 10 },
    { emoji: '🔥', name: lang === 'ru' ? 'В огне' : 'On Fire', desc: lang === 'ru' ? 'Серия 3 дня' : '3 day streak', done: gamification.streak.longestStreak >= 3 },
    { emoji: '🧠', name: lang === 'ru' ? 'Флешкард мастер' : 'Flashcard Master', desc: lang === 'ru' ? 'Выучи 10 карточек' : 'Master 10 cards', done: masteredCards >= 10 },
    { emoji: '💯', name: lang === 'ru' ? 'Пятёрочка' : 'Perfect Score', desc: lang === 'ru' ? '100 XP' : '100 XP', done: gamification.totalXP >= 100 },
    { emoji: '🏆', name: lang === 'ru' ? 'Половина пути' : 'Halfway There', desc: lang === 'ru' ? 'Изучи 50% нод' : 'Read 50% nodes', done: completionPercent >= 50 },
    { emoji: '👑', name: lang === 'ru' ? 'Мастер AI' : 'AI Master', desc: lang === 'ru' ? 'Изучи все ноды' : 'Read all nodes', done: completionPercent >= 100 },
    { emoji: '⚡', name: lang === 'ru' ? '500 XP' : '500 XP Club', desc: lang === 'ru' ? 'Набери 500 XP' : 'Earn 500 XP', done: gamification.totalXP >= 500 },
  ];

  const earnedCount = achievements.filter(a => a.done).length;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-x-2 bottom-2 md:inset-x-auto md:bottom-auto md:right-4 md:top-16 md:w-[420px] z-50 max-h-[80vh] md:max-h-[85vh] overflow-y-auto bg-gray-900/95 backdrop-blur rounded-2xl shadow-2xl border border-gray-700"
        onMouseDown={e => e.stopPropagation()} onTouchStart={e => e.stopPropagation()}>

        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-900/80 to-pink-900/80 backdrop-blur p-4 z-10 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-white font-bold text-lg">📊 {t.title}</h2>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white text-xl w-8 h-8 flex items-center justify-center bg-black/20 rounded-full">×</button>
        </div>

        <div className="p-4 space-y-4">
          {/* Overall Progress */}
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <div className="text-gray-400 text-xs uppercase tracking-wide mb-3">{t.overallProgress}</div>
            <div className="flex items-end gap-4 mb-3">
              <div className="text-4xl font-bold text-white">{completionPercent}%</div>
              <div className="text-gray-400 text-sm pb-1">{totalCompleted}/{totalNodes} {t.nodesExplored}</div>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-700" style={{ width: `${completionPercent}%` }} />
            </div>
          </div>

          {/* Level + XP */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/50">
              <div className="text-gray-400 text-[10px] uppercase tracking-wide mb-1">{t.level}</div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{level.emoji}</span>
                <div>
                  <div className="text-white font-bold text-sm">{lang === 'ru' ? level.nameRu : level.name}</div>
                  <div className="text-gray-500 text-xs">{gamification.totalXP} XP</div>
                </div>
              </div>
              {nextLevel ? (
                <div className="mt-2">
                  <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="text-gray-500 text-[10px] mt-1">{nextLevel.minXP - gamification.totalXP} {t.xpNeeded}</div>
                </div>
              ) : (
                <div className="text-green-400 text-xs mt-2">✨ {t.maxLevel}</div>
              )}
            </div>

            <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/50">
              <div className="text-gray-400 text-[10px] uppercase tracking-wide mb-1">{t.streak}</div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🔥</span>
                <span className="text-white font-bold text-2xl">{gamification.streak.currentStreak}</span>
                <span className="text-gray-500 text-xs">{t.days}</span>
              </div>
              <div className="text-gray-500 text-xs">
                {t.longestStreak}: <span className="text-orange-400 font-bold">{gamification.streak.longestStreak}</span> {t.days}
              </div>
              <div className="text-gray-500 text-xs mt-1">
                {t.studyTime}: <span className="text-purple-400 font-bold">~{estimatedMinutes}</span> {t.minutes}
              </div>
            </div>
          </div>

          {/* Flashcard stats */}
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <div className="text-gray-400 text-xs uppercase tracking-wide mb-3">🎴 {t.flashcards}</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="text-green-400 font-bold text-xl">{masteredCards}/{flashcardsData.length}</div>
                <div className="text-gray-500 text-xs">{t.mastered}</div>
              </div>
              <div className="text-center">
                <div className={`font-bold text-xl ${dueCards > 0 ? 'text-red-400' : 'text-gray-500'}`}>{dueCards}</div>
                <div className="text-gray-500 text-xs">{t.dueToday}</div>
              </div>
            </div>
          </div>

          {/* By category */}
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <div className="text-gray-400 text-xs uppercase tracking-wide mb-3">{t.byCategory}</div>
            <div className="space-y-2">
              {(Object.keys(levelStats) as AbstractionLevel[]).map(lvl => {
                const stat = levelStats[lvl];
                const pct = stat.total > 0 ? Math.round((stat.completed / stat.total) * 100) : 0;
                return (
                  <div key={lvl} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded" style={{ backgroundColor: levelColors[lvl] }} />
                    <span className="text-gray-300 text-xs flex-1">{levelLabelsLocal[lang][lvl]}</span>
                    <span className="text-gray-500 text-xs tabular-nums">{stat.completed}/{stat.total}</span>
                    <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: levelColors[lvl] }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <div className="text-gray-400 text-xs uppercase tracking-wide mb-3">
              🏅 {t.achievements} ({earnedCount}/{achievements.length})
            </div>
            <div className="grid grid-cols-2 gap-2">
              {achievements.map((a, i) => (
                <div key={i} className={`flex items-center gap-2 p-2 rounded-lg ${a.done ? 'bg-purple-900/20 border border-purple-700/30' : 'bg-gray-900/30 opacity-50'}`}>
                  <span className="text-lg">{a.emoji}</span>
                  <div>
                    <div className={`text-xs font-medium ${a.done ? 'text-white' : 'text-gray-500'}`}>{a.name}</div>
                    <div className="text-[10px] text-gray-500">{a.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
