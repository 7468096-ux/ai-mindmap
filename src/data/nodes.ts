import { Edge } from '@xyflow/react';

export type AbstractionLevel = 'field' | 'theory' | 'method' | 'algorithm' | 'implementation';
export type Language = 'ru' | 'en';

export interface NodeContent {
  label: string;
  description: string;
  keyPoints: string[];
}

export interface AINodeData {
  emoji?: string;
  level: AbstractionLevel;
  ru: NodeContent;
  en: NodeContent;
  [key: string]: unknown;
}

export interface AINode {
  id: string;
  position: { x: number; y: number };
  type: string;
  data: AINodeData;
}

// Цвета по уровню абстракции
export const levelColors: Record<AbstractionLevel, string> = {
  field: '#6366f1',         // indigo
  theory: '#8b5cf6',        // violet
  method: '#06b6d4',        // cyan
  algorithm: '#10b981',     // emerald
  implementation: '#f59e0b', // amber
};

export const levelLabels: Record<Language, Record<AbstractionLevel, string>> = {
  ru: {
    field: 'Область',
    theory: 'Теория',
    method: 'Метод',
    algorithm: 'Алгоритм',
    implementation: 'Имплементация',
  },
  en: {
    field: 'Field',
    theory: 'Theory',
    method: 'Method',
    algorithm: 'Algorithm',
    implementation: 'Implementation',
  },
};

// ==================== NODES ====================

