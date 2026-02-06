import { Node, Edge } from '@xyflow/react';

export interface AINode extends Node {
  data: {
    label: string;
    emoji?: string;
    description: string;
    category: 'root' | 'branch' | 'concept' | 'technique';
  };
}

// Цвета по категориям
export const categoryColors = {
  root: '#6366f1',      // indigo
  branch: '#8b5cf6',    // violet  
  concept: '#06b6d4',   // cyan
  technique: '#10b981', // emerald
};

// Позиции узлов (расположение на карте)
export const initialNodes: AINode[] = [
  // ROOT
  {
    id: 'ai',
    position: { x: 400, y: 0 },
    data: {
      label: 'Artificial Intelligence',
      emoji: '🤖',
      description: 'Искусственный интеллект — область компьютерных наук, занимающаяся созданием систем, способных выполнять задачи, обычно требующие человеческого интеллекта: обучение, рассуждение, восприятие, понимание языка.',
      category: 'root',
    },
    type: 'custom',
  },
  
  // MAIN BRANCHES
  {
    id: 'ml',
    position: { x: 100, y: 150 },
    data: {
      label: 'Machine Learning',
      emoji: '🧠',
      description: 'Машинное обучение — подраздел AI, где системы учатся на данных без явного программирования. Алгоритмы находят паттерны и делают предсказания.',
      category: 'branch',
    },
    type: 'custom',
  },
  {
    id: 'dl',
    position: { x: 400, y: 150 },
    data: {
      label: 'Deep Learning',
      emoji: '🧬',
      description: 'Глубокое обучение — подвид ML использующий нейронные сети с множеством слоёв. Автоматически извлекает признаки из сырых данных (изображений, текста, звука).',
      category: 'branch',
    },
    type: 'custom',
  },
  {
    id: 'nlp',
    position: { x: 700, y: 150 },
    data: {
      label: 'NLP',
      emoji: '💬',
      description: 'Natural Language Processing — обработка естественного языка. Позволяет компьютерам понимать, интерпретировать и генерировать человеческий язык.',
      category: 'branch',
    },
    type: 'custom',
  },
  
  // ML CHILDREN
  {
    id: 'supervised',
    position: { x: -100, y: 300 },
    data: {
      label: 'Supervised Learning',
      emoji: '📊',
      description: 'Обучение с учителем. Модель учится на размеченных данных (пары вход→выход). Примеры: классификация спама, предсказание цен.',
      category: 'concept',
    },
    type: 'custom',
  },
  {
    id: 'unsupervised',
    position: { x: 100, y: 300 },
    data: {
      label: 'Unsupervised Learning',
      emoji: '🔍',
      description: 'Обучение без учителя. Модель находит скрытые паттерны в неразмеченных данных. Примеры: кластеризация клиентов, сжатие данных.',
      category: 'concept',
    },
    type: 'custom',
  },
  {
    id: 'rl',
    position: { x: 300, y: 300 },
    data: {
      label: 'Reinforcement Learning',
      emoji: '🎮',
      description: 'Обучение с подкреплением. Агент учится через взаимодействие со средой, получая награды/штрафы. Используется в играх, робототехнике.',
      category: 'concept',
    },
    type: 'custom',
  },
  
  // DL CHILDREN
  {
    id: 'nn',
    position: { x: 350, y: 300 },
    data: {
      label: 'Neural Networks',
      emoji: '🔮',
      description: 'Нейронные сети — вычислительные системы, вдохновлённые биологическим мозгом. Состоят из слоёв искусственных нейронов, передающих сигналы.',
      category: 'concept',
    },
    type: 'custom',
  },
  {
    id: 'cnn',
    position: { x: 450, y: 300 },
    data: {
      label: 'CNN',
      emoji: '👁️',
      description: 'Convolutional Neural Networks — свёрточные сети. Специализированы для обработки изображений. Находят паттерны через фильтры.',
      category: 'technique',
    },
    type: 'custom',
  },
  {
    id: 'transformer',
    position: { x: 550, y: 300 },
    data: {
      label: 'Transformer',
      emoji: '⚡',
      description: 'Архитектура на механизме внимания (attention). Основа современных LLM: GPT, BERT, Claude. Обрабатывает последовательности параллельно.',
      category: 'technique',
    },
    type: 'custom',
  },
  
  // NLP CHILDREN
  {
    id: 'llm',
    position: { x: 650, y: 300 },
    data: {
      label: 'LLM',
      emoji: '🗣️',
      description: 'Large Language Models — большие языковые модели (GPT-4, Claude, Gemini). Обучены на огромных текстовых корпусах, генерируют человекоподобный текст.',
      category: 'technique',
    },
    type: 'custom',
  },
  {
    id: 'embeddings',
    position: { x: 750, y: 300 },
    data: {
      label: 'Embeddings',
      emoji: '📐',
      description: 'Векторные представления слов/текстов в многомерном пространстве. Похожие понятия близки друг к другу. Основа семантического поиска.',
      category: 'technique',
    },
    type: 'custom',
  },
  {
    id: 'tokenization',
    position: { x: 850, y: 300 },
    data: {
      label: 'Tokenization',
      emoji: '✂️',
      description: 'Разбиение текста на токены (слова, подслова, символы). Первый шаг обработки текста в NLP моделях.',
      category: 'technique',
    },
    type: 'custom',
  },
];

// Связи между узлами
export const initialEdges: Edge[] = [
  // AI → Branches
  { id: 'ai-ml', source: 'ai', target: 'ml', animated: true },
  { id: 'ai-dl', source: 'ai', target: 'dl', animated: true },
  { id: 'ai-nlp', source: 'ai', target: 'nlp', animated: true },
  
  // ML → Children
  { id: 'ml-sup', source: 'ml', target: 'supervised' },
  { id: 'ml-unsup', source: 'ml', target: 'unsupervised' },
  { id: 'ml-rl', source: 'ml', target: 'rl' },
  
  // DL → Children
  { id: 'dl-nn', source: 'dl', target: 'nn' },
  { id: 'dl-cnn', source: 'dl', target: 'cnn' },
  { id: 'dl-trans', source: 'dl', target: 'transformer' },
  
  // NLP → Children
  { id: 'nlp-llm', source: 'nlp', target: 'llm' },
  { id: 'nlp-emb', source: 'nlp', target: 'embeddings' },
  { id: 'nlp-tok', source: 'nlp', target: 'tokenization' },
  
  // Cross-connections
  { id: 'trans-llm', source: 'transformer', target: 'llm', style: { strokeDasharray: '5,5' } },
  { id: 'nn-cnn', source: 'nn', target: 'cnn', style: { strokeDasharray: '5,5' } },
];
