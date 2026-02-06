import { Edge } from '@xyflow/react';

export type AbstractionLevel = 'field' | 'theory' | 'method' | 'algorithm' | 'implementation';
export type Language = 'ru' | 'en';

export interface NodeContent {
  label: string;
  description: string;
  keyPoints: string[];
  howItWorks: string; // Подробное объяснение механизма
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
  field: '#6366f1',
  theory: '#8b5cf6',
  method: '#06b6d4',
  algorithm: '#10b981',
  implementation: '#f59e0b',
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
        howItWorks: 'AI системы работают по принципу: входные данные → обработка (алгоритмы/модели) → выходной результат. Современный AI основан на машинном обучении: вместо явного программирования правил, система учится на примерах. Процесс: 1) Сбор данных 2) Обучение модели на данных 3) Валидация качества 4) Применение к новым данным. AI может быть узким (одна задача) или общим (AGI — множество задач, пока не достигнут).',
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
        howItWorks: 'AI systems work on principle: input data → processing (algorithms/models) → output result. Modern AI is based on machine learning: instead of explicit rule programming, system learns from examples. Process: 1) Collect data 2) Train model on data 3) Validate quality 4) Apply to new data. AI can be narrow (single task) or general (AGI — multiple tasks, not yet achieved).',
      },
    },
  },

  // ========== THEORY ==========
  {
    id: 'ml',
    position: { x: 150, y: 120 },
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
        howItWorks: 'ML модель — это математическая функция с настраиваемыми параметрами (весами). Обучение: 1) Модель делает предсказание 2) Сравнение с правильным ответом через loss function 3) Вычисление градиента (направление улучшения) 4) Обновление весов (gradient descent) 5) Повтор тысячи раз. После обучения модель применяется к новым данным (inference). Ключевое: модель находит паттерны сама, а не программист их задаёт.',
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
        howItWorks: 'ML model is a mathematical function with adjustable parameters (weights). Training: 1) Model makes prediction 2) Compare with correct answer via loss function 3) Compute gradient (improvement direction) 4) Update weights (gradient descent) 5) Repeat thousands of times. After training, model is applied to new data (inference). Key: model finds patterns itself, programmer doesn\'t specify them.',
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
        howItWorks: 'Deep Learning использует нейросети с множеством слоёв. Каждый слой извлекает всё более абстрактные признаки: первые слои — простые паттерны (линии, края), средние — формы, глубокие — объекты целиком. Обучение через backpropagation: ошибка распространяется назад по сети, каждый нейрон корректирует свои веса. "Глубина" позволяет моделировать сложные нелинейные зависимости. Требует GPU из-за параллельных матричных операций.',
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
        howItWorks: 'Deep Learning uses neural networks with many layers. Each layer extracts increasingly abstract features: first layers — simple patterns (lines, edges), middle — shapes, deep — whole objects. Training via backpropagation: error propagates backward through network, each neuron adjusts its weights. "Depth" allows modeling complex nonlinear dependencies. Requires GPU due to parallel matrix operations.',
      },
    },
  },
  {
    id: 'nlp',
    position: { x: 1050, y: 120 },
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
        howItWorks: 'NLP преобразует текст в числа для обработки моделью. Пайплайн: 1) Токенизация — разбиение на единицы (слова/подслова) 2) Эмбеддинг — преобразование токенов в векторы чисел 3) Обработка моделью (трансформер) — понимание контекста 4) Декодирование — генерация выхода. Ключевая идея: слова с похожим значением имеют близкие векторы. Современные LLM предсказывают следующий токен, генерируя текст авторегрессивно.',
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
        howItWorks: 'NLP converts text to numbers for model processing. Pipeline: 1) Tokenization — split into units (words/subwords) 2) Embedding — convert tokens to number vectors 3) Model processing (transformer) — understand context 4) Decoding — generate output. Key idea: words with similar meaning have close vectors. Modern LLMs predict next token, generating text autoregressively.',
      },
    },
  },

  // ========== METHOD (ML) ==========
  {
    id: 'supervised',
    position: { x: -50, y: 260 },
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
        howItWorks: 'Процесс: 1) Подготовка датасета с парами (вход, правильный_ответ) 2) Модель делает предсказание для входа 3) Loss function вычисляет ошибку между предсказанием и правильным ответом 4) Оптимизатор обновляет веса чтобы уменьшить ошибку 5) Повтор на всех примерах много эпох. Для классификации: выход — вероятности классов, loss — cross-entropy. Для регрессии: выход — число, loss — MSE.',
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
        howItWorks: 'Process: 1) Prepare dataset with (input, correct_answer) pairs 2) Model makes prediction for input 3) Loss function computes error between prediction and correct answer 4) Optimizer updates weights to reduce error 5) Repeat on all examples for many epochs. For classification: output — class probabilities, loss — cross-entropy. For regression: output — number, loss — MSE.',
      },
    },
  },
  {
    id: 'unsupervised',
    position: { x: 150, y: 260 },
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
        howItWorks: 'Модель анализирует данные без "правильных ответов". Кластеризация: группирует похожие объекты вместе (K-Means находит центры групп). Снижение размерности: находит главные направления вариации (PCA проецирует на меньшее пространство). Детекция аномалий: учится на "нормальных" данных, выделяет необычные. Ключевое отличие: нет явной целевой переменной, модель сама определяет структуру.',
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
        howItWorks: 'Model analyzes data without "correct answers". Clustering: groups similar objects together (K-Means finds group centers). Dimensionality reduction: finds main variation directions (PCA projects to smaller space). Anomaly detection: learns from "normal" data, identifies unusual ones. Key difference: no explicit target variable, model determines structure itself.',
      },
    },
  },
  {
    id: 'rl',
    position: { x: 350, y: 260 },
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
        howItWorks: 'Агент находится в состоянии (state), выбирает действие (action), переходит в новое состояние и получает награду (reward). Цель: выучить policy — стратегию выбора действий максимизирующую суммарную награду. Дилемма exploration/exploitation: исследовать новые действия или использовать известные хорошие? Методы: Q-learning (таблица ценности действий), Policy Gradient (напрямую оптимизирует стратегию), Actor-Critic (комбинация).',
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
        howItWorks: 'Agent is in state, chooses action, transitions to new state and receives reward. Goal: learn policy — action selection strategy maximizing cumulative reward. Exploration/exploitation dilemma: explore new actions or use known good ones? Methods: Q-learning (action value table), Policy Gradient (directly optimize strategy), Actor-Critic (combination).',
      },
    },
  },

  // ========== ALGORITHM (ML) ==========
  {
    id: 'linear-reg',
    position: { x: -150, y: 400 },
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
        howItWorks: 'Модель: y = w₁x₁ + w₂x₂ + ... + b, где w — веса, b — смещение. Обучение: 1) Начать с случайных весов 2) Вычислить предсказания 3) Посчитать MSE = среднее((предсказание - факт)²) 4) Градиент показывает как изменить веса 5) Обновить: w = w - learning_rate * градиент. Есть аналитическое решение через нормальное уравнение. Предполагает линейную зависимость — не подходит для сложных паттернов.',
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
        howItWorks: 'Model: y = w₁x₁ + w₂x₂ + ... + b, where w — weights, b — bias. Training: 1) Start with random weights 2) Compute predictions 3) Calculate MSE = mean((prediction - actual)²) 4) Gradient shows how to change weights 5) Update: w = w - learning_rate * gradient. Has analytical solution via normal equation. Assumes linear relationship — not suitable for complex patterns.',
      },
    },
  },
  {
    id: 'decision-tree',
    position: { x: 30, y: 400 },
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
        howItWorks: 'Построение: 1) Выбрать признак и порог для разбиения 2) Критерий: максимизация "чистоты" групп (Gini, Entropy) 3) Рекурсивно разбивать до условия остановки. Пример: "Возраст > 30? Да → Доход > 50k? Да → Одобрить кредит". Предсказание: идём от корня по условиям до листа. Легко интерпретировать, но глубокое дерево запоминает обучающие данные (overfitting). Решение: ограничить глубину или использовать ансамбли.',
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
        howItWorks: 'Building: 1) Choose feature and threshold for split 2) Criterion: maximize group "purity" (Gini, Entropy) 3) Recursively split until stopping condition. Example: "Age > 30? Yes → Income > 50k? Yes → Approve loan". Prediction: go from root through conditions to leaf. Easy to interpret, but deep tree memorizes training data (overfitting). Solution: limit depth or use ensembles.',
      },
    },
  },
  {
    id: 'random-forest',
    position: { x: 210, y: 400 },
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
        howItWorks: 'Идея: много "слабых" моделей вместе дают "сильную". Обучение: 1) Для каждого дерева взять bootstrap-выборку (с повторениями) 2) В каждом узле рассматривать случайное подмножество признаков 3) Построить дерево без ограничений. Предсказание: классификация — голосование большинства, регрессия — среднее. Рандомизация уменьшает корреляцию между деревьями → снижает дисперсию → меньше overfitting. Недостаток: теряется интерпретируемость.',
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
        howItWorks: 'Idea: many "weak" models together make "strong" one. Training: 1) For each tree take bootstrap sample (with replacement) 2) At each node consider random subset of features 3) Build tree without restrictions. Prediction: classification — majority vote, regression — average. Randomization reduces correlation between trees → reduces variance → less overfitting. Downside: loses interpretability.',
      },
    },
  },
  {
    id: 'svm',
    position: { x: -150, y: 520 },
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
        howItWorks: 'Цель: найти гиперплоскость, максимально удалённую от ближайших точек обоих классов (support vectors). Margin = расстояние до ближайших точек × 2. Kernel trick: проецирует данные в пространство большей размерности где они линейно разделимы. Примеры ядер: RBF (радиальное), polynomial. Soft margin: допускает ошибки при неразделимых данных. Математически: решается как задача квадратичного программирования.',
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
        howItWorks: 'Goal: find hyperplane maximally distant from nearest points of both classes (support vectors). Margin = distance to nearest points × 2. Kernel trick: projects data to higher-dimensional space where linearly separable. Kernel examples: RBF (radial), polynomial. Soft margin: allows errors for non-separable data. Mathematically: solved as quadratic programming problem.',
      },
    },
  },
  {
    id: 'kmeans',
    position: { x: 30, y: 520 },
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
        howItWorks: 'Алгоритм: 1) Случайно выбрать K начальных центров 2) Каждую точку отнести к ближайшему центру 3) Пересчитать центры как среднее точек кластера 4) Повторять 2-3 пока центры не стабилизируются. Критерий: минимизация суммы квадратов расстояний до центров (inertia). Проблемы: нужно заранее знать K (Elbow method помогает), результат зависит от начальных центров (K-means++ улучшает инициализацию).',
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
        howItWorks: 'Algorithm: 1) Randomly choose K initial centers 2) Assign each point to nearest center 3) Recalculate centers as mean of cluster points 4) Repeat 2-3 until centers stabilize. Criterion: minimize sum of squared distances to centers (inertia). Problems: need to know K beforehand (Elbow method helps), result depends on initial centers (K-means++ improves initialization).',
      },
    },
  },
  {
    id: 'pca',
    position: { x: 210, y: 520 },
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
        howItWorks: 'Идея: найти новые оси (главные компоненты) по которым данные максимально "растянуты". Алгоритм: 1) Центрировать данные (вычесть среднее) 2) Вычислить ковариационную матрицу 3) Найти собственные векторы и значения 4) Отсортировать по убыванию собственных значений 5) Выбрать топ-K компонент 6) Проецировать данные. Первая компонента объясняет максимум дисперсии, вторая — максимум оставшейся, и т.д.',
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
        howItWorks: 'Idea: find new axes (principal components) along which data is maximally "stretched". Algorithm: 1) Center data (subtract mean) 2) Compute covariance matrix 3) Find eigenvectors and eigenvalues 4) Sort by decreasing eigenvalues 5) Select top-K components 6) Project data. First component explains maximum variance, second — maximum of remaining, etc.',
      },
    },
  },
  {
    id: 'qlearning',
    position: { x: 390, y: 400 },
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
        howItWorks: 'Q-таблица хранит ценность каждого действия в каждом состоянии. Обновление: Q(s,a) ← Q(s,a) + α[r + γ·max(Q(s\',a\')) - Q(s,a)], где α — learning rate, γ — discount factor, r — награда, s\' — новое состояние. ε-greedy: с вероятностью ε выбираем случайное действие (exploration), иначе лучшее по Q (exploitation). Deep Q-Network (DQN): заменяет таблицу нейросетью для больших пространств состояний.',
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
        howItWorks: 'Q-table stores value of each action in each state. Update: Q(s,a) ← Q(s,a) + α[r + γ·max(Q(s\',a\')) - Q(s,a)], where α — learning rate, γ — discount factor, r — reward, s\' — new state. ε-greedy: with probability ε choose random action (exploration), otherwise best by Q (exploitation). Deep Q-Network (DQN): replaces table with neural network for large state spaces.',
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
        howItWorks: 'Нейрон вычисляет: output = activation(Σ(wᵢ·xᵢ) + b). Активации: ReLU (max(0,x)), Sigmoid (0-1), Tanh (-1 to 1). Forward pass: данные проходят слой за слоем. Backward pass (backprop): вычисляем градиент loss по каждому весу через chain rule (правило цепочки). Обновление весов: w = w - lr·∂L/∂w. Гиперпараметры: количество слоёв, нейронов, learning rate, batch size. Universal Approximation: достаточно глубокая сеть может аппроксимировать любую функцию.',
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
        howItWorks: 'Neuron computes: output = activation(Σ(wᵢ·xᵢ) + b). Activations: ReLU (max(0,x)), Sigmoid (0-1), Tanh (-1 to 1). Forward pass: data flows layer by layer. Backward pass (backprop): compute loss gradient for each weight via chain rule. Weight update: w = w - lr·∂L/∂w. Hyperparameters: number of layers, neurons, learning rate, batch size. Universal Approximation: sufficiently deep network can approximate any function.',
      },
    },
  },
  {
    id: 'cnn',
    position: { x: 700, y: 260 },
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
        howItWorks: 'Свёртка: фильтр (ядро) 3x3 или 5x5 скользит по изображению, вычисляя скалярное произведение. Один фильтр = один признак (грань, цвет). Stride — шаг, padding — добавление границ. Pooling (обычно max): уменьшает размер, сохраняя главное. Архитектура: [Conv→ReLU→Pool] × N → Flatten → Dense. Примеры: LeNet (1998), AlexNet (2012), VGG, ResNet (skip connections для очень глубоких сетей).',
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
        howItWorks: 'Convolution: filter (kernel) 3x3 or 5x5 slides over image, computing dot product. One filter = one feature (edge, color). Stride — step, padding — adding borders. Pooling (usually max): reduces size, preserving main info. Architecture: [Conv→ReLU→Pool] × N → Flatten → Dense. Examples: LeNet (1998), AlexNet (2012), VGG, ResNet (skip connections for very deep networks).',
      },
    },
  },
  {
    id: 'rnn',
    position: { x: 520, y: 400 },
    type: 'custom',
    data: {
      emoji: '🔁',
      level: 'algorithm',
      ru: {
        label: 'RNN',
        description: 'Рекуррентные сети — обрабатывают последовательности, сохраняя "память" о предыдущих шагах.',
        keyPoints: [
          '🔄 Один и тот же слой применяется на каждом шаге',
          '💭 Hidden state хранит информацию о прошлом',
          '📝 Для текста, временных рядов, музыки',
          '⚠️ Проблема: vanishing gradient на длинных последовательностях',
        ],
        howItWorks: 'На каждом шаге t: hₜ = tanh(Wₕₕ·hₜ₋₁ + Wₓₕ·xₜ), где h — hidden state, x — вход. Веса W общие для всех шагов (weight sharing). Проблема vanishing gradient: при backprop через много шагов градиенты уменьшаются экспоненциально → сеть не учится на дальних зависимостях. Решения: LSTM и GRU добавляют "ворота" для контроля потока информации. Bidirectional RNN: обрабатывает последовательность в обе стороны.',
      },
      en: {
        label: 'RNN',
        description: 'Recurrent networks — process sequences, maintaining "memory" of previous steps.',
        keyPoints: [
          '🔄 Same layer applied at each step',
          '💭 Hidden state stores past information',
          '📝 For text, time series, music',
          '⚠️ Problem: vanishing gradient on long sequences',
        ],
        howItWorks: 'At each step t: hₜ = tanh(Wₕₕ·hₜ₋₁ + Wₓₕ·xₜ), where h — hidden state, x — input. Weights W shared across all steps (weight sharing). Vanishing gradient problem: during backprop through many steps gradients decrease exponentially → network doesn\'t learn long dependencies. Solutions: LSTM and GRU add "gates" to control information flow. Bidirectional RNN: processes sequence in both directions.',
      },
    },
  },
  {
    id: 'lstm',
    position: { x: 520, y: 520 },
    type: 'custom',
    data: {
      emoji: '🧠',
      level: 'algorithm',
      ru: {
        label: 'LSTM',
        description: 'Long Short-Term Memory — RNN с воротами, решающая проблему затухания градиентов.',
        keyPoints: [
          '🚪 3 ворот: forget, input, output',
          '📦 Cell state — долгосрочная память',
          '🔗 Может помнить информацию на сотни шагов',
          '📈 Стандарт для seq2seq до трансформеров',
        ],
        howItWorks: 'Три ворот (0-1 через sigmoid): Forget gate: fₜ = σ(Wf·[hₜ₋₁,xₜ]) — что забыть из cell state. Input gate: iₜ = σ(Wi·[hₜ₋₁,xₜ]) — что добавить нового. Output gate: oₜ = σ(Wo·[hₜ₋₁,xₜ]) — что вывести. Cell state обновляется: Cₜ = fₜ⊙Cₜ₋₁ + iₜ⊙tanh(Wc·[hₜ₋₁,xₜ]). Градиенты протекают через cell state без затухания. GRU — упрощённая версия с 2 воротами.',
      },
      en: {
        label: 'LSTM',
        description: 'Long Short-Term Memory — RNN with gates solving vanishing gradient problem.',
        keyPoints: [
          '🚪 3 gates: forget, input, output',
          '📦 Cell state — long-term memory',
          '🔗 Can remember information for hundreds of steps',
          '📈 Standard for seq2seq before transformers',
        ],
        howItWorks: 'Three gates (0-1 via sigmoid): Forget gate: fₜ = σ(Wf·[hₜ₋₁,xₜ]) — what to forget from cell state. Input gate: iₜ = σ(Wi·[hₜ₋₁,xₜ]) — what new to add. Output gate: oₜ = σ(Wo·[hₜ₋₁,xₜ]) — what to output. Cell state updates: Cₜ = fₜ⊙Cₜ₋₁ + iₜ⊙tanh(Wc·[hₜ₋₁,xₜ]). Gradients flow through cell state without vanishing. GRU — simplified version with 2 gates.',
      },
    },
  },
  {
    id: 'transformer',
    position: { x: 700, y: 400 },
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
        howItWorks: 'Self-attention: для каждого токена вычисляем Query, Key, Value через линейные проекции. Attention(Q,K,V) = softmax(QKᵀ/√d)V. Каждый токен получает взвешенную сумму всех Value, веса = сходство Query и Key. Multi-head: несколько attention параллельно → разные типы связей. Encoder: self-attention + feed-forward. Decoder: masked self-attention (видит только прошлое) + cross-attention к encoder. Positional encoding добавляет информацию о позиции.',
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
        howItWorks: 'Self-attention: for each token compute Query, Key, Value via linear projections. Attention(Q,K,V) = softmax(QKᵀ/√d)V. Each token gets weighted sum of all Values, weights = Query-Key similarity. Multi-head: several attention in parallel → different relationship types. Encoder: self-attention + feed-forward. Decoder: masked self-attention (sees only past) + cross-attention to encoder. Positional encoding adds position information.',
      },
    },
  },
  {
    id: 'attention',
    position: { x: 700, y: 520 },
    type: 'custom',
    data: {
      emoji: '👁️',
      level: 'algorithm',
      ru: {
        label: 'Attention',
        description: 'Механизм, позволяющий модели фокусироваться на релевантных частях входа.',
        keyPoints: [
          '🎯 Динамические веса вместо фиксированных',
          '🔗 Связывает любые позиции напрямую',
          '📊 Softmax нормализует веса в сумму = 1',
          '💡 Изначально для seq2seq translation',
        ],
        howItWorks: 'Базовая идея: не все части входа одинаково важны для текущего выхода. Score: насколько Query похож на каждый Key (dot product или MLP). Softmax: превращает scores в вероятности. Output: взвешенная сумма Values. Пример в переводе: при генерации слова "chat" смотрим сильнее на "кот" в исходном предложении. Варианты: additive (Bahdanau), multiplicative (Luong), scaled dot-product (Transformer). Cross-attention: Query из decoder, Key/Value из encoder.',
      },
      en: {
        label: 'Attention',
        description: 'Mechanism allowing model to focus on relevant parts of input.',
        keyPoints: [
          '🎯 Dynamic weights instead of fixed',
          '🔗 Connects any positions directly',
          '📊 Softmax normalizes weights to sum = 1',
          '💡 Originally for seq2seq translation',
        ],
        howItWorks: 'Basic idea: not all input parts equally important for current output. Score: how similar Query is to each Key (dot product or MLP). Softmax: turns scores into probabilities. Output: weighted sum of Values. Translation example: when generating "cat" we look more at "кот" in source sentence. Variants: additive (Bahdanau), multiplicative (Luong), scaled dot-product (Transformer). Cross-attention: Query from decoder, Key/Value from encoder.',
      },
    },
  },
  {
    id: 'gan',
    position: { x: 880, y: 400 },
    type: 'custom',
    data: {
      emoji: '🎭',
      level: 'algorithm',
      ru: {
        label: 'GAN',
        description: 'Generative Adversarial Network — две сети соревнуются: генератор создаёт, дискриминатор проверяет.',
        keyPoints: [
          '🎨 Generator создаёт фейки из шума',
          '🔍 Discriminator отличает реальное от фейка',
          '⚔️ Игра с нулевой суммой',
          '🖼️ Генерация изображений, deepfakes',
        ],
        howItWorks: 'Generator G(z) превращает случайный шум z в изображение. Discriminator D(x) выдаёт вероятность что x реальное. Обучение: D учится отличать реальные от G(z), G учится обманывать D. Minimax игра: minG maxD [E[log D(x)] + E[log(1-D(G(z)))]]. Проблемы: mode collapse (G генерирует одно и то же), нестабильность обучения. Улучшения: DCGAN, WGAN (Wasserstein distance), StyleGAN (контроль стиля).',
      },
      en: {
        label: 'GAN',
        description: 'Generative Adversarial Network — two networks compete: generator creates, discriminator verifies.',
        keyPoints: [
          '🎨 Generator creates fakes from noise',
          '🔍 Discriminator distinguishes real from fake',
          '⚔️ Zero-sum game',
          '🖼️ Image generation, deepfakes',
        ],
        howItWorks: 'Generator G(z) transforms random noise z into image. Discriminator D(x) outputs probability x is real. Training: D learns to distinguish real from G(z), G learns to fool D. Minimax game: minG maxD [E[log D(x)] + E[log(1-D(G(z)))]]. Problems: mode collapse (G generates same thing), training instability. Improvements: DCGAN, WGAN (Wasserstein distance), StyleGAN (style control).',
      },
    },
  },
  {
    id: 'vae',
    position: { x: 880, y: 520 },
    type: 'custom',
    data: {
      emoji: '🎲',
      level: 'algorithm',
      ru: {
        label: 'VAE',
        description: 'Variational Autoencoder — учит сжатое представление данных + генерирует новые.',
        keyPoints: [
          '📦 Encoder сжимает в latent space',
          '📤 Decoder восстанавливает из latent',
          '🎯 Latent = распределение (μ, σ)',
          '🔀 Сэмплирование для генерации',
        ],
        howItWorks: 'Encoder выдаёт не точку, а распределение: μ (среднее) и σ (дисперсия). Reparametrization trick: z = μ + σ·ε, где ε ~ N(0,1) — позволяет backprop. Decoder восстанавливает x из z. Loss = reconstruction_loss + KL_divergence(q(z|x) || p(z)). KL заставляет latent быть близким к N(0,1) → можно сэмплировать из N(0,1) для генерации. Latent space непрерывный → можно интерполировать между объектами.',
      },
      en: {
        label: 'VAE',
        description: 'Variational Autoencoder — learns compressed representation + generates new samples.',
        keyPoints: [
          '📦 Encoder compresses to latent space',
          '📤 Decoder reconstructs from latent',
          '🎯 Latent = distribution (μ, σ)',
          '🔀 Sampling for generation',
        ],
        howItWorks: 'Encoder outputs not point but distribution: μ (mean) and σ (variance). Reparametrization trick: z = μ + σ·ε, where ε ~ N(0,1) — enables backprop. Decoder reconstructs x from z. Loss = reconstruction_loss + KL_divergence(q(z|x) || p(z)). KL forces latent to be close to N(0,1) → can sample from N(0,1) for generation. Latent space is continuous → can interpolate between objects.',
      },
    },
  },
  {
    id: 'diffusion',
    position: { x: 1060, y: 400 },
    type: 'custom',
    data: {
      emoji: '🌫️',
      level: 'algorithm',
      ru: {
        label: 'Diffusion',
        description: 'Диффузионные модели — учатся постепенно убирать шум, генерируя данные из чистого шума.',
        keyPoints: [
          '➡️ Forward: добавляем шум шаг за шагом',
          '⬅️ Reverse: убираем шум (генерация)',
          '🎨 SOTA для генерации изображений',
          '🖼️ Stable Diffusion, DALL-E, Midjourney',
        ],
        howItWorks: 'Forward process: x₀ → x₁ → ... → xₜ, на каждом шаге добавляем гауссовский шум, в конце — чистый шум. Reverse process: модель учится предсказывать шум добавленный на шаге t, и вычитает его: xₜ → xₜ₋₁ → ... → x₀. Обучение: берём чистое изображение, добавляем шум, модель предсказывает этот шум. Генерация: начинаем с чистого шума, итеративно убираем. Условная генерация: добавляем текстовый embedding (CLIP) для контроля.',
      },
      en: {
        label: 'Diffusion',
        description: 'Diffusion models — learn to gradually remove noise, generating data from pure noise.',
        keyPoints: [
          '➡️ Forward: add noise step by step',
          '⬅️ Reverse: remove noise (generation)',
          '🎨 SOTA for image generation',
          '🖼️ Stable Diffusion, DALL-E, Midjourney',
        ],
        howItWorks: 'Forward process: x₀ → x₁ → ... → xₜ, at each step add Gaussian noise, end with pure noise. Reverse process: model learns to predict noise added at step t, and subtracts it: xₜ → xₜ₋₁ → ... → x₀. Training: take clean image, add noise, model predicts this noise. Generation: start from pure noise, iteratively remove. Conditional generation: add text embedding (CLIP) for control.',
      },
    },
  },

  // ========== IMPLEMENTATION (NLP) ==========
  {
    id: 'llm',
    position: { x: 950, y: 260 },
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
        howItWorks: 'Архитектура: decoder-only transformer. Обучение: предсказание следующего токена (causal LM). Датасет: триллионы токенов текста. Scaling laws: больше параметров + данных = лучше качество. Emergent abilities: при достижении определённого масштаба появляются способности которых не было (in-context learning, reasoning). Fine-tuning: RLHF (обучение на человеческих предпочтениях) для следования инструкциям. Inference: авторегрессивная генерация токен за токеном.',
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
        howItWorks: 'Architecture: decoder-only transformer. Training: next token prediction (causal LM). Dataset: trillions of text tokens. Scaling laws: more parameters + data = better quality. Emergent abilities: at certain scale new capabilities appear (in-context learning, reasoning). Fine-tuning: RLHF (learning from human preferences) for instruction following. Inference: autoregressive generation token by token.',
      },
    },
  },
  {
    id: 'embeddings',
    position: { x: 1130, y: 260 },
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
        howItWorks: 'Word2Vec: обучается предсказывать слово по контексту (CBOW) или контекст по слову (Skip-gram). Sentence embeddings: усреднение токенов или специальная модель (SBERT). Косинусное сходство: cos(a,b) = (a·b)/(|a||b|) — мера близости векторов. Применение в RAG: текст → embedding → поиск похожих в базе → контекст для LLM. OpenAI, Cohere, Voyage предоставляют embedding API. Размерность: компромисс между качеством и скоростью.',
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
        howItWorks: 'Word2Vec: learns to predict word from context (CBOW) or context from word (Skip-gram). Sentence embeddings: average tokens or specialized model (SBERT). Cosine similarity: cos(a,b) = (a·b)/(|a||b|) — vector closeness measure. RAG application: text → embedding → search similar in database → context for LLM. OpenAI, Cohere, Voyage provide embedding APIs. Dimensionality: tradeoff between quality and speed.',
      },
    },
  },
  {
    id: 'tokenization',
    position: { x: 1130, y: 380 },
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
        howItWorks: 'BPE (Byte Pair Encoding): начинает с символов, итеративно объединяет самые частые пары. "tokenization" → ["token", "ization"] или ["to", "ken", "iz", "ation"]. Редкие слова разбиваются на подслова, частые остаются целыми. Специальные токены: [CLS], [SEP], [PAD], <|endoftext|>. Проблемы: разные языки токенизируются по-разному, эмодзи и код могут занимать много токенов. tiktoken (OpenAI) — библиотека для подсчёта токенов.',
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
        howItWorks: 'BPE (Byte Pair Encoding): starts with characters, iteratively merges most frequent pairs. "tokenization" → ["token", "ization"] or ["to", "ken", "iz", "ation"]. Rare words split into subwords, frequent stay whole. Special tokens: [CLS], [SEP], [PAD], <|endoftext|>. Issues: different languages tokenize differently, emoji and code may take many tokens. tiktoken (OpenAI) — library for counting tokens.',
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
  { id: 'dl-rnn', source: 'dl', target: 'rnn' },
  { id: 'rnn-lstm', source: 'rnn', target: 'lstm' },
  { id: 'dl-trans', source: 'dl', target: 'transformer' },
  { id: 'trans-attn', source: 'transformer', target: 'attention' },
  { id: 'dl-gan', source: 'dl', target: 'gan' },
  { id: 'dl-vae', source: 'dl', target: 'vae' },
  { id: 'dl-diff', source: 'dl', target: 'diffusion' },
  
  // NLP → Implementations
  { id: 'nlp-llm', source: 'nlp', target: 'llm' },
  { id: 'nlp-emb', source: 'nlp', target: 'embeddings' },
  { id: 'nlp-tok', source: 'nlp', target: 'tokenization' },
  
  // Cross-connections (dashed = связь между ветками)
  { id: 'trans-llm', source: 'transformer', target: 'llm', style: { strokeDasharray: '5,5' } },
  { id: 'sup-nn', source: 'supervised', target: 'nn', style: { strokeDasharray: '5,5' } },
  { id: 'tree-rf', source: 'decision-tree', target: 'random-forest', style: { strokeDasharray: '5,5' } },
  { id: 'attn-llm', source: 'attention', target: 'llm', style: { strokeDasharray: '5,5' } },
];