export const initialNodes: AINode[] = [
  // ========== FIELD ==========
  {
    id: 'ai',
    position: { x: 600, y: 0 },
    type: 'custom',
    data: {
      emoji: '🤖',
      level: 'field',
      ru: {
        label: 'Искусственный Интеллект',
        description: 'Область компьютерных наук, создающая системы, способные выполнять задачи, требующие человеческого интеллекта.',
        keyPoints: [
          '📅 Термин введён в 1956 году (Джон Маккарти)',
          '🎯 Цель: автоматизация когнитивных задач',
          '🔀 Включает: ML, робототехнику, NLP, CV',
          '⚡ Сейчас: эра генеративного AI (2022+)',
        ],
      },
      en: {
        label: 'Artificial Intelligence',
        description: 'Field of computer science creating systems capable of performing tasks that require human intelligence.',
        keyPoints: [
          '📅 Term coined in 1956 (John McCarthy)',
          '🎯 Goal: automate cognitive tasks',
          '🔀 Includes: ML, robotics, NLP, CV',
          '⚡ Now: generative AI era (2022+)',
        ],
      },
    },
  },

  // ========== THEORY ==========
  {
    id: 'ml',
    position: { x: 200, y: 120 },
    type: 'custom',
    data: {
      emoji: '🧠',
      level: 'theory',
      ru: {
        label: 'Машинное Обучение',
        description: 'Парадигма, где системы учатся на данных без явного программирования каждого правила.',
        keyPoints: [
          '📊 Данные → Паттерны → Предсказания',
          '🔄 Обучение через итеративную оптимизацию',
          '📈 Качество растёт с количеством данных',
          '🎓 Три типа: supervised, unsupervised, RL',
        ],
      },
      en: {
        label: 'Machine Learning',
        description: 'Paradigm where systems learn from data without explicit programming of every rule.',
        keyPoints: [
          '📊 Data → Patterns → Predictions',
          '🔄 Learning through iterative optimization',
          '📈 Quality improves with more data',
          '🎓 Three types: supervised, unsupervised, RL',
        ],
      },
    },
  },
  {
    id: 'dl',
    position: { x: 600, y: 120 },
    type: 'custom',
    data: {
      emoji: '🧬',
      level: 'theory',
      ru: {
        label: 'Глубокое Обучение',
        description: 'Подмножество ML с нейросетями из множества слоёв, автоматически извлекающими признаки.',
        keyPoints: [
          '🏗️ Многослойные нейронные сети (3+ слоёв)',
          '🔍 Автоматическое извлечение признаков',
          '💪 Требует много данных и GPU',
          '🚀 Прорыв: ImageNet 2012 (AlexNet)',
        ],
      },
      en: {
        label: 'Deep Learning',
        description: 'Subset of ML with multi-layer neural networks that automatically extract features.',
        keyPoints: [
          '🏗️ Multi-layer neural networks (3+ layers)',
          '🔍 Automatic feature extraction',
          '💪 Requires lots of data and GPUs',
          '🚀 Breakthrough: ImageNet 2012 (AlexNet)',
        ],
      },
    },
  },
  {
    id: 'nlp',
    position: { x: 1000, y: 120 },
    type: 'custom',
    data: {
      emoji: '💬',
      level: 'theory',
      ru: {
        label: 'Обработка Языка',
        description: 'Теория и методы для понимания, интерпретации и генерации человеческого языка.',
        keyPoints: [
          '📝 Текст как последовательность токенов',
          '🌐 Контекст определяет значение',
          '🔤 Этапы: токенизация → эмбеддинги → модель',
          '🗣️ Задачи: перевод, суммаризация, QA',
        ],
      },
      en: {
        label: 'Natural Language Processing',
        description: 'Theory and methods for understanding, interpreting, and generating human language.',
        keyPoints: [
          '📝 Text as sequence of tokens',
          '🌐 Context determines meaning',
          '🔤 Pipeline: tokenization → embeddings → model',
          '🗣️ Tasks: translation, summarization, QA',
        ],
      },
    },
  },

  // ========== METHOD (ML children) ==========
  {
    id: 'supervised',
    position: { x: 0, y: 260 },
    type: 'custom',
    data: {
      emoji: '📊',
      level: 'method',
      ru: {
        label: 'Обучение с учителем',
        description: 'Метод обучения на размеченных данных: модель учится соответствию вход→выход.',
        keyPoints: [
          '🏷️ Требует размеченные данные (labels)',
          '🎯 Цель: минимизировать ошибку предсказания',
          '📉 Loss function измеряет качество',
          '🔮 Типы: классификация, регрессия',
        ],
      },
      en: {
        label: 'Supervised Learning',
        description: 'Learning method using labeled data: model learns input→output mapping.',
        keyPoints: [
          '🏷️ Requires labeled data',
          '🎯 Goal: minimize prediction error',
          '📉 Loss function measures quality',
          '🔮 Types: classification, regression',
        ],
      },
    },
  },
  {
    id: 'unsupervised',
    position: { x: 200, y: 260 },
    type: 'custom',
    data: {
      emoji: '🔍',
      level: 'method',
      ru: {
        label: 'Обучение без учителя',
        description: 'Метод поиска скрытых паттернов в неразмеченных данных.',
        keyPoints: [
          '❌ Не требует разметки данных',
          '🔎 Находит скрытую структуру',
          '📊 Типы: кластеризация, снижение размерности',
          '💡 Применение: сегментация, аномалии',
        ],
      },
      en: {
        label: 'Unsupervised Learning',
        description: 'Method for finding hidden patterns in unlabeled data.',
        keyPoints: [
          '❌ No labeled data required',
          '🔎 Finds hidden structure',
          '📊 Types: clustering, dimensionality reduction',
          '💡 Uses: segmentation, anomaly detection',
        ],
      },
    },
  },
  {
    id: 'rl',
    position: { x: 400, y: 260 },
    type: 'custom',
    data: {
      emoji: '🎮',
      level: 'method',
      ru: {
        label: 'Обучение с подкреплением',
        description: 'Метод обучения агента через взаимодействие со средой и получение наград/штрафов.',
        keyPoints: [
          '🎯 Агент → Действие → Среда → Награда',
          '⚖️ Баланс: исследование vs использование',
          '🏆 Цель: максимизация суммарной награды',
          '🎲 Применение: игры, робототехника, торговля',
        ],
      },
      en: {
        label: 'Reinforcement Learning',
        description: 'Method where agent learns through interaction with environment and rewards/penalties.',
        keyPoints: [
          '🎯 Agent → Action → Environment → Reward',
          '⚖️ Balance: exploration vs exploitation',
          '🏆 Goal: maximize cumulative reward',
          '🎲 Uses: games, robotics, trading',
        ],
      },
    },
  },

  // ========== ALGORITHM (ML algorithms) ==========
  {
    id: 'linear-reg',
    position: { x: -100, y: 400 },
    type: 'custom',
    data: {
      emoji: '📈',
      level: 'algorithm',
      ru: {
        label: 'Линейная регрессия',
        description: 'Простейший алгоритм для предсказания непрерывных значений через линейную зависимость.',
        keyPoints: [
          '📐 Формула: y = wx + b',
          '🎯 Минимизация MSE (Mean Squared Error)',
          '⚡ Быстрый, интерпретируемый',
          '📊 Базовый алгоритм для регрессии',
        ],
      },
      en: {
        label: 'Linear Regression',
        description: 'Simplest algorithm for predicting continuous values through linear relationship.',
        keyPoints: [
          '📐 Formula: y = wx + b',
          '🎯 Minimizes MSE (Mean Squared Error)',
          '⚡ Fast, interpretable',
          '📊 Baseline algorithm for regression',
        ],
      },
    },
  },
  {
    id: 'decision-tree',
    position: { x: 80, y: 400 },
    type: 'custom',
    data: {
      emoji: '🌳',
      level: 'algorithm',
      ru: {
        label: 'Дерево решений',
        description: 'Алгоритм, разбивающий данные через последовательность условий (if-else).',
        keyPoints: [
          '🔀 Каждый узел = условие разбиения',
          '🍃 Листья = итоговое предсказание',
          '👁️ Легко визуализировать и понять',
          '⚠️ Склонен к переобучению',
        ],
      },
      en: {
        label: 'Decision Tree',
        description: 'Algorithm splitting data through sequence of conditions (if-else).',
        keyPoints: [
          '🔀 Each node = split condition',
          '🍃 Leaves = final prediction',
          '👁️ Easy to visualize and understand',
          '⚠️ Prone to overfitting',
        ],
      },
    },
  },
  {
    id: 'random-forest',
    position: { x: 260, y: 400 },
    type: 'custom',
    data: {
      emoji: '🌲',
      level: 'algorithm',
      ru: {
        label: 'Random Forest',
        description: 'Ансамбль деревьев решений, голосующих за итоговый результат.',
        keyPoints: [
          '🌳 Много деревьев (100-1000)',
          '🎲 Каждое на случайной выборке',
          '🗳️ Голосование/усреднение результатов',
          '💪 Устойчив к переобучению',
        ],
      },
      en: {
        label: 'Random Forest',
        description: 'Ensemble of decision trees voting for final result.',
        keyPoints: [
          '🌳 Many trees (100-1000)',
          '🎲 Each on random sample',
          '🗳️ Voting/averaging results',
          '💪 Robust to overfitting',
        ],
      },
    },
  },
  {
    id: 'svm',
    position: { x: -100, y: 520 },
    type: 'custom',
    data: {
      emoji: '⚔️',
      level: 'algorithm',
      ru: {
        label: 'SVM',
        description: 'Support Vector Machine — находит оптимальную гиперплоскость для разделения классов.',
        keyPoints: [
          '📏 Максимизирует отступ между классами',
          '🔮 Kernel trick для нелинейных границ',
          '💪 Работает в высоких размерностях',
          '📊 Хорош для небольших датасетов',
        ],
      },
      en: {
        label: 'SVM',
        description: 'Support Vector Machine — finds optimal hyperplane to separate classes.',
        keyPoints: [
          '📏 Maximizes margin between classes',
          '🔮 Kernel trick for nonlinear boundaries',
          '💪 Works in high dimensions',
          '📊 Good for small datasets',
        ],
      },
    },
  },
  {
    id: 'kmeans',
    position: { x: 80, y: 520 },
    type: 'custom',
    data: {
      emoji: '🎯',
      level: 'algorithm',
      ru: {
        label: 'K-Means',
        description: 'Алгоритм кластеризации, группирующий данные в K кластеров по близости к центроидам.',
        keyPoints: [
          '🔢 K — количество кластеров (задаётся)',
          '🔄 Итеративно: назначить → пересчитать центры',
          '📏 Минимизирует внутрикластерное расстояние',
          '⚡ Быстрый, но чувствителен к начальным точкам',
        ],
      },
      en: {
        label: 'K-Means',
        description: 'Clustering algorithm grouping data into K clusters by proximity to centroids.',
        keyPoints: [
          '🔢 K — number of clusters (specified)',
          '🔄 Iterative: assign → recalculate centers',
          '📏 Minimizes within-cluster distance',
          '⚡ Fast, but sensitive to initial points',
        ],
      },
    },
  },
  {
    id: 'pca',
    position: { x: 260, y: 520 },
    type: 'custom',
    data: {
      emoji: '📉',
      level: 'algorithm',
      ru: {
        label: 'PCA',
        description: 'Principal Component Analysis — снижение размерности с сохранением максимума информации.',
        keyPoints: [
          '📊 Находит главные направления вариации',
          '🔽 Проекция на меньшее пространство',
          '📈 Сохраняет % объяснённой дисперсии',
          '👁️ Используется для визуализации',
        ],
      },
      en: {
        label: 'PCA',
        description: 'Principal Component Analysis — dimensionality reduction preserving maximum information.',
        keyPoints: [
          '📊 Finds main directions of variation',
          '🔽 Projects to lower dimensions',
          '📈 Preserves % of explained variance',
          '👁️ Used for visualization',
        ],
      },
    },
  },
  {
    id: 'qlearning',
    position: { x: 440, y: 400 },
    type: 'custom',
    data: {
      emoji: '🎰',
      level: 'algorithm',
      ru: {
        label: 'Q-Learning',
        description: 'Алгоритм RL, обучающий функцию ценности действий без модели среды.',
        keyPoints: [
          '📊 Q(s,a) = ожидаемая награда',
          '🔄 Обновление через уравнение Беллмана',
          '🎲 ε-greedy для исследования',
          '🚫 Model-free: не знает правил среды',
        ],
      },
      en: {
        label: 'Q-Learning',
        description: 'RL algorithm learning action-value function without environment model.',
        keyPoints: [
          '📊 Q(s,a) = expected reward',
          '🔄 Updates via Bellman equation',
          '🎲 ε-greedy for exploration',
          '🚫 Model-free: no environment rules',
        ],
      },
    },
  },

  // ========== ALGORITHM (DL architectures) ==========
  {
    id: 'nn',
    position: { x: 520, y: 260 },
    type: 'custom',
    data: {
      emoji: '🔮',
      level: 'algorithm',
      ru: {
        label: 'Нейронные сети',
        description: 'Алгоритм из связанных искусственных нейронов, передающих и трансформирующих сигналы.',
        keyPoints: [
          '🧠 Вдохновлены биологическим мозгом',
          '⚡ Нейрон: взвешенная сумма + активация',
          '🔄 Обучение: backpropagation + gradient descent',
          '🏗️ Слои: input → hidden → output',
        ],
      },
      en: {
        label: 'Neural Networks',
        description: 'Algorithm of connected artificial neurons that transmit and transform signals.',
        keyPoints: [
          '🧠 Inspired by biological brain',
          '⚡ Neuron: weighted sum + activation',
          '🔄 Training: backpropagation + gradient descent',
          '🏗️ Layers: input → hidden → output',
        ],
      },
    },
  },
  {
    id: 'cnn',
    position: { x: 680, y: 260 },
    type: 'custom',
    data: {
      emoji: '👁️',
      level: 'algorithm',
      ru: {
        label: 'CNN',
        description: 'Свёрточные сети — алгоритм для обработки данных с сеточной структурой (изображения).',
        keyPoints: [
          '🔲 Свёртка: скользящий фильтр по изображению',
          '📐 Pooling: уменьшение размерности',
          '🎨 Иерархия: края → формы → объекты',
          '📸 Применение: распознавание, детекция',
        ],
      },
      en: {
        label: 'CNN',
        description: 'Convolutional networks — algorithm for processing grid-structured data (images).',
        keyPoints: [
          '🔲 Convolution: sliding filter over image',
          '📐 Pooling: dimensionality reduction',
          '🎨 Hierarchy: edges → shapes → objects',
          '📸 Uses: recognition, detection',
        ],
      },
    },
  },
  {
    id: 'transformer',
    position: { x: 600, y: 380 },
    type: 'custom',
    data: {
      emoji: '⚡',
      level: 'algorithm',
      ru: {
        label: 'Transformer',
        description: 'Архитектура на механизме внимания, обрабатывающая последовательности параллельно.',
        keyPoints: [
          '👀 Self-attention: каждый токен "видит" все другие',
          '⚡ Параллельная обработка (vs RNN последовательно)',
          '📍 Positional encoding для порядка',
          '📄 Статья "Attention Is All You Need" (2017)',
        ],
      },
      en: {
        label: 'Transformer',
        description: 'Architecture based on attention mechanism, processing sequences in parallel.',
        keyPoints: [
          '👀 Self-attention: each token "sees" all others',
          '⚡ Parallel processing (vs RNN sequential)',
          '📍 Positional encoding for order',
          '📄 Paper "Attention Is All You Need" (2017)',
        ],
      },
    },
  },

  // ========== IMPLEMENTATION (NLP) ==========
  {
    id: 'llm',
    position: { x: 900, y: 260 },
    type: 'custom',
    data: {
      emoji: '🗣️',
      level: 'implementation',
      ru: {
        label: 'LLM',
        description: 'Большие языковые модели — масштабные трансформеры обученные на огромных текстовых корпусах.',
        keyPoints: [
          '📏 Размер: миллиарды параметров (GPT-4: ~1.7T)',
          '📚 Обучение: весь интернет + книги + код',
          '🎭 Emergent abilities при масштабировании',
          '🔧 Примеры: GPT-4, Claude, Gemini, LLaMA',
        ],
      },
      en: {
        label: 'LLM',
        description: 'Large Language Models — massive transformers trained on huge text corpora.',
        keyPoints: [
          '📏 Size: billions of parameters (GPT-4: ~1.7T)',
          '📚 Training: entire internet + books + code',
          '🎭 Emergent abilities at scale',
          '🔧 Examples: GPT-4, Claude, Gemini, LLaMA',
        ],
      },
    },
  },
  {
    id: 'embeddings',
    position: { x: 1080, y: 260 },
    type: 'custom',
    data: {
      emoji: '📐',
      level: 'implementation',
      ru: {
        label: 'Embeddings',
        description: 'Векторные представления — слова/тексты как точки в многомерном пространстве.',
        keyPoints: [
          '📊 Вектор фиксированной размерности (768, 1536...)',
          '📏 Похожие понятия = близкие векторы',
          '➕ Арифметика: king - man + woman ≈ queen',
          '🔍 Применение: поиск, RAG, кластеризация',
        ],
      },
      en: {
        label: 'Embeddings',
        description: 'Vector representations — words/texts as points in multidimensional space.',
        keyPoints: [
          '📊 Fixed dimension vector (768, 1536...)',
          '📏 Similar concepts = nearby vectors',
          '➕ Arithmetic: king - man + woman ≈ queen',
          '🔍 Uses: search, RAG, clustering',
        ],
      },
    },
  },
  {
    id: 'tokenization',
    position: { x: 1080, y: 380 },
    type: 'custom',
    data: {
      emoji: '✂️',
      level: 'implementation',
      ru: {
        label: 'Токенизация',
        description: 'Разбиение текста на токены (единицы обработки для модели).',
        keyPoints: [
          '✂️ Текст → список токенов (subwords)',
          '📖 Словарь: 30k-100k токенов',
          '🔤 BPE, WordPiece, SentencePiece алгоритмы',
          '💰 Влияет на стоимость API ($/1M tokens)',
        ],
      },
      en: {
        label: 'Tokenization',
        description: 'Splitting text into tokens (processing units for the model).',
        keyPoints: [
          '✂️ Text → list of tokens (subwords)',
          '📖 Vocabulary: 30k-100k tokens',
          '🔤 BPE, WordPiece, SentencePiece algorithms',
          '💰 Affects API cost ($/1M tokens)',
        ],
      },
    },
  },
];

