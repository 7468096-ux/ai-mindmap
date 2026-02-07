'use client';

import { AINode, Language, levelLabels } from '@/data/nodes';
import { getPathById } from '@/data/learningPaths';

interface Props {
  selectedNode: AINode | null;
  activePath: string | null;
  lang: Language;
  onNodeClick: (nodeId: string) => void;
}

// Simple parent mapping for key nodes
const parentMap: Record<string, string> = {
  // ML branch
  'ml': 'ai',
  'supervised': 'ml',
  'unsupervised': 'ml',
  'rl': 'ml',
  'linear-reg': 'supervised',
  'logreg': 'supervised',
  'decision-tree': 'supervised',
  'random-forest': 'supervised',
  'svm': 'supervised',
  'xgboost': 'supervised',
  'kmeans': 'unsupervised',
  'pca': 'unsupervised',
  'qlearning': 'rl',
  
  // DL branch
  'dl': 'ai',
  'nn': 'dl',
  'cnn': 'dl',
  'rnn': 'dl',
  'lstm': 'rnn',
  'transformer': 'dl',
  'attention': 'transformer',
  'gan': 'dl',
  'vae': 'dl',
  'diffusion': 'dl',
  'autoencoder': 'dl',
  'dropout': 'nn',
  'batchnorm': 'nn',
  'resnet': 'cnn',
  'vit': 'transformer',
  
  // NLP branch
  'nlp': 'ai',
  'tokenization': 'nlp',
  'embeddings': 'nlp',
  'word2vec': 'embeddings',
  'llm': 'nlp',
  'gpt': 'llm',
  'bert': 'llm',
  'prompt-eng': 'llm',
  'rag': 'llm',
  'llm-agents': 'llm',
  
  // CV branch
  'cv': 'ai',
  'img-classification': 'cv',
  'obj-detection': 'cv',
  'segmentation': 'cv',
  'yolo': 'obj-detection',
  'unet': 'segmentation',
  'clip': 'cv',
  'stable-diffusion': 'diffusion',
};

// Node labels for breadcrumbs
const nodeLabels: Record<string, { en: string; ru: string }> = {
  'ai': { en: 'AI', ru: 'ИИ' },
  'ml': { en: 'ML', ru: 'ML' },
  'dl': { en: 'Deep Learning', ru: 'Deep Learning' },
  'nlp': { en: 'NLP', ru: 'NLP' },
  'cv': { en: 'Computer Vision', ru: 'Комп. зрение' },
  'supervised': { en: 'Supervised', ru: 'С учителем' },
  'unsupervised': { en: 'Unsupervised', ru: 'Без учителя' },
  'rl': { en: 'RL', ru: 'RL' },
  'nn': { en: 'Neural Net', ru: 'Нейросеть' },
  'cnn': { en: 'CNN', ru: 'CNN' },
  'rnn': { en: 'RNN', ru: 'RNN' },
  'transformer': { en: 'Transformer', ru: 'Transformer' },
  'llm': { en: 'LLM', ru: 'LLM' },
};

function getPath(nodeId: string): string[] {
  const path: string[] = [nodeId];
  let current = nodeId;
  
  while (parentMap[current]) {
    current = parentMap[current];
    path.unshift(current);
  }
  
  return path;
}

export default function Breadcrumbs({ selectedNode, activePath, lang, onNodeClick }: Props) {
  if (!selectedNode) return null;
  
  const path = getPath(selectedNode.id);
  const activePathData = activePath ? getPathById(activePath) : null;
  
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-gray-900/90 backdrop-blur px-4 py-2 rounded-full flex items-center gap-2 text-sm shadow-lg border border-gray-700">
        {/* Learning path indicator */}
        {activePathData && (
          <>
            <span className="text-purple-400">
              {activePathData.emoji} {activePathData.title[lang]}
            </span>
            <span className="text-gray-600">|</span>
          </>
        )}
        
        {/* Breadcrumb path */}
        {path.map((nodeId, index) => {
          const label = nodeLabels[nodeId]?.[lang] || nodeId;
          const isLast = index === path.length - 1;
          
          return (
            <span key={nodeId} className="flex items-center gap-2">
              <button
                onClick={() => onNodeClick(nodeId)}
                className={`transition-colors ${
                  isLast 
                    ? 'text-white font-medium' 
                    : 'text-gray-400 hover:text-purple-400'
                }`}
              >
                {label}
              </button>
              {!isLast && <span className="text-gray-600">›</span>}
            </span>
          );
        })}
      </div>
    </div>
  );
}
