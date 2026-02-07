// Comparison Tables for algorithms

export interface ComparisonRow {
  criterion: { en: string; ru: string };
  values: Record<string, { text: string; score: 'good' | 'medium' | 'bad' }>;
}

export interface Comparison {
  id: string;
  title: { en: string; ru: string };
  algorithms: string[]; // node IDs
  algorithmLabels: Record<string, string>;
  rows: ComparisonRow[];
}

export const comparisons: Comparison[] = [
  {
    id: 'classification-basic',
    title: {
      en: 'Classification Algorithms',
      ru: 'Алгоритмы классификации',
    },
    algorithms: ['logreg', 'decision-tree', 'random-forest', 'svm'],
    algorithmLabels: {
      'logreg': 'Logistic Reg',
      'decision-tree': 'Decision Tree',
      'random-forest': 'Random Forest',
      'svm': 'SVM',
    },
    rows: [
      {
        criterion: { en: 'Small data (<1K)', ru: 'Мало данных (<1K)' },
        values: {
          'logreg': { text: '✓', score: 'good' },
          'decision-tree': { text: '✓', score: 'good' },
          'random-forest': { text: '~', score: 'medium' },
          'svm': { text: '✓✓', score: 'good' },
        },
      },
      {
        criterion: { en: 'Large data (>100K)', ru: 'Много данных (>100K)' },
        values: {
          'logreg': { text: '✓', score: 'good' },
          'decision-tree': { text: '✓', score: 'good' },
          'random-forest': { text: '✓✓', score: 'good' },
          'svm': { text: '✗', score: 'bad' },
        },
      },
      {
        criterion: { en: 'Training speed', ru: 'Скорость обучения' },
        values: {
          'logreg': { text: 'Fast', score: 'good' },
          'decision-tree': { text: 'Fast', score: 'good' },
          'random-forest': { text: 'Medium', score: 'medium' },
          'svm': { text: 'Slow', score: 'bad' },
        },
      },
      {
        criterion: { en: 'Interpretability', ru: 'Интерпретируемость' },
        values: {
          'logreg': { text: 'High', score: 'good' },
          'decision-tree': { text: 'High', score: 'good' },
          'random-forest': { text: 'Medium', score: 'medium' },
          'svm': { text: 'Low', score: 'bad' },
        },
      },
      {
        criterion: { en: 'Overfitting risk', ru: 'Риск переобучения' },
        values: {
          'logreg': { text: 'Low', score: 'good' },
          'decision-tree': { text: 'High', score: 'bad' },
          'random-forest': { text: 'Low', score: 'good' },
          'svm': { text: 'Medium', score: 'medium' },
        },
      },
      {
        criterion: { en: 'Nonlinear patterns', ru: 'Нелинейные паттерны' },
        values: {
          'logreg': { text: '✗', score: 'bad' },
          'decision-tree': { text: '✓', score: 'good' },
          'random-forest': { text: '✓✓', score: 'good' },
          'svm': { text: '✓ (kernel)', score: 'good' },
        },
      },
    ],
  },
  {
    id: 'sequence-models',
    title: {
      en: 'Sequence Models',
      ru: 'Модели для последовательностей',
    },
    algorithms: ['rnn', 'lstm', 'transformer'],
    algorithmLabels: {
      'rnn': 'RNN',
      'lstm': 'LSTM',
      'transformer': 'Transformer',
    },
    rows: [
      {
        criterion: { en: 'Long sequences', ru: 'Длинные последовательности' },
        values: {
          'rnn': { text: '✗', score: 'bad' },
          'lstm': { text: '✓', score: 'good' },
          'transformer': { text: '✓✓', score: 'good' },
        },
      },
      {
        criterion: { en: 'Parallelization', ru: 'Параллелизация' },
        values: {
          'rnn': { text: '✗', score: 'bad' },
          'lstm': { text: '✗', score: 'bad' },
          'transformer': { text: '✓✓', score: 'good' },
        },
      },
      {
        criterion: { en: 'Training speed', ru: 'Скорость обучения' },
        values: {
          'rnn': { text: 'Slow', score: 'bad' },
          'lstm': { text: 'Slow', score: 'bad' },
          'transformer': { text: 'Fast (GPU)', score: 'good' },
        },
      },
      {
        criterion: { en: 'Memory usage', ru: 'Память' },
        values: {
          'rnn': { text: 'Low', score: 'good' },
          'lstm': { text: 'Medium', score: 'medium' },
          'transformer': { text: 'High (O(n²))', score: 'bad' },
        },
      },
      {
        criterion: { en: 'Vanishing gradient', ru: 'Затухание градиента' },
        values: {
          'rnn': { text: 'Problem', score: 'bad' },
          'lstm': { text: 'Solved', score: 'good' },
          'transformer': { text: 'Solved', score: 'good' },
        },
      },
    ],
  },
  {
    id: 'generative-models',
    title: {
      en: 'Generative Models',
      ru: 'Генеративные модели',
    },
    algorithms: ['gan', 'vae', 'diffusion'],
    algorithmLabels: {
      'gan': 'GAN',
      'vae': 'VAE',
      'diffusion': 'Diffusion',
    },
    rows: [
      {
        criterion: { en: 'Image quality', ru: 'Качество изображений' },
        values: {
          'gan': { text: 'High', score: 'good' },
          'vae': { text: 'Medium', score: 'medium' },
          'diffusion': { text: 'Highest', score: 'good' },
        },
      },
      {
        criterion: { en: 'Training stability', ru: 'Стабильность обучения' },
        values: {
          'gan': { text: 'Unstable', score: 'bad' },
          'vae': { text: 'Stable', score: 'good' },
          'diffusion': { text: 'Stable', score: 'good' },
        },
      },
      {
        criterion: { en: 'Mode collapse', ru: 'Mode collapse' },
        values: {
          'gan': { text: 'Risk', score: 'bad' },
          'vae': { text: 'No', score: 'good' },
          'diffusion': { text: 'No', score: 'good' },
        },
      },
      {
        criterion: { en: 'Latent space', ru: 'Латентное пространство' },
        values: {
          'gan': { text: 'Unstructured', score: 'medium' },
          'vae': { text: 'Smooth', score: 'good' },
          'diffusion': { text: 'N/A', score: 'medium' },
        },
      },
      {
        criterion: { en: 'Generation speed', ru: 'Скорость генерации' },
        values: {
          'gan': { text: 'Fast', score: 'good' },
          'vae': { text: 'Fast', score: 'good' },
          'diffusion': { text: 'Slow', score: 'bad' },
        },
      },
    ],
  },
  {
    id: 'vision-models',
    title: {
      en: 'Vision Architectures',
      ru: 'Архитектуры для зрения',
    },
    algorithms: ['cnn', 'resnet', 'vit'],
    algorithmLabels: {
      'cnn': 'CNN',
      'resnet': 'ResNet',
      'vit': 'ViT',
    },
    rows: [
      {
        criterion: { en: 'Small dataset', ru: 'Малый датасет' },
        values: {
          'cnn': { text: '✓', score: 'good' },
          'resnet': { text: '✓', score: 'good' },
          'vit': { text: '✗', score: 'bad' },
        },
      },
      {
        criterion: { en: 'Large dataset', ru: 'Большой датасет' },
        values: {
          'cnn': { text: '✓', score: 'good' },
          'resnet': { text: '✓✓', score: 'good' },
          'vit': { text: '✓✓', score: 'good' },
        },
      },
      {
        criterion: { en: 'Global context', ru: 'Глобальный контекст' },
        values: {
          'cnn': { text: 'Limited', score: 'medium' },
          'resnet': { text: 'Limited', score: 'medium' },
          'vit': { text: 'Full', score: 'good' },
        },
      },
      {
        criterion: { en: 'Inductive bias', ru: 'Inductive bias' },
        values: {
          'cnn': { text: 'Strong', score: 'good' },
          'resnet': { text: 'Strong', score: 'good' },
          'vit': { text: 'Weak', score: 'medium' },
        },
      },
      {
        criterion: { en: 'Compute cost', ru: 'Вычисления' },
        values: {
          'cnn': { text: 'Low', score: 'good' },
          'resnet': { text: 'Medium', score: 'medium' },
          'vit': { text: 'High', score: 'bad' },
        },
      },
    ],
  },
];

// Get comparisons that include a specific node
export function getComparisonsForNode(nodeId: string): Comparison[] {
  return comparisons.filter(c => c.algorithms.includes(nodeId));
}
