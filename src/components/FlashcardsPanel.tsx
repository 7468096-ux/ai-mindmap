'use client';

import { useState, useEffect } from 'react';
import { Language } from '@/data/nodes';

interface Flashcard {
  id: string;
  front: {
    en: string;
    ru: string;
  };
  back: {
    en: string;
    ru: string;
  };
  emoji: string;
}

interface Props {
  lang: Language;
}

// Selected key algorithm cards from nodes data
const flashcards: Flashcard[] = [
  {
    id: 'linear-reg',
    emoji: '📈',
    front: { en: 'Linear Regression', ru: 'Линейная регрессия' },
    back: { 
      en: 'Simplest algorithm for predicting continuous values through linear relationship: y = wx + b. Minimizes MSE.',
      ru: 'Простейший алгоритм для предсказания непрерывных значений через линейную зависимость: y = wx + b. Минимизирует MSE.'
    }
  },
  {
    id: 'decision-tree',
    emoji: '🌳',
    front: { en: 'Decision Tree', ru: 'Дерево решений' },
    back: { 
      en: 'Algorithm splitting data through sequence of conditions (if-else). Each node = split condition, leaves = prediction.',
      ru: 'Алгоритм, разбивающий данные через последовательность условий (if-else). Каждый узел = условие, листья = предсказание.'
    }
  },
  {
    id: 'random-forest',
    emoji: '🌲',
    front: { en: 'Random Forest', ru: 'Random Forest' },
    back: { 
      en: 'Ensemble of decision trees voting for final result. Uses 100-1000 trees with random samples. Robust to overfitting.',
      ru: 'Ансамбль деревьев решений, голосующих за итоговый результат. Использует 100-1000 деревьев на случайных выборках. Устойчив к переобучению.'
    }
  },
  {
    id: 'svm',
    emoji: '⚔️',
    front: { en: 'SVM', ru: 'SVM' },
    back: { 
      en: 'Support Vector Machine — finds optimal hyperplane to separate classes. Kernel trick for nonlinear boundaries.',
      ru: 'Support Vector Machine — находит оптимальную гиперплоскость для разделения классов. Kernel trick для нелинейных границ.'
    }
  },
  {
    id: 'kmeans',
    emoji: '🎯',
    front: { en: 'K-Means', ru: 'K-Means' },
    back: { 
      en: 'Clustering algorithm grouping data into K clusters by proximity to centroids. Iterative: assign → recalculate centers.',
      ru: 'Алгоритм кластеризации, группирующий данные в K кластеров по близости к центроидам. Итеративно: назначить → пересчитать центры.'
    }
  },
  {
    id: 'pca',
    emoji: '📉',
    front: { en: 'PCA', ru: 'PCA' },
    back: { 
      en: 'Principal Component Analysis — dimensionality reduction preserving maximum information. Finds main directions of variation.',
      ru: 'Principal Component Analysis — снижение размерности с сохранением максимума информации. Находит главные направления вариации.'
    }
  },
  {
    id: 'qlearning',
    emoji: '🎰',
    front: { en: 'Q-Learning', ru: 'Q-Learning' },
    back: { 
      en: 'RL algorithm learning action-value function without environment model. Q(s,a) = expected reward. Uses ε-greedy for exploration.',
      ru: 'Алгоритм RL, обучающий функцию ценности действий без модели среды. Q(s,a) = ожидаемая награда. Использует ε-greedy для исследования.'
    }
  },
  {
    id: 'nn',
    emoji: '🔮',
    front: { en: 'Neural Networks', ru: 'Нейронные сети' },
    back: { 
      en: 'Connected artificial neurons transmitting signals. Each neuron: weighted sum + activation. Training via backpropagation.',
      ru: 'Связанные искусственные нейроны, передающие сигналы. Каждый нейрон: взвешенная сумма + активация. Обучение через backpropagation.'
    }
  },
  {
    id: 'cnn',
    emoji: '👁️',
    front: { en: 'CNN', ru: 'CNN' },
    back: { 
      en: 'Convolutional networks for grid-structured data. Convolution: sliding filter over image. Hierarchy: edges → shapes → objects.',
      ru: 'Свёрточные сети для данных с сеточной структурой. Свёртка: скользящий фильтр по изображению. Иерархия: края → формы → объекты.'
    }
  },
  {
    id: 'rnn',
    emoji: '🔁',
    front: { en: 'RNN', ru: 'RNN' },
    back: { 
      en: 'Recurrent networks processing sequences with "memory". Same layer applied at each step. Problem: vanishing gradient on long sequences.',
      ru: 'Рекуррентные сети, обрабатывающие последовательности с "памятью". Один слой на каждом шаге. Проблема: затухание градиентов на длинных последовательностях.'
    }
  },
  {
    id: 'lstm',
    emoji: '🧠',
    front: { en: 'LSTM', ru: 'LSTM' },
    back: { 
      en: 'Long Short-Term Memory — RNN with gates solving vanishing gradient. 3 gates: forget, input, output. Can remember hundreds of steps.',
      ru: 'Long Short-Term Memory — RNN с воротами, решающая проблему затухания градиентов. 3 ворот: forget, input, output. Может помнить сотни шагов.'
    }
  },
  {
    id: 'transformer',
    emoji: '⚡',
    front: { en: 'Transformer', ru: 'Transformer' },
    back: { 
      en: 'Architecture based on attention mechanism, processing sequences in parallel. Self-attention: each token "sees" all others. Foundation of modern NLP.',
      ru: 'Архитектура на механизме внимания, обрабатывающая последовательности параллельно. Self-attention: каждый токен "видит" все другие. Основа современного NLP.'
    }
  },
  {
    id: 'attention',
    emoji: '👁️',
    front: { en: 'Attention Mechanism', ru: 'Механизм Attention' },
    back: { 
      en: 'Mechanism allowing model to focus on relevant parts of input. Computes Query, Key, Value. Dynamic weights instead of fixed.',
      ru: 'Механизм, позволяющий модели фокусироваться на релевантных частях входа. Вычисляет Query, Key, Value. Динамические веса вместо фиксированных.'
    }
  },
  {
    id: 'gan',
    emoji: '🎭',
    front: { en: 'GAN', ru: 'GAN' },
    back: { 
      en: 'Generative Adversarial Network — two networks compete: generator creates fakes from noise, discriminator verifies. Zero-sum game.',
      ru: 'Generative Adversarial Network — две сети соревнуются: генератор создаёт фейки из шума, дискриминатор проверяет. Игра с нулевой суммой.'
    }
  },
  {
    id: 'vae',
    emoji: '🎲',
    front: { en: 'VAE', ru: 'VAE' },
    back: { 
      en: 'Variational Autoencoder — learns compressed representation + generates new samples. Encoder → latent space (μ, σ) → Decoder.',
      ru: 'Variational Autoencoder — учит сжатое представление + генерирует новые. Encoder → latent space (μ, σ) → Decoder.'
    }
  },
  {
    id: 'diffusion',
    emoji: '🌫️',
    front: { en: 'Diffusion Models', ru: 'Диффузионные модели' },
    back: { 
      en: 'Learn to gradually remove noise, generating data from pure noise. Forward: add noise. Reverse: remove noise (generation). SOTA for images.',
      ru: 'Учатся постепенно убирать шум, генерируя данные из чистого шума. Forward: добавляем шум. Reverse: убираем шум (генерация). SOTA для изображений.'
    }
  },
  {
    id: 'resnet',
    emoji: '🏗️',
    front: { en: 'ResNet', ru: 'ResNet' },
    back: { 
      en: 'Residual Network with skip connections enabling very deep networks. Learns F(x) + x instead of F(x). Solves vanishing gradient.',
      ru: 'Residual Network с skip connections, позволяющая обучать очень глубокие сети. Учит F(x) + x вместо F(x). Решает затухание градиентов.'
    }
  },
  {
    id: 'yolo',
    emoji: '⚡',
    front: { en: 'YOLO', ru: 'YOLO' },
    back: { 
      en: 'You Only Look Once — fast real-time object detector. Single pass = detect all objects. Divides image into grid, each cell predicts bbox + class.',
      ru: 'You Only Look Once — быстрый детектор объектов реального времени. Один проход = детекция всех объектов. Делит изображение на сетку, каждая ячейка предсказывает bbox + класс.'
    }
  },
  {
    id: 'vit',
    emoji: '🔲',
    front: { en: 'Vision Transformer', ru: 'Vision Transformer' },
    back: { 
      en: 'Applies transformer to images by splitting into patches. Image → 16×16 patches → tokens. Self-attention between patches. Outperforms CNN on large data.',
      ru: 'Применение трансформера к изображениям через разбиение на патчи. Изображение → патчи 16×16 → токены. Self-attention между патчами. Превосходит CNN на больших данных.'
    }
  },
  {
    id: 'llm',
    emoji: '🗣️',
    front: { en: 'LLM', ru: 'LLM' },
    back: { 
      en: 'Large Language Models — massive transformers trained on huge text corpora. Billions of parameters. Emergent abilities at scale. Examples: GPT-4, Claude.',
      ru: 'Большие языковые модели — масштабные трансформеры, обученные на огромных текстовых корпусах. Миллиарды параметров. Emergent abilities при масштабировании. Примеры: GPT-4, Claude.'
    }
  },
  {
    id: 'embeddings',
    emoji: '📐',
    front: { en: 'Embeddings', ru: 'Embeddings' },
    back: { 
      en: 'Vector representations of words/texts as points in multidimensional space. Similar concepts = nearby vectors. Used for search, RAG, clustering.',
      ru: 'Векторные представления слов/текстов как точки в многомерном пространстве. Похожие понятия = близкие векторы. Используются для поиска, RAG, кластеризации.'
    }
  },
  {
    id: 'tokenization',
    emoji: '✂️',
    front: { en: 'Tokenization', ru: 'Токенизация' },
    back: { 
      en: 'Splitting text into tokens (processing units). BPE algorithm: merges most frequent pairs. Rare words split into subwords, frequent stay whole.',
      ru: 'Разбиение текста на токены (единицы обработки). Алгоритм BPE: объединяет самые частые пары. Редкие слова разбиваются на подслова, частые остаются целыми.'
    }
  },
  {
    id: 'gpt',
    emoji: '💬',
    front: { en: 'GPT', ru: 'GPT' },
    back: { 
      en: 'Generative Pre-trained Transformer — decoder-only transformer. Training: next token prediction. Fine-tuned with RLHF for instruction following.',
      ru: 'Generative Pre-trained Transformer — decoder-only трансформер. Обучение: предсказание следующего токена. Fine-tuning через RLHF для следования инструкциям.'
    }
  },
  {
    id: 'bert',
    emoji: '🔤',
    front: { en: 'BERT', ru: 'BERT' },
    back: { 
      en: 'Bidirectional Encoder Representations from Transformers — encoder-only model. Bidirectional: sees context from both sides. Pre-trained on MLM + NSP.',
      ru: 'Bidirectional Encoder Representations from Transformers — encoder-only модель. Bidirectional: видит контекст с обеих сторон. Обучение на MLM + NSP.'
    }
  },
  {
    id: 'clip',
    emoji: '🔗',
    front: { en: 'CLIP', ru: 'CLIP' },
    back: { 
      en: 'Contrastive Language-Image Pre-training — connects images and text in shared space. Zero-shot classification. Foundation for Stable Diffusion, DALL-E.',
      ru: 'Contrastive Language-Image Pre-training — связывает изображения и текст в общем пространстве. Zero-shot классификация. Основа для Stable Diffusion, DALL-E.'
    }
  },
  {
    id: 'xgboost',
    emoji: '🚀',
    front: { en: 'XGBoost', ru: 'XGBoost' },
    back: { 
      en: 'eXtreme Gradient Boosting — optimized gradient boosting. Builds trees sequentially, each corrects previous errors. Fast, parallel, handles missing values.',
      ru: 'eXtreme Gradient Boosting — оптимизированный gradient boosting. Строит деревья последовательно, каждое исправляет ошибки предыдущего. Быстрый, параллельный, обрабатывает пропуски.'
    }
  },
  {
    id: 'logistic-reg',
    emoji: '📊',
    front: { en: 'Logistic Regression', ru: 'Логистическая регрессия' },
    back: { 
      en: 'Classification algorithm using sigmoid to output probabilities. Linear model: z = wx + b, then σ(z) → [0,1]. Binary or multiclass.',
      ru: 'Алгоритм классификации, использующий сигмоиду для вывода вероятностей. Линейная модель: z = wx + b, затем σ(z) → [0,1]. Бинарная или мультикласс.'
    }
  },
  {
    id: 'word2vec',
    emoji: '📝',
    front: { en: 'Word2Vec', ru: 'Word2Vec' },
    back: { 
      en: 'Algorithm learning word embeddings from context. CBOW: predict word from context. Skip-gram: predict context from word. "king - man + woman ≈ queen".',
      ru: 'Алгоритм обучения word embeddings из контекста. CBOW: предсказать слово по контексту. Skip-gram: предсказать контекст по слову. "king - man + woman ≈ queen".'
    }
  },
  {
    id: 'dropout',
    emoji: '🎲',
    front: { en: 'Dropout', ru: 'Dropout' },
    back: { 
      en: 'Regularization technique randomly dropping neurons during training. Forces network to be robust. Typically 20-50% drop rate. Prevents overfitting.',
      ru: 'Техника регуляризации, случайно отключающая нейроны во время обучения. Заставляет сеть быть устойчивой. Обычно 20-50% drop rate. Предотвращает переобучение.'
    }
  },
  {
    id: 'batch-norm',
    emoji: '⚖️',
    front: { en: 'Batch Normalization', ru: 'Batch Normalization' },
    back: { 
      en: 'Normalizes layer inputs to stabilize training. Computes mean and variance per batch. Allows higher learning rates. Reduces internal covariate shift.',
      ru: 'Нормализует входы слоёв для стабилизации обучения. Вычисляет среднее и дисперсию по батчу. Позволяет использовать более высокий learning rate. Уменьшает internal covariate shift.'
    }
  },
];