// ==================== EDGES ====================

export const initialEdges: Edge[] = [
  // AI → Theories
  { id: 'ai-ml', source: 'ai', target: 'ml', animated: true },
  { id: 'ai-dl', source: 'ai', target: 'dl', animated: true },
  { id: 'ai-nlp', source: 'ai', target: 'nlp', animated: true },
  
  // ML → Methods
  { id: 'ml-sup', source: 'ml', target: 'supervised' },
  { id: 'ml-unsup', source: 'ml', target: 'unsupervised' },
  { id: 'ml-rl', source: 'ml', target: 'rl' },
  
  // Supervised → Algorithms
  { id: 'sup-linreg', source: 'supervised', target: 'linear-reg' },
  { id: 'sup-tree', source: 'supervised', target: 'decision-tree' },
  { id: 'sup-rf', source: 'supervised', target: 'random-forest' },
  { id: 'sup-svm', source: 'supervised', target: 'svm' },
  
  // Unsupervised → Algorithms
  { id: 'unsup-kmeans', source: 'unsupervised', target: 'kmeans' },
  { id: 'unsup-pca', source: 'unsupervised', target: 'pca' },
  
  // RL → Algorithms
  { id: 'rl-qlearn', source: 'rl', target: 'qlearning' },
  
  // DL → Architectures
  { id: 'dl-nn', source: 'dl', target: 'nn' },
  { id: 'dl-cnn', source: 'dl', target: 'cnn' },
  { id: 'nn-trans', source: 'nn', target: 'transformer' },
  
  // NLP → Implementations
  { id: 'nlp-llm', source: 'nlp', target: 'llm' },
  { id: 'nlp-emb', source: 'nlp', target: 'embeddings' },
  { id: 'nlp-tok', source: 'nlp', target: 'tokenization' },
  
  // Cross-connections (dashed = связь между ветками)
  { id: 'trans-llm', source: 'transformer', target: 'llm', style: { strokeDasharray: '5,5' } },
  { id: 'sup-nn', source: 'supervised', target: 'nn', style: { strokeDasharray: '5,5' } },
  { id: 'tree-rf', source: 'decision-tree', target: 'random-forest', style: { strokeDasharray: '5,5' } },
];
