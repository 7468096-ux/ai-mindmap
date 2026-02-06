'use client';

import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { categoryColors } from '@/data/nodes';

interface CustomNodeData {
  label: string;
  emoji?: string;
  description: string;
  category: 'root' | 'branch' | 'concept' | 'technique';
}

interface CustomNodeProps {
  data: CustomNodeData;
  selected?: boolean;
}

function CustomNode({ data, selected }: CustomNodeProps) {
  const nodeData = data;
  const bgColor = categoryColors[nodeData.category];
  
  return (
    <div
      className={`
        px-4 py-3 rounded-xl shadow-lg cursor-pointer
        transition-all duration-200 ease-out
        ${selected ? 'ring-4 ring-white ring-opacity-50 scale-110' : 'hover:scale-105'}
      `}
      style={{ 
        backgroundColor: bgColor,
        minWidth: nodeData.category === 'root' ? '200px' : '140px',
      }}
    >
      <Handle type="target" position={Position.Top} className="opacity-0" />
      
      <div className="flex items-center gap-2 justify-center">
        {nodeData.emoji && <span className="text-xl">{nodeData.emoji}</span>}
        <span className="text-white font-semibold text-sm text-center">
          {nodeData.label}
        </span>
      </div>
      
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  );
}

export default memo(CustomNode);