const STORAGE_KEY = 'ai-mindmap-flashcards';

export default function FlashcardsPanel({ lang }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<Set<string>>(new Set());
  const [deck, setDeck] = useState<Flashcard[]>(flashcards);
  const [showOnlyUnknown, setShowOnlyUnknown] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setKnownCards(new Set(data.known || []));
      } catch (e) {
        console.error('Failed to load flashcards progress:', e);
      }
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      known: Array.from(knownCards)
    }));
  }, [knownCards]);

  // Filter deck based on showOnlyUnknown
  useEffect(() => {
    if (showOnlyUnknown) {
      setDeck(flashcards.filter(card => !knownCards.has(card.id)));
      setCurrentIndex(0);
    } else {
      setDeck(flashcards);
    }
    setIsFlipped(false);
  }, [showOnlyUnknown, knownCards]);

  const texts = {
    en: {
      title: 'Flashcards',
      subtitle: 'Memorize AI concepts',
      progress: 'Progress',
      mastered: 'mastered',
      of: 'of',
      shuffle: 'Shuffle',
      showUnknown: 'Unknown only',
      showAll: 'Show all',
      knowIt: 'Know it',
      studyMore: 'Study more',
      clickToFlip: 'Click to flip',
      front: 'Front',
      back: 'Back',
      noDeck: 'No cards in deck',
      allMastered: 'All cards mastered! 🎉',
    },
    ru: {
      title: 'Карточки',
      subtitle: 'Запоминай AI концепции',
      progress: 'Прогресс',
      mastered: 'изучено',
      of: 'из',
      shuffle: 'Перемешать',
      showUnknown: 'Только неизвестные',
      showAll: 'Показать все',
      knowIt: 'Знаю',
      studyMore: 'Изучить ещё',
      clickToFlip: 'Кликни чтобы перевернуть',
      front: 'Спереди',
      back: 'Сзади',
      noDeck: 'Нет карточек в колоде',
      allMastered: 'Все карточки изучены! 🎉',
    },
  };
  const t = texts[lang];

  const currentCard = deck[currentIndex];
  const masteredCount = knownCards.size;
  const totalCount = flashcards.length;
  const progressPercent = Math.round((masteredCount / totalCount) * 100);

  const handleShuffle = () => {
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleKnowIt = () => {
    if (currentCard) {
      setKnownCards(prev => {
        const newSet = new Set(prev);
        newSet.add(currentCard.id);
        return newSet;
      });
      goToNext();
    }
  };

  const handleStudyMore = () => {
    goToNext();
  };

  const goToNext = () => {
    setIsFlipped(false);
    if (currentIndex < deck.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleReset = () => {
    if (confirm(lang === 'ru' ? 'Сбросить весь прогресс?' : 'Reset all progress?')) {
      setKnownCards(new Set());
      setShowOnlyUnknown(false);
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed right-4 top-[90px] z-40 px-4 py-2 rounded-lg font-medium transition-all ${
          isOpen
            ? 'bg-pink-600 text-white'
            : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'
        }`}
      >
        🎴 {t.title}
        {masteredCount > 0 && !isOpen && (
          <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded">
            {masteredCount}/{totalCount}
          </span>
        )}
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed right-4 top-16 z-40 w-96 bg-gray-900/95 backdrop-blur rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          {/* Header */}
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-white font-bold text-lg">{t.title}</h2>
            <p className="text-gray-400 text-sm">{t.subtitle}</p>
            
            {/* Progress */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>{t.progress}</span>
                <span>
                  {masteredCount}/{totalCount} {t.mastered} ({progressPercent}%)
                </span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="p-4 border-b border-gray-800 flex gap-2 flex-wrap">
            <button
              onClick={handleShuffle}
              className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-sm transition-colors"
            >
              🔀 {t.shuffle}
            </button>
            <button
              onClick={() => setShowOnlyUnknown(!showOnlyUnknown)}
              className={`px-3 py-1.5 rounded text-sm transition-colors ${
                showOnlyUnknown
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              }`}
            >
              {showOnlyUnknown ? '📚 ' + t.showAll : '🎯 ' + t.showUnknown}
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 bg-gray-800 hover:bg-red-900/50 text-gray-400 hover:text-red-400 rounded text-sm transition-colors ml-auto"
            >
              🔄 Reset
            </button>
          </div>

          {/* Card Display */}
          <div className="p-6">
            {deck.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-2">🎉</div>
                <p className="text-white font-medium">{t.allMastered}</p>
                <button
                  onClick={() => setShowOnlyUnknown(false)}
                  className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded transition-colors"
                >
                  {t.showAll}
                </button>
              </div>
            ) : currentCard ? (
              <>
                {/* Card */}
                <div 
                  className="flashcard-container"
                  onClick={handleCardClick}
                  style={{ perspective: '1000px' }}
                >
                  <div 
                    className={`flashcard ${isFlipped ? 'flipped' : ''}`}
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '280px',
                      transformStyle: 'preserve-3d',
                      transition: 'transform 0.6s',
                      transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                      cursor: 'pointer',
                    }}
                  >
                    {/* Front */}
                    <div
                      className="flashcard-front"
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        border: '2px solid rgba(139, 92, 246, 0.3)',
                        borderRadius: '12px',
                        padding: '24px',
                      }}
                    >
                      <div className="text-6xl mb-4">{currentCard.emoji}</div>
                      <div className="text-white text-2xl font-bold text-center">
                        {currentCard.front[lang]}
                      </div>
                      <div className="text-gray-500 text-xs mt-4">
                        {t.clickToFlip}
                      </div>
                    </div>

                    {/* Back */}
                    <div
                      className="flashcard-back"
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(219, 39, 119, 0.1)',
                        border: '2px solid rgba(219, 39, 119, 0.3)',
                        borderRadius: '12px',
                        padding: '24px',
                      }}
                    >
                      <div className="text-gray-300 text-sm leading-relaxed text-center">
                        {currentCard.back[lang]}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card counter */}
                <div className="text-center text-gray-500 text-sm mt-4">
                  {currentIndex + 1} / {deck.length}
                </div>

                {/* Action buttons */}
                {isFlipped && (
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStudyMore();
                      }}
                      className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium transition-colors"
                    >
                      🔄 {t.studyMore}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleKnowIt();
                      }}
                      className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium transition-colors"
                    >
                      ✅ {t.knowIt}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 text-gray-400">
                {t.noDeck}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Close overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
