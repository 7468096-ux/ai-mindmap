'use client';

import { Language } from '@/data/nodes';
import { GamificationState, getLevel, getNextLevel, getLevelProgress } from '@/data/gamification';

interface Props {
  lang: Language;
  state: GamificationState;
}

export default function XPBar({ lang, state }: Props) {
  const level = getLevel(state.totalXP);
  const nextLevel = getNextLevel(state.totalXP);
  const progress = getLevelProgress(state.totalXP);
  const streak = state.streak.currentStreak;

  return (
    <div className="flex items-center gap-3 bg-gray-900/80 backdrop-blur rounded-lg px-3 py-2 text-xs">
      {/* Level */}
      <div className="flex items-center gap-1.5">
        <span className="text-base">{level.emoji}</span>
        <span className="text-gray-300 font-medium">
          {lang === 'ru' ? level.nameRu : level.name}
        </span>
      </div>

      {/* XP Bar */}
      <div className="flex items-center gap-2 min-w-[100px]">
        <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-gray-500 tabular-nums whitespace-nowrap">
          {state.totalXP}{nextLevel ? `/${nextLevel.minXP}` : ''} XP
        </span>
      </div>

      {/* Streak */}
      {streak > 0 && (
        <div className="flex items-center gap-1 text-orange-400">
          <span>🔥</span>
          <span className="font-bold">{streak}</span>
        </div>
      )}
    </div>
  );
}
