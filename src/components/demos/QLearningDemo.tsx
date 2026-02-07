'use client';

import { useState } from 'react';
import { Language } from '@/data/nodes';

interface Props {
  lang?: Language;
}

// 4x4 grid world
const GRID_SIZE = 4;
const GOAL = { x: 3, y: 3 };
const OBSTACLE = { x: 1, y: 1 };

export default function QLearningDemo({ lang = 'en' }: Props) {
  const [agentPos, setAgentPos] = useState({ x: 0, y: 0 });
  const [totalReward, setTotalReward] = useState(0);
  const [steps, setSteps] = useState(0);
  
  // Simple Q-values (pre-computed for demo)
  const getOptimalAction = (x: number, y: number): 'right' | 'down' | 'left' | 'up' => {
    if (x < GOAL.x && !(x + 1 === OBSTACLE.x && y === OBSTACLE.y)) return 'right';
    if (y < GOAL.y && !(x === OBSTACLE.x && y + 1 === OBSTACLE.y)) return 'down';
    if (x > 0) return 'left';
    return 'up';
  };
  
  const moveAgent = (direction: 'right' | 'down' | 'left' | 'up') => {
    let newX = agentPos.x;
    let newY = agentPos.y;
    
    switch (direction) {
      case 'right': newX = Math.min(GRID_SIZE - 1, agentPos.x + 1); break;
      case 'left': newX = Math.max(0, agentPos.x - 1); break;
      case 'down': newY = Math.min(GRID_SIZE - 1, agentPos.y + 1); break;
      case 'up': newY = Math.max(0, agentPos.y - 1); break;
    }
    
    // Check obstacle
    if (newX === OBSTACLE.x && newY === OBSTACLE.y) {
      setTotalReward(prev => prev - 1);
      setSteps(prev => prev + 1);
      return;
    }
    
    setAgentPos({ x: newX, y: newY });
    setSteps(prev => prev + 1);
    
    // Check goal
    if (newX === GOAL.x && newY === GOAL.y) {
      setTotalReward(prev => prev + 10);
    } else {
      setTotalReward(prev => prev - 0.1);
    }
  };
  
  const reset = () => {
    setAgentPos({ x: 0, y: 0 });
    setTotalReward(0);
    setSteps(0);
  };
  
  const autoMove = () => {
    if (agentPos.x === GOAL.x && agentPos.y === GOAL.y) {
      reset();
      return;
    }
    const action = getOptimalAction(agentPos.x, agentPos.y);
    moveAgent(action);
  };

  return (
    <div className="space-y-4">
      <div className="text-center text-gray-400 text-xs mb-2">
        {lang === 'ru' 
          ? 'Агент учится находить путь к цели' 
          : 'Agent learns to find path to goal'}
      </div>
      
      {/* Grid */}
      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-1 p-2 bg-gray-800/50 rounded-lg">
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
            const x = i % GRID_SIZE;
            const y = Math.floor(i / GRID_SIZE);
            const isAgent = agentPos.x === x && agentPos.y === y;
            const isGoal = GOAL.x === x && GOAL.y === y;
            const isObstacle = OBSTACLE.x === x && OBSTACLE.y === y;
            
            return (
              <div
                key={i}
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg
                  ${isGoal ? 'bg-green-600' : isObstacle ? 'bg-red-900' : 'bg-gray-700'}
                  ${isAgent ? 'ring-2 ring-purple-400' : ''}
                `}
              >
                {isAgent && '🤖'}
                {isGoal && !isAgent && '⭐'}
                {isObstacle && '🧱'}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex justify-center gap-1">
        <button onClick={() => moveAgent('up')} className="p-2 bg-gray-700 rounded hover:bg-gray-600">↑</button>
      </div>
      <div className="flex justify-center gap-1">
        <button onClick={() => moveAgent('left')} className="p-2 bg-gray-700 rounded hover:bg-gray-600">←</button>
        <button onClick={() => moveAgent('down')} className="p-2 bg-gray-700 rounded hover:bg-gray-600">↓</button>
        <button onClick={() => moveAgent('right')} className="p-2 bg-gray-700 rounded hover:bg-gray-600">→</button>
      </div>
      
      {/* Stats */}
      <div className="flex justify-between text-xs text-gray-400">
        <span>Steps: {steps}</span>
        <span>Reward: <span className={totalReward >= 0 ? 'text-green-400' : 'text-red-400'}>{totalReward.toFixed(1)}</span></span>
      </div>
      
      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={autoMove}
          className="flex-1 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm rounded-lg"
        >
          🤖 {lang === 'ru' ? 'Авто-шаг' : 'Auto step'}
        </button>
        <button
          onClick={reset}
          className="flex-1 py-2 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded-lg"
        >
          🔄 Reset
        </button>
      </div>
    </div>
  );
}
