// Learning Paths - Recommended study sequences

export interface LearningPath {
  id: string;
  emoji: string;
  title: {
    en: string;
    ru: string;
  };
  description: {
    en: string;
    ru: string;
  };
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string; // e.g., "2-3 hours"
  nodeIds: string[]; // Ordered list of node IDs to study
}

export const learningPaths: LearningPath[] = [
  {
    id: 'ml-basics',
    emoji: '🎓',
    title: {
      en: 'ML Fundamentals',
      ru: 'Основы ML',
    },
    description: {
      en: 'Start here! Learn the core concepts of Machine Learning from scratch.',
      ru: 'Начни здесь! Изучи базовые концепции машинного обучения с нуля.',
    },
    difficulty: 'beginner',
    estimatedTime: '2-3 hours',
    nodeIds: [
      'ai',
      'ml',
      'supervised',
      'linear-reg',
      'logreg',
      'decision-tree',
      'random-forest',
      'unsupervised',
      'kmeans',
      'pca',
    ],
  },
  {
    id: 'deep-learning',
    emoji: '🧠',
    title: {
      en: 'Deep Learning Journey',
      ru: 'Путь в Deep Learning',
    },
    description: {
      en: 'Dive into neural networks: from perceptrons to transformers.',
      ru: 'Погрузись в нейросети: от перцептронов до трансформеров.',
    },
    difficulty: 'intermediate',
    estimatedTime: '3-4 hours',
    nodeIds: [
      'dl',
      'nn',
      'cnn',
      'rnn',
      'lstm',
      'attention',
      'transformer',
      'dropout',
      'batchnorm',
    ],
  },
  {
    id: 'modern-ai',
    emoji: '🚀',
    title: {
      en: 'Modern AI (LLMs & Beyond)',
      ru: 'Современный AI (LLM и далее)',
    },
    description: {
      en: 'Understand ChatGPT, Claude, and the AI revolution of 2023+.',
      ru: 'Пойми ChatGPT, Claude и AI-революцию 2023+.',
    },
    difficulty: 'intermediate',
    estimatedTime: '2-3 hours',
    nodeIds: [
      'transformer',
      'nlp',
      'tokenization',
      'embeddings',
      'llm',
      'gpt',
      'bert',
      'prompt-eng',
      'rag',
      'llm-agents',
    ],
  },
  {
    id: 'computer-vision',
    emoji: '👁️',
    title: {
      en: 'Computer Vision',
      ru: 'Компьютерное зрение',
    },
    description: {
      en: 'Learn how AI sees: from image classification to object detection.',
      ru: 'Узнай как AI видит: от классификации до детекции объектов.',
    },
    difficulty: 'intermediate',
    estimatedTime: '2-3 hours',
    nodeIds: [
      'cv',
      'cnn',
      'img-classification',
      'obj-detection',
      'segmentation',
      'resnet',
      'vit',
      'yolo',
      'clip',
    ],
  },
  {
    id: 'generative-ai',
    emoji: '🎨',
    title: {
      en: 'Generative AI',
      ru: 'Генеративный AI',
    },
    description: {
      en: 'Create with AI: images, text, and beyond. GAN, VAE, Diffusion.',
      ru: 'Создавай с AI: изображения, текст и не только. GAN, VAE, Diffusion.',
    },
    difficulty: 'advanced',
    estimatedTime: '3-4 hours',
    nodeIds: [
      'autoencoder',
      'vae',
      'gan',
      'diffusion',
      'stable-diffusion',
      'clip',
      'llm',
      'gpt',
    ],
  },
  {
    id: 'reinforcement-learning',
    emoji: '🎮',
    title: {
      en: 'Reinforcement Learning',
      ru: 'Обучение с подкреплением',
    },
    description: {
      en: 'Train agents to play games and make decisions.',
      ru: 'Обучай агентов играть в игры и принимать решения.',
    },
    difficulty: 'advanced',
    estimatedTime: '2-3 hours',
    nodeIds: [
      'rl',
      'qlearning',
      'llm-agents',
    ],
  },
];

// Get path by ID
export function getPathById(id: string): LearningPath | undefined {
  return learningPaths.find(p => p.id === id);
}

// Check if node is in any path
export function getPathsForNode(nodeId: string): LearningPath[] {
  return learningPaths.filter(p => p.nodeIds.includes(nodeId));
}

// Get next node in path
export function getNextInPath(pathId: string, currentNodeId: string): string | null {
  const path = getPathById(pathId);
  if (!path) return null;
  
  const currentIndex = path.nodeIds.indexOf(currentNodeId);
  if (currentIndex === -1 || currentIndex >= path.nodeIds.length - 1) return null;
  
  return path.nodeIds[currentIndex + 1];
}

// Get progress in path
export function getPathProgress(pathId: string, completedNodes: string[]): number {
  const path = getPathById(pathId);
  if (!path) return 0;
  
  const completed = path.nodeIds.filter(id => completedNodes.includes(id)).length;
  return Math.round((completed / path.nodeIds.length) * 100);
}
