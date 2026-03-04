'use client';

import { Language } from '@/data/nodes';

interface Relation {
  from: string;
  to: string;
  type: 'improves' | 'solves' | 'replaces' | 'uses' | 'part_of';
  desc: { en: string; ru: string };
}

const relations: Relation[] = [
  { from: 'LSTM', to: 'RNN', type: 'solves', desc: { en: 'LSTM solves vanishing gradient problem in RNNs', ru: 'LSTM решает проблему затухания градиентов в RNN' } },
  { from: 'Transformer', to: 'LSTM', type: 'replaces', desc: { en: 'Transformers replaced LSTMs for most NLP tasks', ru: 'Трансформеры заменили LSTM для большинства задач NLP' } },
  { from: 'Attention', to: 'Transformer', type: 'part_of', desc: { en: 'Self-attention is the core mechanism of Transformers', ru: 'Self-attention — ключевой механизм трансформеров' } },
  { from: 'ResNet', to: 'CNN', type: 'improves', desc: { en: 'Skip connections enable training of very deep CNNs', ru: 'Skip connections позволяют обучать очень глубокие CNN' } },
  { from: 'GPT', to: 'Transformer', type: 'uses', desc: { en: 'GPT uses decoder-only transformer architecture', ru: 'GPT использует decoder-only архитектуру трансформера' } },
  { from: 'BERT', to: 'Transformer', type: 'uses', desc: { en: 'BERT uses encoder-only transformer', ru: 'BERT использует encoder-only трансформер' } },
  { from: 'Random Forest', to: 'Decision Tree', type: 'improves', desc: { en: 'Ensemble of trees reduces overfitting', ru: 'Ансамбль деревьев уменьшает переобучение' } },
  { from: 'XGBoost', to: 'Decision Tree', type: 'improves', desc: { en: 'Gradient boosting with trees corrects errors sequentially', ru: 'Gradient boosting деревьями исправляет ошибки последовательно' } },
  { from: 'Dropout', to: 'Neural Network', type: 'solves', desc: { en: 'Dropout prevents overfitting by randomly deactivating neurons', ru: 'Dropout предотвращает переобучение отключением нейронов' } },
  { from: 'Batch Norm', to: 'Neural Network', type: 'improves', desc: { en: 'Stabilizes training, enables higher learning rates', ru: 'Стабилизирует обучение, позволяет больший learning rate' } },
  { from: 'Embeddings', to: 'LLM', type: 'part_of', desc: { en: 'Text is converted to embeddings before processing', ru: 'Текст конвертируется в embeddings перед обработкой' } },
  { from: 'Tokenization', to: 'LLM', type: 'part_of', desc: { en: 'Text must be tokenized before embedding', ru: 'Текст должен быть токенизирован перед embedding' } },
  { from: 'Diffusion', to: 'GAN', type: 'replaces', desc: { en: 'Diffusion models produce better images than GANs', ru: 'Диффузионные модели дают лучшие изображения чем GAN' } },
  { from: 'ViT', to: 'CNN', type: 'replaces', desc: { en: 'Vision Transformer outperforms CNNs on large datasets', ru: 'Vision Transformer превосходит CNN на больших данных' } },
  { from: 'CLIP', to: 'ViT', type: 'uses', desc: { en: 'CLIP uses ViT as its image encoder', ru: 'CLIP использует ViT как encoder изображений' } },
  { from: 'RAG', to: 'LLM', type: 'improves', desc: { en: 'Retrieval-Augmented Generation adds external knowledge', ru: 'RAG добавляет внешние знания к LLM' } },
  { from: 'VAE', to: 'Autoencoder', type: 'improves', desc: { en: 'VAE adds probabilistic latent space for generation', ru: 'VAE добавляет вероятностное латентное пространство для генерации' } },
  { from: 'U-Net', to: 'CNN', type: 'uses', desc: { en: 'U-Net uses CNN encoder-decoder for segmentation', ru: 'U-Net использует CNN encoder-decoder для сегментации' } },
  { from: 'YOLO', to: 'CNN', type: 'uses', desc: { en: 'YOLO uses CNN backbone for real-time detection', ru: 'YOLO использует CNN backbone для real-time детекции' } },
  { from: 'PCA', to: 'K-Means', type: 'improves', desc: { en: 'PCA reduces dimensions before clustering', ru: 'PCA снижает размерность перед кластеризацией' } },
];

const typeEmoji: Record<string, string> = {
  improves: '⬆️',
  solves: '🔧',
  replaces: '🔄',
  uses: '🔗',
  part_of: '🧩',
};

const typeLabel: Record<string, Record<string, string>> = {
  en: { improves: 'improves', solves: 'solves problem of', replaces: 'replaces', uses: 'uses', part_of: 'is part of' },
  ru: { improves: 'улучшает', solves: 'решает проблему', replaces: 'заменяет', uses: 'использует', part_of: 'часть' },
};

interface Props {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
}

export default function ConceptRelationsPanel({ lang, isOpen, onClose }: Props) {
  if (!isOpen) return null;

  const t = {
    en: { title: 'Concept Relations', subtitle: 'How AI concepts connect to each other' },
    ru: { title: 'Связи концепций', subtitle: 'Как AI-концепции связаны между собой' },
  }[lang];

  const typeColors: Record<string, string> = {
    improves: 'border-green-700/50 bg-green-900/10',
    solves: 'border-blue-700/50 bg-blue-900/10',
    replaces: 'border-amber-700/50 bg-amber-900/10',
    uses: 'border-purple-700/50 bg-purple-900/10',
    part_of: 'border-cyan-700/50 bg-cyan-900/10',
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-x-2 bottom-2 md:inset-x-auto md:bottom-auto md:right-4 md:top-16 md:w-[440px] z-50 max-h-[80vh] md:max-h-[85vh] overflow-hidden bg-gray-900/95 backdrop-blur rounded-2xl shadow-2xl border border-gray-700 flex flex-col"
        onMouseDown={e => e.stopPropagation()} onTouchStart={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-700 rounded-t-2xl flex items-center justify-between">
          <div>
            <h2 className="text-white font-bold text-lg">🔗 {t.title}</h2>
            <p className="text-gray-400 text-xs">{t.subtitle}</p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white text-xl w-8 h-8 flex items-center justify-center bg-black/20 rounded-full">×</button>
        </div>
        {/* Legend */}
        <div className="px-4 py-2 flex flex-wrap gap-2 border-b border-gray-800">
          {Object.entries(typeEmoji).map(([type, emoji]) => (
            <span key={type} className="text-[10px] text-gray-400 flex items-center gap-1">
              {emoji} {typeLabel[lang][type]}
            </span>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {relations.map((rel, i) => (
            <div key={i} className={`rounded-lg p-3 border ${typeColors[rel.type]}`}>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-white font-semibold">{rel.from}</span>
                <span className="text-gray-500">{typeEmoji[rel.type]}</span>
                <span className="text-gray-400 text-xs">{typeLabel[lang][rel.type]}</span>
                <span className="text-gray-500">→</span>
                <span className="text-white font-semibold">{rel.to}</span>
              </div>
              <p className="text-gray-400 text-xs mt-1">{rel.desc[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
