'use client';

import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { levelColors, AINodeData, Language } from '@/data/nodes';

interface CustomNodeProps {
  data: AINodeData & { lang: Language };
  selected?: boolean;
}

function CustomNode({ data, selected }: CustomNodeProps) {
  const bgColor = levelColors[data.level];
  const content = data[data.lang];
  
  return (
    <div
      className={`
        px-4 py-3 rounded-xl shadow-lg cursor-pointer
        transition-all duration-200 ease-out
        ${selected ? 'ring-4 ring-white ring-opacity-50 scale-110' : 'hover:scale-105'}
      `}
      style={{ 
        backgroundColor: bgColor,
        minWidth: data.level === 'field' ? '200px' : '120px',
      }}
    >
      <Handle type="target" position={Position.Top} className="opacity-0" />
      
      <div className="flex items-center gap-2 justify-center">
        {data.emoji && <span className="text-xl">{data.emoji}</span>}
        <span className="text-white font-semibold text-sm text-center">
          {content.label}
        </span>
      </div>
      
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  );
}

export default memo(CustomNode);
