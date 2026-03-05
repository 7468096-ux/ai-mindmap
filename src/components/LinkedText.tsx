'use client';

import { useMemo } from 'react';
import { initialNodes } from '@/data/nodes';

// Build term → nodeId mapping (both EN and RU labels + common aliases)
function buildTermMap(): Map<string, string> {
  const map = new Map<string, string>();
  
  initialNodes.forEach(node => {
    const id = node.id;
    const enLabel = node.data.en.label;
    const ruLabel = node.data.ru.label;
    
    // Add exact labels
    map.set(enLabel.toLowerCase(), id);
    map.set(ruLabel.toLowerCase(), id);
    
    // Add common abbreviations/aliases
    const enLower = enLabel.toLowerCase();
    
    // For multi-word terms, also match them
    if (enLabel.includes('(') && enLabel.includes(')')) {
      // Extract abbreviation from parentheses: "Convolutional Neural Network (CNN)" -> "CNN"
      const abbr = enLabel.match(/\(([^)]+)\)/)?.[1];
      if (abbr) map.set(abbr.toLowerCase(), id);
    }
  });

  // Manual aliases for terms commonly found in descriptions
  const aliases: Record<string, string> = {
    // Core concepts
    'machine learning': 'ml',
    'deep learning': 'dl',
    'artificial intelligence': 'ai',
    'natural language processing': 'nlp',
    'computer vision': 'cv',
    'reinforcement learning': 'rl',
    
    // Architectures
    'neural network': 'nn',
    'neural networks': 'nn',
    'нейросеть': 'nn',
    'нейросети': 'nn',
    'нейронные сети': 'nn',
    'нейронная сеть': 'nn',
    'cnn': 'cnn',
    'rnn': 'rnn',
    'lstm': 'lstm',
    'transformer': 'transformer',
    'transformers': 'transformer',
    'трансформер': 'transformer',
    'трансформеры': 'transformer',
    'gan': 'gan',
    'gans': 'gan',
    'vae': 'vae',
    'resnet': 'resnet',
    'vit': 'vit',
    'bert': 'bert',
    'gpt': 'gpt',
    'clip': 'clip',
    'yolo': 'yolo',
    'u-net': 'unet',
    'llm': 'llm',
    'llms': 'llm',
    
    // Methods & concepts
    'attention': 'attention',
    'self-attention': 'attention',
    'attention mechanism': 'attention',
    'механизм внимания': 'attention',
    'backpropagation': 'nn',
    'backprop': 'nn',
    'gradient descent': 'nn',
    'градиентный спуск': 'nn',
    'supervised learning': 'supervised',
    'unsupervised learning': 'unsupervised',
    'обучение с учителем': 'supervised',
    'обучение без учителя': 'unsupervised',
    'обучение с подкреплением': 'rl',
    
    // Algorithms
    'linear regression': 'linear-reg',
    'logistic regression': 'logreg',
    'линейная регрессия': 'linear-reg',
    'логистическая регрессия': 'logreg',
    'decision tree': 'decision-tree',
    'decision trees': 'decision-tree',
    'дерево решений': 'decision-tree',
    'random forest': 'random-forest',
    'svm': 'svm',
    'k-means': 'kmeans',
    'pca': 'pca',
    'xgboost': 'xgboost',
    'q-learning': 'qlearning',
    
    // Techniques
    'dropout': 'dropout',
    'batch normalization': 'batchnorm',
    'batchnorm': 'batchnorm',
    'batch norm': 'batchnorm',
    'adam': 'adam',
    'optimizer': 'adam',
    'embeddings': 'embeddings',
    'embedding': 'embeddings',
    'эмбеддинги': 'embeddings',
    'tokenization': 'tokenization',
    'токенизация': 'tokenization',
    'fine-tuning': 'finetuning',
    'fine tuning': 'finetuning',
    'prompt engineering': 'prompt-eng',
    'rag': 'rag',
    
    // Models & implementations
    'stable diffusion': 'stable-diffusion',
    'diffusion models': 'diffusion',
    'diffusion model': 'diffusion',
    'диффузионные модели': 'diffusion',
    'word2vec': 'word2vec',
    'autoencoder': 'autoencoder',
    'автоэнкодер': 'autoencoder',
    
    // Task types
    'classification': 'img-classification',
    'классификация': 'img-classification',
    'object detection': 'obj-detection',
    'детекция объектов': 'obj-detection',
    'segmentation': 'segmentation',
    'сегментация': 'segmentation',
    
    // Common terms in descriptions
    'convolutional': 'cnn',
    'convolution': 'cnn',
    'свёрточная': 'cnn',
    'свёрточные': 'cnn',
    'recurrent': 'rnn',
    'рекуррентная': 'rnn',
    'рекуррентные': 'rnn',
    'generative adversarial': 'gan',
    'chain-of-thought': 'cot',
    'chain of thought': 'cot',
    'agents': 'agents',
    'агенты': 'agents',
    'mixture of experts': 'moe',
    'moe': 'moe',
    
    // Skip connections
    'skip connections': 'resnet',
    'skip connection': 'resnet',
    'residual': 'resnet',
  };
  
  Object.entries(aliases).forEach(([term, nodeId]) => {
    map.set(term.toLowerCase(), nodeId);
  });
  
  return map;
}

// Singleton
let _termMap: Map<string, string> | null = null;
function getTermMap(): Map<string, string> {
  if (!_termMap) _termMap = buildTermMap();
  return _termMap;
}

// Sort terms by length (longest first) to match multi-word terms before single words
function getSortedTerms(): string[] {
  const map = getTermMap();
  return Array.from(map.keys()).sort((a, b) => b.length - a.length);
}

interface Props {
  text: string;
  onTermClick: (nodeId: string) => void;
  className?: string;
  currentNodeId?: string; // Don't link to self
}

export default function LinkedText({ text, onTermClick, className = '', currentNodeId }: Props) {
  const segments = useMemo(() => {
    const termMap = getTermMap();
    const sortedTerms = getSortedTerms();
    
    // Build regex from all terms (escape special chars)
    const escaped = sortedTerms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    if (escaped.length === 0) return [{ text, isLink: false as const }];
    
    // Match whole words only (with word boundaries)
    const regex = new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi');
    
    const result: { text: string; isLink: boolean; nodeId?: string }[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    const seen = new Set<string>(); // Only link first occurrence of each nodeId
    
    while ((match = regex.exec(text)) !== null) {
      const matchedText = match[0];
      const nodeId = termMap.get(matchedText.toLowerCase());
      
      if (!nodeId || nodeId === currentNodeId || seen.has(nodeId)) {
        continue;
      }
      
      // Add text before match
      if (match.index > lastIndex) {
        result.push({ text: text.slice(lastIndex, match.index), isLink: false });
      }
      
      result.push({ text: matchedText, isLink: true, nodeId });
      seen.add(nodeId);
      lastIndex = match.index + matchedText.length;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      result.push({ text: text.slice(lastIndex), isLink: false });
    }
    
    return result.length > 0 ? result : [{ text, isLink: false as const }];
  }, [text, currentNodeId]);

  return (
    <span className={className}>
      {segments.map((seg, i) =>
        seg.isLink && seg.nodeId ? (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); onTermClick(seg.nodeId!); }}
            className="text-purple-400 hover:text-purple-300 underline decoration-purple-400/30 hover:decoration-purple-300/60 underline-offset-2 transition-colors cursor-pointer font-medium"
            title={`→ ${seg.text}`}
          >
            {seg.text}
          </button>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </span>
  );
}
