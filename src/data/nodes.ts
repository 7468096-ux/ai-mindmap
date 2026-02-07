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
        howItWorks: 'Представь график: по X — площадь квартиры, по Y — цена. Линейная регрессия проводит прямую линию через точки так, чтобы она была максимально близко ко всем.\n\nФормула линии: y = w·x + b\n• w (weight) — наклон линии. Больше w = круче наклон\n• b (bias) — где линия пересекает ось Y\n\nКак учится: модель пробует разные w и b, измеряет ошибку (MSE — средний квадрат расстояния от точек до линии), и шаг за шагом уменьшает её. Это называется gradient descent — двигаемся в сторону меньшей ошибки.\n\n⚠️ Работает только если зависимость действительно линейная!',
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
        howItWorks: 'Imagine a chart: X axis — apartment size, Y axis — price. Linear regression draws a straight line through points so it\'s as close as possible to all of them.\n\nLine formula: y = w·x + b\n• w (weight) — line slope. Higher w = steeper slope\n• b (bias) — where line crosses Y axis\n\nHow it learns: model tries different w and b, measures error (MSE — average squared distance from points to line), and step by step reduces it. This is called gradient descent — moving toward smaller error.\n\n⚠️ Only works if relationship is actually linear!',
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
        howItWorks: 'Представь: у тебя 100 клиентов и ты хочешь разделить их на 3 группы по поведению.\n\n1️⃣ Ставим 3 "флажка" (центроида) в случайных местах\n2️⃣ Каждый клиент идёт к ближайшему флажку — так образуются группы\n3️⃣ Передвигаем флажок в центр своей группы\n4️⃣ Повторяем шаги 2-3 пока флажки не перестанут двигаться\n\nВажно:\n• K (количество групп) задаём сами — алгоритм не угадывает\n• Начальные позиции флажков влияют на результат! Разный старт = разные группы\n• Elbow method: пробуем K=2,3,4... и смотрим где ошибка резко перестаёт падать',
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
        howItWorks: 'Imagine: you have 100 customers and want to split them into 3 groups by behavior.\n\n1️⃣ Place 3 "flags" (centroids) at random locations\n2️⃣ Each customer goes to nearest flag — this forms groups\n3️⃣ Move each flag to center of its group\n4️⃣ Repeat steps 2-3 until flags stop moving\n\nImportant:\n• K (number of groups) we set ourselves — algorithm doesn\'t guess\n• Starting positions affect result! Different start = different groups\n• Elbow method: try K=2,3,4... and see where error stops dropping sharply',
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
        howItWorks: 'Представь сеть как цепочку фильтров: вход → фильтр 1 → фильтр 2 → ... → выход.\n\nКаждый нейрон делает простое:\n1️⃣ Берёт входы, умножает на веса (w) и складывает\n2️⃣ Прибавляет смещение (b)\n3️⃣ Пропускает через активацию (например ReLU: отрицательное → 0)\n\nОбучение (backpropagation):\n• Прогоняем данные вперёд, получаем ответ\n• Сравниваем с правильным — получаем ошибку\n• Идём назад по сети: "кто виноват в ошибке?"\n• Каждый вес немного корректируется чтобы уменьшить ошибку\n• Повторяем тысячи раз\n\n💡 Чем больше слоёв — тем сложнее паттерны может выучить сеть',
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
        howItWorks: 'Think of network as a chain of filters: input → filter 1 → filter 2 → ... → output.\n\nEach neuron does something simple:\n1️⃣ Takes inputs, multiplies by weights (w), sums them up\n2️⃣ Adds bias (b)\n3️⃣ Passes through activation (e.g. ReLU: negative → 0)\n\nTraining (backpropagation):\n• Run data forward, get answer\n• Compare with correct one — get error\n• Go backward through network: "who caused the error?"\n• Each weight adjusted slightly to reduce error\n• Repeat thousands of times\n\n💡 More layers = more complex patterns network can learn',
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
        howItWorks: 'Представь: ты переводишь "The black cat sat" на русский. Когда пишешь слово "кот", на какое английское слово смотришь? Конечно на "cat"! А на "The" почти не смотришь.\n\nAttention делает то же самое автоматически:\n1️⃣ Для каждого выходного слова вычисляем "важность" каждого входного\n2️⃣ Важность = насколько слова связаны (через Query-Key сравнение)\n3️⃣ Softmax превращает важности в проценты (сумма = 100%)\n4️⃣ Итоговый вектор = смесь входных слов по этим процентам\n\nТермины:\n• Query — "что ищем" (текущее выходное слово)\n• Key — "что предлагаем" (все входные слова)\n• Value — "что берём" (информация из входных слов)',
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
        howItWorks: 'Imagine: you\'re translating "The black cat sat" to French. When writing "chat", which English word do you look at? Of course "cat"! You barely look at "The".\n\nAttention does the same automatically:\n1️⃣ For each output word, compute "importance" of each input word\n2️⃣ Importance = how related words are (via Query-Key comparison)\n3️⃣ Softmax turns importances into percentages (sum = 100%)\n4️⃣ Final vector = mix of input words by these percentages\n\nTerms:\n• Query — "what we\'re looking for" (current output word)\n• Key — "what we offer" (all input words)\n• Value — "what we take" (information from input words)',
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
          '📏 Размер: миллиарды параметров (GPT-4: сотни млрд+)',
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
          '📏 Size: billions of parameters (GPT-4: сотни млрд+)',
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

  // ========== COMPUTER VISION BRANCH ==========
  {
    id: 'cv',
    position: { x: 0, y: 0 },
    type: 'custom',
    data: {
      emoji: '👁️',
      level: 'theory',
      ru: {
        label: 'Компьютерное Зрение',
        description: 'Область AI, позволяющая компьютерам извлекать информацию из изображений и видео.',
        keyPoints: [
          '📷 Вход: изображения, видео, 3D-сканы',
          '🎯 Задачи: классификация, детекция, сегментация',
          '🧠 Основа: CNN и трансформеры (ViT)',
          '🚗 Применение: автопилот, медицина, AR/VR',
        ],
        howItWorks: 'CV системы преобразуют пиксели в понимание сцены. Пайплайн: 1) Препроцессинг — нормализация, аугментация 2) Извлечение признаков — CNN слои находят паттерны (края → формы → объекты) 3) Решение задачи — классификация (что на картинке?), детекция (где объекты?), сегментация (какой пиксель чему принадлежит?). Современные модели: ViT (Vision Transformer) применяет attention к патчам изображения. Transfer learning: предобученные модели (ImageNet) дообучаются на специфичных задачах.',
      },
      en: {
        label: 'Computer Vision',
        description: 'AI field enabling computers to extract information from images and video.',
        keyPoints: [
          '📷 Input: images, video, 3D scans',
          '🎯 Tasks: classification, detection, segmentation',
          '🧠 Foundation: CNN and transformers (ViT)',
          '🚗 Applications: self-driving, medicine, AR/VR',
        ],
        howItWorks: 'CV systems transform pixels into scene understanding. Pipeline: 1) Preprocessing — normalization, augmentation 2) Feature extraction — CNN layers find patterns (edges → shapes → objects) 3) Task solving — classification (what\'s in image?), detection (where are objects?), segmentation (which pixel belongs to what?). Modern models: ViT (Vision Transformer) applies attention to image patches. Transfer learning: pretrained models (ImageNet) fine-tuned on specific tasks.',
      },
    },
  },
  {
    id: 'obj-detection',
    position: { x: 0, y: 0 },
    type: 'custom',
    data: {
      emoji: '🎯',
      level: 'method',
      ru: {
        label: 'Детекция Объектов',
        description: 'Метод нахождения и локализации объектов на изображении с помощью bounding boxes.',
        keyPoints: [
          '📦 Выход: координаты bbox + класс + confidence',
          '🔄 Two-stage (R-CNN) vs One-stage (YOLO)',
          '📊 Метрики: mAP, IoU',
          '⚡ Real-time: YOLO, SSD',
        ],
        howItWorks: 'Two-stage детекторы (Faster R-CNN): 1) Region Proposal Network предлагает ~2000 регионов 2) CNN классифицирует каждый регион. Медленно но точно. One-stage детекторы (YOLO): делят изображение на сетку, каждая ячейка предсказывает bbox + класс за один проход. Быстро, подходит для real-time. Anchor boxes: предопределённые формы bbox разных размеров. Non-Maximum Suppression: убирает дублирующие детекции одного объекта.',
      },
      en: {
        label: 'Object Detection',
        description: 'Method of finding and localizing objects in images using bounding boxes.',
        keyPoints: [
          '📦 Output: bbox coordinates + class + confidence',
          '🔄 Two-stage (R-CNN) vs One-stage (YOLO)',
          '📊 Metrics: mAP, IoU',
          '⚡ Real-time: YOLO, SSD',
        ],
        howItWorks: 'Two-stage detectors (Faster R-CNN): 1) Region Proposal Network suggests ~2000 regions 2) CNN classifies each region. Slow but accurate. One-stage detectors (YOLO): divide image into grid, each cell predicts bbox + class in single pass. Fast, suitable for real-time. Anchor boxes: predefined bbox shapes of different sizes. Non-Maximum Suppression: removes duplicate detections of same object.',
      },
    },
  },
  {
    id: 'img-classification',
    position: { x: 0, y: 0 },
    type: 'custom',
    data: {
      emoji: '🏷️',
      level: 'method',
      ru: {
        label: 'Классификация Изображений',
        description: 'Метод присвоения изображению одной или нескольких меток классов.',
        keyPoints: [
          '🎯 Single-label vs Multi-label',
          '📊 Softmax для вероятностей классов',
          '🏆 ImageNet: 1000 классов, 1.2M изображений',
          '🔄 Fine-tuning предобученных моделей',
        ],
        howItWorks: 'Архитектура: CNN backbone извлекает признаки → Global Average Pooling → Fully Connected → Softmax. Процесс: изображение проходит через свёрточные слои, каждый слой извлекает всё более абстрактные признаки. Финальный вектор признаков классифицируется в один из классов. Cross-entropy loss сравнивает предсказание с ground truth. Data augmentation (повороты, отражения, кроп) увеличивает эффективный размер датасета.',
      },
      en: {
        label: 'Image Classification',
        description: 'Method of assigning one or more class labels to an image.',
        keyPoints: [
          '🎯 Single-label vs Multi-label',
          '📊 Softmax for class probabilities',
          '🏆 ImageNet: 1000 classes, 1.2M images',
          '🔄 Fine-tuning pretrained models',
        ],
        howItWorks: 'Architecture: CNN backbone extracts features → Global Average Pooling → Fully Connected → Softmax. Process: image passes through convolutional layers, each layer extracts increasingly abstract features. Final feature vector classified into one of classes. Cross-entropy loss compares prediction with ground truth. Data augmentation (rotations, flips, crops) increases effective dataset size.',
      },
    },
  },
  {
    id: 'segmentation',
    position: { x: 0, y: 0 },
    type: 'custom',
    data: {
      emoji: '🧩',
      level: 'method',
      ru: {
        label: 'Сегментация',
        description: 'Метод классификации каждого пикселя изображения по принадлежности к объекту/классу.',
        keyPoints: [
          '🎨 Semantic: классы без различия экземпляров',
          '🔢 Instance: каждый объект отдельно',
          '🏗️ Архитектуры: U-Net, Mask R-CNN, SAM',
          '🏥 Применение: медицина, автопилот, фото-редакторы',
        ],
        howItWorks: 'Semantic segmentation: каждому пикселю присваивается класс (небо, дорога, машина). U-Net архитектура: encoder сжимает → decoder восстанавливает разрешение, skip connections сохраняют детали. Instance segmentation: различает отдельные объекты одного класса (машина_1, машина_2). Mask R-CNN: детекция bbox + бинарная маска для каждого объекта. Panoptic: объединяет semantic и instance. SAM (Segment Anything): универсальная модель, работает с любыми объектами.',
      },
      en: {
        label: 'Segmentation',
        description: 'Method of classifying each pixel in an image by object/class membership.',
        keyPoints: [
          '🎨 Semantic: classes without instance distinction',
          '🔢 Instance: each object separately',
          '🏗️ Architectures: U-Net, Mask R-CNN, SAM',
          '🏥 Applications: medicine, self-driving, photo editors',
        ],
        howItWorks: 'Semantic segmentation: each pixel assigned a class (sky, road, car). U-Net architecture: encoder compresses → decoder restores resolution, skip connections preserve details. Instance segmentation: distinguishes individual objects of same class (car_1, car_2). Mask R-CNN: bbox detection + binary mask for each object. Panoptic: combines semantic and instance. SAM (Segment Anything): universal model, works with any objects.',
      },
    },
  },
  {
    id: 'yolo',
    position: { x: 0, y: 0 },
    type: 'custom',
    data: {
      emoji: '⚡',
      level: 'implementation',
      ru: {
        label: 'YOLO',
        description: 'You Only Look Once — быстрый детектор объектов реального времени.',
        keyPoints: [
          '🚀 Один проход = детекция всех объектов',
          '⏱️ Real-time: 30-150+ FPS',
          '📈 Версии: v1 (2016) → v8 (2023) → v11',
          '🎯 Баланс скорости и точности',
        ],
        howItWorks: 'YOLO делит изображение на сетку SxS. Каждая ячейка предсказывает: B bounding boxes (x, y, w, h, confidence) + C вероятностей классов. Всё за один forward pass! Loss функция объединяет: координаты bbox + confidence + классификацию. Anchor boxes: предопределённые формы bbox (высокие, широкие, квадратные). NMS убирает дубликаты. YOLOv8: улучшенный backbone (CSPDarknet), anchor-free детекция, decoupled head для классификации и регрессии отдельно.',
      },
      en: {
        label: 'YOLO',
        description: 'You Only Look Once — fast real-time object detector.',
        keyPoints: [
          '🚀 Single pass = detect all objects',
          '⏱️ Real-time: 30-150+ FPS',
          '📈 Versions: v1 (2016) → v8 (2023) → v11',
          '🎯 Speed-accuracy tradeoff',
        ],
        howItWorks: 'YOLO divides image into SxS grid. Each cell predicts: B bounding boxes (x, y, w, h, confidence) + C class probabilities. All in single forward pass! Loss function combines: bbox coordinates + confidence + classification. Anchor boxes: predefined bbox shapes (tall, wide, square). NMS removes duplicates. YOLOv8: improved backbone (CSPDarknet), anchor-free detection, decoupled head for classification and regression separately.',
      },
    },
  },
  {
    id: 'resnet',
    position: { x: 0, y: 0 },
    type: 'custom',
    data: {
      emoji: '🏗️',
      level: 'algorithm',
      ru: {
        label: 'ResNet',
        description: 'Residual Network — архитектура с skip connections, позволяющая обучать очень глубокие сети.',
        keyPoints: [
          '🔗 Skip connections: x + F(x)',
          '📏 Глубина: 18, 34, 50, 101, 152 слоя',
          '🏆 Победитель ImageNet 2015',
          '🧱 Базовый backbone для многих моделей',
        ],
        howItWorks: 'Проблема: очень глубокие сети плохо обучаются (vanishing gradient, degradation). Решение: residual блок учит не F(x), а F(x) + x (остаток). Если оптимальное преобразование близко к identity, легче выучить F(x) ≈ 0. Skip connection позволяет градиенту течь напрямую через блоки. Bottleneck блок: 1x1 conv (уменьшить каналы) → 3x3 conv → 1x1 conv (увеличить обратно). ResNet-50 = 50 слоёв с bottleneck блоками. Используется как backbone для детекции, сегментации, и др.',
      },
      en: {
        label: 'ResNet',
        description: 'Residual Network — architecture with skip connections enabling very deep networks.',
        keyPoints: [
          '🔗 Skip connections: x + F(x)',
          '📏 Depth: 18, 34, 50, 101, 152 layers',
          '🏆 ImageNet 2015 winner',
          '🧱 Base backbone for many models',
        ],
        howItWorks: 'Problem: very deep networks train poorly (vanishing gradient, degradation). Solution: residual block learns not F(x), but F(x) + x (residual). If optimal transform is close to identity, easier to learn F(x) ≈ 0. Skip connection allows gradient to flow directly through blocks. Bottleneck block: 1x1 conv (reduce channels) → 3x3 conv → 1x1 conv (increase back). ResNet-50 = 50 layers with bottleneck blocks. Used as backbone for detection, segmentation, etc.',
      },
    },
  },
  {
    id: 'gpt',
    position: { x: 0, y: 0 },
    type: 'custom',
    data: {
      emoji: '💬',
      level: 'implementation',
      ru: {
        label: 'GPT',
        description: 'Generative Pre-trained Transformer — авторегрессивная языковая модель от OpenAI.',
        keyPoints: [
          '📝 Decoder-only трансформер',
          '🎯 Обучение: предсказание следующего токена',
          '📈 GPT-1 (117M) → GPT-4 (сотни млрд+ параметров (точное число не раскрыто))',
          '💡 Emergent abilities: in-context learning, reasoning',
        ],
        howItWorks: 'Архитектура: стек decoder блоков с masked self-attention (видит только прошлые токены). Pre-training: на триллионах токенов текста предсказывает следующий токен. Fine-tuning: RLHF (обучение на человеческих предпочтениях) для следования инструкциям. Inference: авторегрессивная генерация — предсказываем токен, добавляем к контексту, повторяем. Temperature контролирует "креативность". GPT-4: multimodal (текст + изображения), сотни млрд+ параметров (точное число не раскрыто), MoE архитектура.',
      },
      en: {
        label: 'GPT',
        description: 'Generative Pre-trained Transformer — autoregressive language model from OpenAI.',
        keyPoints: [
          '📝 Decoder-only transformer',
          '🎯 Training: next token prediction',
          '📈 GPT-1 (117M) → GPT-4 (hundreds of billions+ (exact not disclosed))',
          '💡 Emergent abilities: in-context learning, reasoning',
        ],
        howItWorks: 'Architecture: stack of decoder blocks with masked self-attention (sees only past tokens). Pre-training: on trillions of text tokens predicts next token. Fine-tuning: RLHF (learning from human preferences) for instruction following. Inference: autoregressive generation — predict token, add to context, repeat. Temperature controls "creativity". GPT-4: multimodal (text + images), hundreds of billions+ (exact not disclosed), MoE architecture.',
      },
    },
  },
  {
    id: 'bert',
    position: { x: 0, y: 0 },
    type: 'custom',
    data: {
      emoji: '🔤',
      level: 'implementation',
      ru: {
        label: 'BERT',
        description: 'Bidirectional Encoder Representations from Transformers — модель для понимания текста.',
        keyPoints: [
          '📖 Encoder-only трансформер',
          '🔄 Bidirectional: видит контекст с обеих сторон',
          '🎭 Pre-training: MLM + NSP',
          '🏆 SOTA на многих NLU бенчмарках',
        ],
        howItWorks: 'В отличие от GPT, BERT использует encoder (bidirectional attention). Pre-training задачи: 1) MLM (Masked Language Model): маскируем 15% токенов, модель их предсказывает. 2) NSP (Next Sentence Prediction): предсказывает, следует ли предложение B за A. Fine-tuning: добавляем classification head для конкретной задачи (sentiment, NER, QA). [CLS] токен агрегирует информацию всего текста. BERT-base: 12 слоёв, 110M параметров. RoBERTa, ALBERT, DeBERTa — улучшенные варианты.',
      },
      en: {
        label: 'BERT',
        description: 'Bidirectional Encoder Representations from Transformers — text understanding model.',
        keyPoints: [
          '📖 Encoder-only transformer',
          '🔄 Bidirectional: sees context from both sides',
          '🎭 Pre-training: MLM + NSP',
          '🏆 SOTA on many NLU benchmarks',
        ],
        howItWorks: 'Unlike GPT, BERT uses encoder (bidirectional attention). Pre-training tasks: 1) MLM (Masked Language Model): mask 15% of tokens, model predicts them. 2) NSP (Next Sentence Prediction): predicts if sentence B follows A. Fine-tuning: add classification head for specific task (sentiment, NER, QA). [CLS] token aggregates information from entire text. BERT-base: 12 layers, 110M parameters. RoBERTa, ALBERT, DeBERTa — improved variants.',
      },
    },
  },
  {
    id: 'clip',
    position: { x: 0, y: 0 },
    type: 'custom',
    data: {
      emoji: '🔗',
      level: 'implementation',
      ru: {
        label: 'CLIP',
        description: 'Contrastive Language-Image Pre-training — связывает изображения и текст в общем пространстве.',
        keyPoints: [
          '🖼️ + 📝 Мультимодальная модель',
          '📊 Contrastive learning на 400M пар',
          '🎯 Zero-shot классификация изображений',
          '🎨 Основа для Stable Diffusion, DALL-E',
        ],
        howItWorks: 'Два энкодера: Image Encoder (ViT или ResNet) и Text Encoder (Transformer). Обучение: на парах (изображение, текстовое описание) из интернета. Contrastive loss: максимизирует сходство правильных пар, минимизирует для неправильных. В batch из N пар создаётся NxN матрица сходства. После обучения: можно сравнить изображение с любым текстом! Zero-shot: "фото кота" vs "фото собаки" — выбираем класс с максимальным сходством. CLIP используется в text-to-image моделях для направления генерации по текстовому промпту.',
      },
      en: {
        label: 'CLIP',
        description: 'Contrastive Language-Image Pre-training — connects images and text in shared space.',
        keyPoints: [
          '🖼️ + 📝 Multimodal model',
          '📊 Contrastive learning on 400M pairs',
          '🎯 Zero-shot image classification',
          '🎨 Foundation for Stable Diffusion, DALL-E',
        ],
        howItWorks: 'Two encoders: Image Encoder (ViT or ResNet) and Text Encoder (Transformer). Training: on (image, text description) pairs from internet. Contrastive loss: maximizes similarity of correct pairs, minimizes for incorrect. In batch of N pairs creates NxN similarity matrix. After training: can compare image with any text! Zero-shot: "photo of cat" vs "photo of dog" — choose class with max similarity. CLIP used in text-to-image models to guide generation by text prompt.',
      },
    },
  },

  // ========== MORE IMPLEMENTATIONS ==========
  {
    id: 'vit',
    position: { x: 0, y: 0 },
    type: 'custom',
    data: {
      emoji: '🔲',
      level: 'algorithm',
      ru: {
        label: 'Vision Transformer',
        description: 'ViT — применение архитектуры трансформера к изображениям через разбиение на патчи.',
        keyPoints: [
          '🧩 Изображение → патчи 16x16 → токены',
          '👁️ Self-attention между патчами',
          '🚀 Превосходит CNN на больших данных',
          '📊 Требует много данных для pre-training',
        ],
        howItWorks: 'Изображение 224x224 разбивается на патчи 16x16 = 196 патчей. Каждый патч flatten\'ится и проецируется в embedding. Добавляется positional encoding и [CLS] токен. Стандартный Transformer encoder обрабатывает последовательность патчей. [CLS] токен используется для классификации. Без inductive bias CNN (локальность, трансляционная инвариантность), поэтому требует больше данных. Pre-training на ImageNet-21k (14M), затем fine-tuning.',
      },
      en: {
        label: 'Vision Transformer',
        description: 'ViT — applying transformer architecture to images by splitting into patches.',
        keyPoints: [
          '🧩 Image → 16x16 patches → tokens',
          '👁️ Self-attention between patches',
          '🚀 Outperforms CNN on large data',
          '📊 Requires lots of data for pre-training',
        ],
        howItWorks: 'Image 224x224 split into 16x16 patches = 196 patches. Each patch flattened and projected to embedding. Positional encoding and [CLS] token added. Standard Transformer encoder processes patch sequence. [CLS] token used for classification. Without CNN inductive bias (locality, translation invariance), so needs more data. Pre-training on ImageNet-21k (14M), then fine-tuning.',
      },
    },
  },
  {
    id: 'word2vec',
    position: { x: 0, y: 0 },
    type: 'custom',
    data: {
      emoji: '📝',
      level: 'algorithm',
      ru: {
        label: 'Word2Vec',
        description: 'Алгоритм создания векторных представлений слов на основе контекста.',
        keyPoints: [
          '📊 Слово → вектор 100-300 размерности',
          '🔄 CBOW vs Skip-gram архитектуры',
          '➕ king - man + woman ≈ queen',
          '📅 Google, 2013 — прорыв в NLP',
        ],
        howItWorks: 'Две архитектуры: CBOW (Continuous Bag of Words): предсказывает слово по контексту. Skip-gram: предсказывает контекст по слову. Обучение: sliding window по тексту, negative sampling для эффективности. Результат: слова с похожим контекстом имеют близкие векторы. Семантическая арифметика: vector("king") - vector("man") + vector("woman") ≈ vector("queen"). Ограничение: один вектор на слово, не учитывает полисемию (bank = банк или берег).',
      },
      en: {
        label: 'Word2Vec',
        description: 'Algorithm for creating word vector representations based on context.',
        keyPoints: [
          '📊 Word → vector 100-300 dimensions',
          '🔄 CBOW vs Skip-gram architectures',
          '➕ king - man + woman ≈ queen',
          '📅 Google, 2013 — NLP breakthrough',
        ],
        howItWorks: 'Two architectures: CBOW (Continuous Bag of Words): predicts word from context. Skip-gram: predicts context from word. Training: sliding window over text, negative sampling for efficiency. Result: words with similar context have close vectors. Semantic arithmetic: vector("king") - vector("man") + vector("woman") ≈ vector("queen"). Limitation: one vector per word, doesn\'t handle polysemy (bank = financial or river).',
      },
    },
  },
  {
    id: 'rag',
    position: { x: 0, y: 0 },
    type: 'custom',
    data: {
      emoji: '🔍',
      level: 'method',
      ru: {
        label: 'RAG',
        description: 'Retrieval-Augmented Generation — дополнение LLM внешними знаниями через поиск.',
        keyPoints: [
          '🔎 Retriever находит релевантные документы',
          '📝 Generator использует их как контекст',
          '🧠 Решает проблему устаревших знаний LLM',
          '💼 Применение: чат-боты, QA системы',
        ],
        howItWorks: 'Пайплайн: 1) Запрос пользователя → embedding 2) Поиск похожих документов в vector DB (FAISS, Pinecone) 3) Top-K документов добавляются в prompt 4) LLM генерирует ответ с учётом контекста. Преимущества: актуальная информация, меньше галлюцинаций, возможность цитирования источников. Chunking: документы разбиваются на части ~500 токенов. Reranking: дополнительная фильтрация найденных документов.',
      },
      en: {
        label: 'RAG',
        description: 'Retrieval-Augmented Generation — augmenting LLM with external knowledge via search.',
        keyPoints: [
          '🔎 Retriever finds relevant documents',
          '📝 Generator uses them as context',
          '🧠 Solves LLM outdated knowledge problem',
          '💼 Applications: chatbots, QA systems',
        ],
        howItWorks: 'Pipeline: 1) User query → embedding 2) Search similar docs in vector DB (FAISS, Pinecone) 3) Top-K docs added to prompt 4) LLM generates answer with context. Benefits: up-to-date info, fewer hallucinations, source citations. Chunking: documents split into ~500 token parts. Reranking: additional filtering of retrieved docs.',
      },
    },
  },
  {
    id: 'finetuning',
    position: { x: 0, y: 0 },
    type: 'custom',
    data: {
      emoji: '🎯',
      level: 'method',
      ru: {
        label: 'Fine-tuning',
        description: 'Метод дообучения предобученной модели на специфичной задаче.',
        keyPoints: [
          '🔄 Pre-trained → Fine-tuned на своих данных',
          '📉 Меньше данных чем обучение с нуля',
          '🎛️ Варианты: full, LoRA, prefix-tuning',
          '⚠️ Риск catastrophic forgetting',
        ],
        howItWorks: 'Full fine-tuning: обновляем все веса модели на новых данных. Дорого для больших моделей. LoRA (Low-Rank Adaptation): добавляем маленькие trainable матрицы к замороженным весам. A×B где A и B — низкоранговые. Эффективно: 0.1% параметров. Prefix-tuning: обучаем только "виртуальные токены" в начале. Prompt-tuning: обучаем soft prompt. RLHF: fine-tuning с reward model на основе человеческих предпочтений.',
      },
      en: {
        label: 'Fine-tuning',
        description: 'Method of adapting a pre-trained model to a specific task.',
        keyPoints: [
          '🔄 Pre-trained → Fine-tuned on your data',
          '📉 Less data than training from scratch',
          '🎛️ Variants: full, LoRA, prefix-tuning',
          '⚠️ Risk of catastrophic forgetting',
        ],
        howItWorks: 'Full fine-tuning: update all model weights on new data. Expensive for large models. LoRA (Low-Rank Adaptation): add small trainable matrices to frozen weights. A×B where A and B are low-rank. Efficient: 0.1% parameters. Prefix-tuning: train only "virtual tokens" at the start. Prompt-tuning: train soft prompt. RLHF: fine-tuning with reward model based on human preferences.',
      },
    },
  },
  {
    id: 'dropout',
    position: { x: 0, y: 0 },
    type: 'custom',
    data: {
      emoji: '🎲',
      level: 'algorithm',
      ru: {
        label: 'Dropout',
        description: 'Техника регуляризации — случайное "выключение" нейронов при обучении.',
        keyPoints: [
          '🎯 Предотвращает переобучение',
          '📊 Обычно p = 0.1-0.5',
          '🔄 При inference масштабируем веса',
          '🧠 Эффект: ансамбль подсетей',
        ],
        howItWorks: 'При каждом forward pass случайно обнуляем p% нейронов. Разные нейроны при каждом batch. Это заставляет сеть не полагаться на конкретные нейроны — учит избыточные представления. При inference используем все нейроны, но умножаем на (1-p) для корректного масштаба. Или inverted dropout: при обучении делим на (1-p), при inference ничего не делаем. Интерпретация: обучаем экспоненциально много подсетей, inference — усреднение.',
      },
      en: {
        label: 'Dropout',
        description: 'Regularization technique — randomly "turning off" neurons during training.',
        keyPoints: [
          '🎯 Prevents overfitting',
          '📊 Usually p = 0.1-0.5',
          '🔄 Scale weights at inference',
          '🧠 Effect: ensemble of subnetworks',
        ],
        howItWorks: 'Each forward pass randomly zeros p% of neurons. Different neurons each batch. Forces network not to rely on specific neurons — learns redundant representations. At inference use all neurons but multiply by (1-p) for correct scale. Or inverted dropout: divide by (1-p) at training, nothing at inference. Interpretation: train exponentially many subnetworks, inference — averaging.',
      },
    },
  },
  {
    id: 'batchnorm',
    position: { x: 0, y: 0 },
    type: 'custom',
    data: {
      emoji: '📏',
      level: 'algorithm',
      ru: {
        label: 'Batch Normalization',
        description: 'Нормализация активаций по batch для стабилизации и ускорения обучения.',
        keyPoints: [
          '📊 Нормализует mean=0, std=1 по batch',
          '🎛️ Learnable γ и β параметры',
          '⚡ Позволяет выше learning rate',
          '🔄 При inference использует running stats',
        ],
        howItWorks: 'Для каждого batch: μ = mean(x), σ² = var(x). Нормализация: x̂ = (x - μ) / √(σ² + ε). Scale и shift: y = γx̂ + β (learnable). Зачем γ и β? Позволяют сети "отменить" нормализацию если нужно. При обучении копим running mean/var. При inference используем running stats (не batch stats). Проблемы: зависит от batch size, не работает для RNN. Альтернативы: LayerNorm (по features), GroupNorm, InstanceNorm.',
      },
      en: {
        label: 'Batch Normalization',
        description: 'Normalizing activations across batch to stabilize and speed up training.',
        keyPoints: [
          '📊 Normalizes mean=0, std=1 across batch',
          '🎛️ Learnable γ and β parameters',
          '⚡ Allows higher learning rate',
          '🔄 Uses running stats at inference',
        ],
        howItWorks: 'For each batch: μ = mean(x), σ² = var(x). Normalization: x̂ = (x - μ) / √(σ² + ε). Scale and shift: y = γx̂ + β (learnable). Why γ and β? Allow network to "undo" normalization if needed. During training accumulate running mean/var. At inference use running stats (not batch stats). Issues: depends on batch size, doesn\'t work for RNN. Alternatives: LayerNorm (across features), GroupNorm, InstanceNorm.',
      },
    },
  },
  {
    id: 'adam',
    position: { x: 0, y: 0 },
    type: 'custom',
    data: {
      emoji: '🏃',
      level: 'algorithm',
      ru: {
        label: 'Adam Optimizer',
        description: 'Adaptive Moment Estimation — оптимизатор с адаптивным learning rate для каждого параметра.',
        keyPoints: [
          '📊 Комбинация Momentum + RMSprop',
          '🎯 Адаптивный LR для каждого веса',
          '⚡ Быстрая сходимость',
          '🔧 Default: lr=0.001, β1=0.9, β2=0.999',
        ],
        howItWorks: 'Хранит два момента: m (среднее градиентов, как momentum) и v (среднее квадратов градиентов, как RMSprop). m_t = β1·m_{t-1} + (1-β1)·g_t, v_t = β2·v_{t-1} + (1-β2)·g_t². Bias correction: m̂ = m/(1-β1^t), v̂ = v/(1-β2^t). Update: θ = θ - lr·m̂/(√v̂ + ε). Адаптивность: параметры с маленькими градиентами получают большие шаги и наоборот. AdamW: исправленный weight decay (L2 регуляризация отдельно от Adam).',
      },
      en: {
        label: 'Adam Optimizer',
        description: 'Adaptive Moment Estimation — optimizer with adaptive learning rate per parameter.',
        keyPoints: [
          '📊 Combines Momentum + RMSprop',
          '🎯 Adaptive LR for each weight',
          '⚡ Fast convergence',
          '🔧 Default: lr=0.001, β1=0.9, β2=0.999',
        ],
        howItWorks: 'Stores two moments: m (gradient average, like momentum) and v (squared gradient average, like RMSprop). m_t = β1·m_{t-1} + (1-β1)·g_t, v_t = β2·v_{t-1} + (1-β2)·g_t². Bias correction: m̂ = m/(1-β1^t), v̂ = v/(1-β2^t). Update: θ = θ - lr·m̂/(√v̂ + ε). Adaptivity: parameters with small gradients get larger steps and vice versa. AdamW: corrected weight decay (L2 regularization separate from Adam).',
      },
    },
  },
  {
    id: 'agents',
    position: { x: 0, y: 0 },
    type: 'custom',
    data: {
      emoji: '🤖',
      level: 'implementation',
      ru: {
        label: 'AI Agents',
        description: 'Автономные системы на базе LLM, способные планировать и выполнять действия.',
        keyPoints: [
          '🧠 LLM как "мозг" для рассуждений',
          '🔧 Tools: поиск, код, API, браузер',
          '📋 Planning: разбиение задачи на шаги',
          '🔄 ReAct: Reasoning + Acting цикл',
        ],
        howItWorks: 'Архитектура агента: 1) Perception — получение входных данных 2) Planning — LLM разбивает задачу на подзадачи 3) Action — выбор и вызов tool 4) Observation — анализ результата 5) Repeat. ReAct паттерн: Thought → Action → Observation → Thought... Memory: short-term (контекст) и long-term (vector DB). Примеры: AutoGPT, LangChain agents, OpenAI Assistants. Проблемы: галлюцинации, застревание в циклах, безопасность.',
      },
      en: {
        label: 'AI Agents',
        description: 'Autonomous LLM-based systems capable of planning and executing actions.',
        keyPoints: [
          '🧠 LLM as "brain" for reasoning',
          '🔧 Tools: search, code, API, browser',
          '📋 Planning: breaking task into steps',
          '🔄 ReAct: Reasoning + Acting cycle',
        ],
        howItWorks: 'Agent architecture: 1) Perception — receive input 2) Planning — LLM breaks task into subtasks 3) Action — select and call tool 4) Observation — analyze result 5) Repeat. ReAct pattern: Thought → Action → Observation → Thought... Memory: short-term (context) and long-term (vector DB). Examples: AutoGPT, LangChain agents, OpenAI Assistants. Issues: hallucinations, getting stuck in loops, safety.',
      },
    },
  },

  // ========== MORE ML ALGORITHMS ==========
  {
    id: 'logreg',
    position: { x: 0, y: 0 },
    type: 'custom',
    data: {
      emoji: '📈',
      level: 'algorithm',
      ru: {
        label: 'Logistic Regression',
        description: 'Алгоритм бинарной классификации через сигмоиду.',
        keyPoints: [
          '🎯 Вероятность класса: 0-1',
          '📊 Sigmoid: σ(z) = 1/(1+e^(-z))',
          '📉 Loss: Binary Cross-Entropy',
          '⚡ Быстрый, интерпретируемый',
        ],
        howItWorks: 'Линейная комбинация признаков z = wx + b пропускается через сигмоиду: P(y=1|x) = σ(z). Сигмоида сжимает любое число в диапазон (0,1) — интерпретируем как вероятность. Порог обычно 0.5: если P > 0.5 → класс 1. Обучение: минимизация BCE loss = -[y·log(p) + (1-y)·log(1-p)]. Для многоклассовой: Softmax Regression (softmax вместо sigmoid).',
      },
      en: {
        label: 'Logistic Regression',
        description: 'Binary classification algorithm using sigmoid function.',
        keyPoints: [
          '🎯 Class probability: 0-1',
          '📊 Sigmoid: σ(z) = 1/(1+e^(-z))',
          '📉 Loss: Binary Cross-Entropy',
          '⚡ Fast, interpretable',
        ],
        howItWorks: 'Linear combination z = wx + b passed through sigmoid: P(y=1|x) = σ(z). Sigmoid squashes any number to (0,1) range — interpret as probability. Threshold usually 0.5: if P > 0.5 → class 1. Training: minimize BCE loss = -[y·log(p) + (1-y)·log(1-p)]. For multiclass: Softmax Regression (softmax instead of sigmoid).',
      },
    },
  },
  {
    id: 'xgboost',
    position: { x: 0, y: 0 },
    type: 'custom',
    data: {
      emoji: '🚀',
      level: 'algorithm',
      ru: {
        label: 'XGBoost',
        description: 'Extreme Gradient Boosting — мощный ансамблевый алгоритм на деревьях.',
        keyPoints: [
          '🌳 Gradient Boosting на деревьях',
          '🏆 Топ алгоритм для табличных данных',
          '⚡ Регуляризация + параллелизация',
          '📊 Kaggle killer',
        ],
        howItWorks: 'Gradient Boosting: последовательно строим деревья, каждое исправляет ошибки предыдущих. XGBoost добавляет: 1) L1/L2 регуляризацию для контроля сложности 2) Оптимизированный алгоритм поиска split 3) Обработку пропусков 4) Параллельное построение деревьев. Loss оптимизируется с помощью градиентного спуска по функционалу. Гиперпараметры: n_estimators, max_depth, learning_rate, subsample. Альтернативы: LightGBM (быстрее), CatBoost (категориальные фичи).',
      },
      en: {
        label: 'XGBoost',
        description: 'Extreme Gradient Boosting — powerful tree-based ensemble algorithm.',
        keyPoints: [
          '🌳 Gradient Boosting on trees',
          '🏆 Top algorithm for tabular data',
          '⚡ Regularization + parallelization',
          '📊 Kaggle killer',
        ],
        howItWorks: 'Gradient Boosting: sequentially build trees, each corrects errors of previous. XGBoost adds: 1) L1/L2 regularization for complexity control 2) Optimized split finding algorithm 3) Missing value handling 4) Parallel tree building. Loss optimized via gradient descent on functional. Hyperparameters: n_estimators, max_depth, learning_rate, subsample. Alternatives: LightGBM (faster), CatBoost (categorical features).',
      },
    },
  },
  {
    id: 'autoencoder',
    position: { x: 0, y: 0 },
    type: 'custom',
    data: {
      emoji: '🔄',
      level: 'algorithm',
      ru: {
        label: 'Autoencoder',
        description: 'Нейросеть, обучающаяся сжимать и восстанавливать данные.',
        keyPoints: [
          '📦 Encoder: данные → latent space',
          '📤 Decoder: latent → реконструкция',
          '🎯 Loss: reconstruction error',
          '🔍 Применение: сжатие, denoising, anomaly detection',
        ],
        howItWorks: 'Архитектура песочных часов: input → encoder (сжатие) → bottleneck (latent) → decoder (восстановление) → output. Цель: output ≈ input. Bottleneck заставляет сеть учить важные признаки. Denoising AE: добавляем шум ко входу, учимся восстанавливать чистый. Sparse AE: регуляризация на активации. Contractive AE: штраф на чувствительность к входу. Variational AE (VAE): latent как распределение.',
      },
      en: {
        label: 'Autoencoder',
        description: 'Neural network learning to compress and reconstruct data.',
        keyPoints: [
          '📦 Encoder: data → latent space',
          '📤 Decoder: latent → reconstruction',
          '🎯 Loss: reconstruction error',
          '🔍 Uses: compression, denoising, anomaly detection',
        ],
        howItWorks: 'Hourglass architecture: input → encoder (compress) → bottleneck (latent) → decoder (reconstruct) → output. Goal: output ≈ input. Bottleneck forces network to learn important features. Denoising AE: add noise to input, learn to reconstruct clean. Sparse AE: regularization on activations. Contractive AE: penalty on input sensitivity. Variational AE (VAE): latent as distribution.',
      },
    },
  },
  {
    id: 'unet',
    position: { x: 0, y: 0 },
    type: 'custom',
    data: {
      emoji: '🏥',
      level: 'implementation',
      ru: {
        label: 'U-Net',
        description: 'Архитектура для сегментации с encoder-decoder и skip connections.',
        keyPoints: [
          '🏗️ U-образная структура',
          '🔗 Skip connections сохраняют детали',
          '🏥 Изначально для медицинских изображений',
          '✂️ Pixel-level predictions',
        ],
        howItWorks: 'Encoder (левая часть U): свёртки + pooling, сжимаем пространственно, увеличиваем каналы. Decoder (правая часть): upsampling + свёртки, восстанавливаем разрешение. Skip connections: копируем feature maps с encoder на decoder того же уровня. Это сохраняет мелкие детали которые теряются при сжатии. Финальный слой: 1x1 conv для карты классов. Модификации: U-Net++, Attention U-Net, ResUNet.',
      },
      en: {
        label: 'U-Net',
        description: 'Segmentation architecture with encoder-decoder and skip connections.',
        keyPoints: [
          '🏗️ U-shaped structure',
          '🔗 Skip connections preserve details',
          '🏥 Originally for medical images',
          '✂️ Pixel-level predictions',
        ],
        howItWorks: 'Encoder (left part of U): convolutions + pooling, compress spatially, increase channels. Decoder (right part): upsampling + convolutions, restore resolution. Skip connections: copy feature maps from encoder to decoder at same level. This preserves fine details lost during compression. Final layer: 1x1 conv for class map. Variants: U-Net++, Attention U-Net, ResUNet.',
      },
    },
  },
  {
    id: 'stable-diffusion',
    position: { x: 0, y: 0 },
    type: 'custom',
    data: {
      emoji: '🎨',
      level: 'implementation',
      ru: {
        label: 'Stable Diffusion',
        description: 'Открытая модель text-to-image на основе latent diffusion.',
        keyPoints: [
          '🖼️ Text → Image генерация',
          '📦 Работает в latent space (быстрее)',
          '🔓 Open source, можно запустить локально',
          '🎛️ ControlNet, LoRA для кастомизации',
        ],
        howItWorks: 'Latent Diffusion: вместо работы с пикселями работаем с latent vectors (VAE encoder сжимает, decoder восстанавливает). Текстовый prompt → CLIP text encoder → conditioning. U-Net предсказывает шум на каждом шаге. Classifier-free guidance: усиливает соответствие промпту. Sampling: начинаем с шума, итеративно убираем. SDXL: улучшенная версия с двумя text encoders. ControlNet: дополнительный контроль через позы, edges, depth maps.',
      },
      en: {
        label: 'Stable Diffusion',
        description: 'Open-source text-to-image model based on latent diffusion.',
        keyPoints: [
          '🖼️ Text → Image generation',
          '📦 Works in latent space (faster)',
          '🔓 Open source, can run locally',
          '🎛️ ControlNet, LoRA for customization',
        ],
        howItWorks: 'Latent Diffusion: instead of working with pixels, work with latent vectors (VAE encoder compresses, decoder reconstructs). Text prompt → CLIP text encoder → conditioning. U-Net predicts noise at each step. Classifier-free guidance: strengthens prompt adherence. Sampling: start from noise, iteratively remove. SDXL: improved version with two text encoders. ControlNet: additional control via poses, edges, depth maps.',
      },
    },
  },
  {
    id: 'prompt-eng',
    position: { x: 0, y: 0 },
    type: 'custom',
    data: {
      emoji: '✍️',
      level: 'method',
      ru: {
        label: 'Prompt Engineering',
        description: 'Искусство создания эффективных промптов для LLM.',
        keyPoints: [
          '📝 Структура: роль, контекст, задача, формат',
          '🎯 Few-shot: примеры в промпте',
          '🔄 Итеративное улучшение',
          '⚠️ Важно для качества output',
        ],
        howItWorks: 'Техники: 1) Zero-shot: просто описываем задачу 2) Few-shot: даём примеры input→output 3) Chain of Thought: просим думать шаг за шагом 4) Role prompting: "Ты эксперт в..." 5) Format specification: "Ответь в формате JSON". System prompt задаёт поведение. Temperature влияет на креативность. Negative prompting: что НЕ делать. Для стабильности: структурированный output (JSON, XML).',
      },
      en: {
        label: 'Prompt Engineering',
        description: 'Art of crafting effective prompts for LLMs.',
        keyPoints: [
          '📝 Structure: role, context, task, format',
          '🎯 Few-shot: examples in prompt',
          '🔄 Iterative improvement',
          '⚠️ Critical for output quality',
        ],
        howItWorks: 'Techniques: 1) Zero-shot: just describe task 2) Few-shot: give input→output examples 3) Chain of Thought: ask to think step by step 4) Role prompting: "You are an expert in..." 5) Format specification: "Reply in JSON format". System prompt sets behavior. Temperature affects creativity. Negative prompting: what NOT to do. For stability: structured output (JSON, XML).',
      },
    },
  },
  {
    id: 'cot',
    position: { x: 0, y: 0 },
    type: 'custom',
    data: {
      emoji: '🔗',
      level: 'method',
      ru: {
        label: 'Chain of Thought',
        description: 'Техника промптинга для пошагового рассуждения LLM.',
        keyPoints: [
          '🧠 "Думай шаг за шагом"',
          '📈 Улучшает reasoning на сложных задачах',
          '🔢 Особенно для математики и логики',
          '💡 Zero-shot CoT: просто добавь фразу',
        ],
        howItWorks: 'Стандартный промпт: "Реши задачу: ..." → модель сразу даёт ответ (часто неверный для сложных задач). CoT промпт: "Реши задачу, думая шаг за шагом: ..." → модель показывает рассуждения → точнее на многошаговых задачах. Few-shot CoT: даём примеры с рассуждениями. Self-consistency: генерируем несколько CoT, выбираем majority answer. Tree of Thought: исследуем разные пути рассуждений. Работает благодаря тому что модель "видит" промежуточные шаги.',
      },
      en: {
        label: 'Chain of Thought',
        description: 'Prompting technique for step-by-step LLM reasoning.',
        keyPoints: [
          '🧠 "Think step by step"',
          '📈 Improves reasoning on complex tasks',
          '🔢 Especially for math and logic',
          '💡 Zero-shot CoT: just add the phrase',
        ],
        howItWorks: 'Standard prompt: "Solve: ..." → model gives answer directly (often wrong for complex tasks). CoT prompt: "Solve, thinking step by step: ..." → model shows reasoning → more accurate on multi-step tasks. Few-shot CoT: give examples with reasoning. Self-consistency: generate multiple CoTs, pick majority answer. Tree of Thought: explore different reasoning paths. Works because model "sees" intermediate steps.',
      },
    },
  },
  {
    id: 'moe',
    position: { x: 0, y: 0 },
    type: 'custom',
    data: {
      emoji: '🎛️',
      level: 'algorithm',
      ru: {
        label: 'Mixture of Experts',
        description: 'Архитектура с множеством специализированных подсетей и роутером.',
        keyPoints: [
          '🧠 N экспертов, активируются K',
          '🚦 Router выбирает экспертов',
          '⚡ Sparse: меньше compute при inference',
          '📈 GPT-4, Mixtral используют MoE',
        ],
        howItWorks: 'Вместо одного большого FFN — N маленьких "экспертов". Router (обучаемый) для каждого токена выбирает top-K экспертов. Только выбранные эксперты активируются → sparse computation. Например: 8 экспертов, активируем 2 → используем 25% параметров. Load balancing loss: чтобы эксперты использовались равномерно. Преимущества: можем масштабировать параметры без пропорционального роста compute. Mixtral 8x7B: 8 экспертов по 7B, активно 2, качество как у 70B модели.',
      },
      en: {
        label: 'Mixture of Experts',
        description: 'Architecture with multiple specialized subnetworks and a router.',
        keyPoints: [
          '🧠 N experts, K activated',
          '🚦 Router selects experts',
          '⚡ Sparse: less compute at inference',
          '📈 GPT-4, Mixtral use MoE',
        ],
        howItWorks: 'Instead of one large FFN — N small "experts". Router (learnable) for each token selects top-K experts. Only selected experts activate → sparse computation. Example: 8 experts, activate 2 → use 25% parameters. Load balancing loss: so experts are used evenly. Benefits: can scale parameters without proportional compute growth. Mixtral 8x7B: 8 experts of 7B each, 2 active, quality like 70B model.',
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
  
  // Computer Vision branch
  { id: 'ai-cv', source: 'ai', target: 'cv', animated: true },
  { id: 'cv-detection', source: 'cv', target: 'obj-detection' },
  { id: 'cv-classification', source: 'cv', target: 'img-classification' },
  { id: 'cv-segmentation', source: 'cv', target: 'segmentation' },
  { id: 'detection-yolo', source: 'obj-detection', target: 'yolo' },
  { id: 'classification-resnet', source: 'img-classification', target: 'resnet' },
  
  // LLM implementations
  { id: 'llm-gpt', source: 'llm', target: 'gpt' },
  { id: 'trans-bert', source: 'transformer', target: 'bert' },
  
  // CLIP - connects CV and NLP
  { id: 'cv-clip', source: 'cv', target: 'clip', style: { strokeDasharray: '5,5' } },
  { id: 'nlp-clip', source: 'nlp', target: 'clip', style: { strokeDasharray: '5,5' } },
  
  // New nodes
  { id: 'cv-vit', source: 'cv', target: 'vit' },
  { id: 'emb-word2vec', source: 'embeddings', target: 'word2vec' },
  { id: 'llm-rag', source: 'llm', target: 'rag' },
  { id: 'llm-finetuning', source: 'llm', target: 'finetuning' },
  { id: 'nn-dropout', source: 'nn', target: 'dropout' },
  { id: 'nn-batchnorm', source: 'nn', target: 'batchnorm' },
  { id: 'nn-adam', source: 'nn', target: 'adam' },
  { id: 'llm-agents', source: 'llm', target: 'agents' },
  
  // New ML algorithms
  { id: 'sup-logreg', source: 'supervised', target: 'logreg' },
  { id: 'sup-xgboost', source: 'supervised', target: 'xgboost' },
  
  // New DL
  { id: 'dl-autoencoder', source: 'dl', target: 'autoencoder' },
  { id: 'seg-unet', source: 'segmentation', target: 'unet' },
  { id: 'diff-sd', source: 'diffusion', target: 'stable-diffusion' },
  { id: 'dl-moe', source: 'dl', target: 'moe' },
  
  // NLP/LLM techniques
  { id: 'llm-prompt', source: 'llm', target: 'prompt-eng' },
  { id: 'prompt-cot', source: 'prompt-eng', target: 'cot' },
  
  // Cross-connections (dashed = связь между ветками)
  { id: 'trans-llm', source: 'transformer', target: 'llm', style: { strokeDasharray: '5,5' } },
  { id: 'sup-nn', source: 'supervised', target: 'nn', style: { strokeDasharray: '5,5' } },
  { id: 'tree-rf', source: 'decision-tree', target: 'random-forest', style: { strokeDasharray: '5,5' } },
  { id: 'attn-llm', source: 'attention', target: 'llm', style: { strokeDasharray: '5,5' } },
  { id: 'cnn-cv', source: 'cnn', target: 'cv', style: { strokeDasharray: '5,5' } },
  { id: 'cnn-resnet', source: 'cnn', target: 'resnet', style: { strokeDasharray: '5,5' } },
  { id: 'trans-vit', source: 'transformer', target: 'vit', style: { strokeDasharray: '5,5' } },
  { id: 'rag-agents', source: 'rag', target: 'agents', style: { strokeDasharray: '5,5' } },
  { id: 'moe-gpt', source: 'moe', target: 'gpt', style: { strokeDasharray: '5,5' } },
  { id: 'vae-autoenc', source: 'vae', target: 'autoencoder', style: { strokeDasharray: '5,5' } },
];
