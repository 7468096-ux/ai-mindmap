'use client';

import { useCallback, useState } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import CustomNode from './CustomNode';
import InfoPanel from './InfoPanel';
import { initialNodes, initialEdges, AINode } from '@/data/nodes';

const nodeTypes = { custom: CustomNode };

const defaultEdgeOptions = {
  type: 'smoothstep',
  style: { stroke: '#6366f1', strokeWidth: 2 },
};

export default function MindMap() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<AINode | null>(null);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node as AINode);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return (
    <div className="w-full h-screen bg-gray-950">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.5}
        maxZoom={2}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#374151" />
        <Controls className="bg-gray-800 border-gray-700" />
      </ReactFlow>
      
      <InfoPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
      
      {/* Title */}
      <div className="absolute top-4 left-4 text-white">
        <h1 className="text-2xl font-bold">🧠 AI Mindmap</h1>
        <p className="text-gray-400 text-sm">Кликни на узел для описания</p>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-gray-900/80 rounded-lg p-3 text-xs">
        <div className="flex gap-3">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-indigo-500"></span> Корень
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-violet-500"></span> Ветка
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-cyan-500"></span> Концепция
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-emerald-500"></span> Техника
          </span>
        </div>
      </div>
    </div>
  );
}
