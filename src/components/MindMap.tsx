'use client';

import { useCallback, useState, useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import CustomNode from './CustomNode';
import InfoPanel from './InfoPanel';
import LanguageToggle from './LanguageToggle';
import { initialNodes, initialEdges, AINode, Language, levelColors, levelLabels } from '@/data/nodes';

const nodeTypes = { custom: CustomNode };

const defaultEdgeOptions = {
  type: 'smoothstep',
  style: { stroke: '#6366f1', strokeWidth: 2 },
};

export default function MindMap() {
  const [lang, setLang] = useState<Language>('ru');
  const [selectedNode, setSelectedNode] = useState<AINode | null>(null);
  
  // Add lang to each node's data for rendering
  const nodesWithLang = useMemo(() => 
    initialNodes.map(node => ({
      ...node,
      data: { ...node.data, lang }
    })),
    [lang]
  );
  
  const [nodes, setNodes, onNodesChange] = useNodesState(nodesWithLang);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes when language changes
  useMemo(() => {
    setNodes(nodesWithLang);
  }, [nodesWithLang, setNodes]);

  const onNodeClick = useCallback((_: React.MouseEvent, node: AINode) => {
    setSelectedNode(node);
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
        minZoom={0.3}
        maxZoom={2}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#374151" />
        <Controls className="bg-gray-800 border-gray-700" />
      </ReactFlow>
      
      <InfoPanel node={selectedNode} lang={lang} onClose={() => setSelectedNode(null)} />
      
      {/* Header */}
      <div className="absolute top-4 left-4 flex items-start gap-4">
        <div className="text-white">
          <h1 className="text-2xl font-bold">🧠 AI Mindmap</h1>
          <p className="text-gray-400 text-sm">
            {lang === 'ru' ? 'Кликни на узел для описания' : 'Click a node for details'}
          </p>
        </div>
        <LanguageToggle lang={lang} onChange={setLang} />
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-gray-900/90 rounded-lg p-3 text-xs backdrop-blur">
        <div className="text-gray-400 mb-2 uppercase tracking-wide">
          {lang === 'ru' ? 'Уровень абстракции' : 'Abstraction Level'}
        </div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(levelColors) as Array<keyof typeof levelColors>).map((level) => (
            <span key={level} className="flex items-center gap-1.5 text-gray-300">
              <span 
                className="w-3 h-3 rounded"
                style={{ backgroundColor: levelColors[level] }}
              />
              {levelLabels[lang][level]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
