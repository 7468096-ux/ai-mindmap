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
    <div className="flex items-center gap-3 text-xs">
      {/* Level badge */}
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="text-base drop-shadow-lg">{level.emoji}</span>
        <span className="text-gray-300 font-semibold tracking-wide">
          {lang === 'ru' ? level.nameRu : level.name}
        </span>
      </div>

      {/* XP Bar */}
      <div className="flex items-center gap-2 min-w-[110px] flex-1">
        <div className="flex-1 h-[5px] bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 transition-all duration-700 ease-out relative"
            style={{ width: `${Math.max(progress, 2)}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          </div>
        </div>
        <span className="text-gray-500 tabular-nums whitespace-nowrap text-[10px] font-mono">
          {state.totalXP}{nextLevel ? `/${nextLevel.minXP}` : ''}
        </span>
      </div>

      {/* Streak */}
      {streak > 0 && (
        <div className="flex items-center gap-0.5 shrink-0">
          <span className="text-sm">🔥</span>
          <span className="text-orange-400 font-bold text-[11px]">{streak}</span>
        </div>
      )}
    </div>
  );
}
