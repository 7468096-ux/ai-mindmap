'use client';

import { Language } from '@/data/nodes';

interface TimelineEvent {
  year: number;
  emoji: string;
  title: { en: string; ru: string };
  desc: { en: string; ru: string };
  color: string;
}

const events: TimelineEvent[] = [
  { year: 1943, emoji: '🧠', title: { en: 'McCulloch-Pitts Neuron', ru: 'Нейрон Маккалока-Питтса' }, desc: { en: 'First mathematical model of a neuron', ru: 'Первая математическая модель нейрона' }, color: '#6366f1' },
  { year: 1950, emoji: '🤖', title: { en: 'Turing Test', ru: 'Тест Тьюринга' }, desc: { en: 'Alan Turing proposes a test for machine intelligence', ru: 'Алан Тьюринг предлагает тест на машинный интеллект' }, color: '#6366f1' },
  { year: 1956, emoji: '🎓', title: { en: 'AI is born', ru: 'Рождение AI' }, desc: { en: 'Dartmouth conference — term "AI" coined by John McCarthy', ru: 'Дартмутская конференция — термин "AI" введён Джоном Маккарти' }, color: '#8b5cf6' },
  { year: 1957, emoji: '🔮', title: { en: 'Perceptron', ru: 'Перцептрон' }, desc: { en: 'Frank Rosenblatt builds the first neural network', ru: 'Фрэнк Розенблатт строит первую нейросеть' }, color: '#8b5cf6' },
  { year: 1969, emoji: '❄️', title: { en: 'AI Winter begins', ru: 'Начало зимы AI' }, desc: { en: 'Minsky & Papert show perceptron limitations → funding cuts', ru: 'Минский и Паперт показывают ограничения перцептрона → сокращение финансирования' }, color: '#64748b' },
  { year: 1986, emoji: '🔄', title: { en: 'Backpropagation', ru: 'Обратное распространение' }, desc: { en: 'Rumelhart, Hinton & Williams popularize backprop', ru: 'Румельхарт, Хинтон и Уильямс популяризируют backprop' }, color: '#06b6d4' },
  { year: 1997, emoji: '♟️', title: { en: 'Deep Blue beats Kasparov', ru: 'Deep Blue побеждает Каспарова' }, desc: { en: 'IBM\'s chess AI defeats world champion', ru: 'Шахматный AI IBM побеждает чемпиона мира' }, color: '#10b981' },
  { year: 1998, emoji: '🔢', title: { en: 'LeNet-5 (CNN)', ru: 'LeNet-5 (CNN)' }, desc: { en: 'Yann LeCun\'s CNN for handwritten digit recognition', ru: 'CNN Янна ЛеКуна для распознавания рукописных цифр' }, color: '#10b981' },
  { year: 2006, emoji: '📚', title: { en: 'Deep Learning revival', ru: 'Возрождение Deep Learning' }, desc: { en: 'Hinton shows deep networks can be pre-trained layer by layer', ru: 'Хинтон показывает предобучение глубоких сетей послойно' }, color: '#06b6d4' },
  { year: 2012, emoji: '🏆', title: { en: 'AlexNet wins ImageNet', ru: 'AlexNet побеждает в ImageNet' }, desc: { en: 'Deep CNN crushes competition — DL revolution begins', ru: 'Глубокая CNN сокрушает конкурентов — начало революции DL' }, color: '#f59e0b' },
  { year: 2014, emoji: '🎭', title: { en: 'GANs invented', ru: 'Изобретены GAN' }, desc: { en: 'Ian Goodfellow introduces Generative Adversarial Networks', ru: 'Ян Гудфеллоу представляет генеративно-состязательные сети' }, color: '#f59e0b' },
  { year: 2015, emoji: '🏗️', title: { en: 'ResNet (152 layers)', ru: 'ResNet (152 слоя)' }, desc: { en: 'Skip connections enable very deep networks', ru: 'Skip connections позволяют очень глубокие сети' }, color: '#10b981' },
  { year: 2016, emoji: '🎮', title: { en: 'AlphaGo beats Lee Sedol', ru: 'AlphaGo побеждает Ли Седоля' }, desc: { en: 'DeepMind\'s RL agent masters Go — a milestone for AI', ru: 'RL агент DeepMind осваивает Го — веха для AI' }, color: '#f59e0b' },
  { year: 2017, emoji: '⚡', title: { en: 'Transformer', ru: 'Transformer' }, desc: { en: '"Attention Is All You Need" — the paper that changed everything', ru: '"Attention Is All You Need" — статья, изменившая всё' }, color: '#ec4899' },
  { year: 2018, emoji: '🔤', title: { en: 'BERT', ru: 'BERT' }, desc: { en: 'Google\'s bidirectional transformer for NLP understanding', ru: 'Двунаправленный трансформер Google для понимания NLP' }, color: '#ec4899' },
  { year: 2020, emoji: '💬', title: { en: 'GPT-3', ru: 'GPT-3' }, desc: { en: '175B parameters — emergent abilities surprise researchers', ru: '175B параметров — эмерджентные способности удивляют исследователей' }, color: '#ec4899' },
  { year: 2021, emoji: '🔗', title: { en: 'CLIP & DALL-E', ru: 'CLIP и DALL-E' }, desc: { en: 'OpenAI connects vision and language — multimodal AI era', ru: 'OpenAI связывает зрение и язык — эра мультимодального AI' }, color: '#f59e0b' },
  { year: 2022, emoji: '🌫️', title: { en: 'Stable Diffusion', ru: 'Stable Diffusion' }, desc: { en: 'Open-source image generation from text — AI art explodes', ru: 'Открытая генерация изображений из текста — взрыв AI-арта' }, color: '#f59e0b' },
  { year: 2022, emoji: '🗣️', title: { en: 'ChatGPT', ru: 'ChatGPT' }, desc: { en: '100M users in 2 months — AI goes mainstream', ru: '100M пользователей за 2 месяца — AI становится мейнстримом' }, color: '#ec4899' },
  { year: 2023, emoji: '🧠', title: { en: 'GPT-4 & Claude', ru: 'GPT-4 и Claude' }, desc: { en: 'Multimodal models, reasoning, 100K+ context windows', ru: 'Мультимодальные модели, reasoning, 100K+ контекстные окна' }, color: '#ec4899' },
  { year: 2024, emoji: '🎬', title: { en: 'Sora & Video AI', ru: 'Sora и Video AI' }, desc: { en: 'AI generates realistic videos from text prompts', ru: 'AI генерирует реалистичное видео из текстовых промптов' }, color: '#f59e0b' },
  { year: 2025, emoji: '🤝', title: { en: 'AI Agents era', ru: 'Эра AI-агентов' }, desc: { en: 'Autonomous agents that code, research, and act in the world', ru: 'Автономные агенты, которые кодят, исследуют и действуют в мире' }, color: '#ec4899' },
];

interface Props {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
}

export default function TimelinePanel({ lang, isOpen, onClose }: Props) {
  if (!isOpen) return null;

  const t = {
    en: { title: 'AI Timeline', subtitle: 'Key milestones in artificial intelligence' },
    ru: { title: 'Хронология AI', subtitle: 'Ключевые вехи искусственного интеллекта' },
  }[lang];

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-x-2 bottom-2 md:inset-x-auto md:bottom-auto md:right-4 md:top-16 md:w-[440px] z-50 max-h-[80vh] md:max-h-[85vh] overflow-y-auto bg-gray-900/95 backdrop-blur rounded-2xl shadow-2xl border border-gray-700"
        onMouseDown={e => e.stopPropagation()} onTouchStart={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur p-4 z-10 flex items-center justify-between border-b border-gray-700 rounded-t-2xl">
          <div>
            <h2 className="text-white font-bold text-lg">📰 {t.title}</h2>
            <p className="text-gray-400 text-xs">{t.subtitle}</p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white text-xl w-8 h-8 flex items-center justify-center bg-black/20 rounded-full">×</button>
        </div>

        <div className="p-4">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[22px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-amber-500" />

            {events.map((evt, i) => (
              <div key={i} className="relative flex gap-4 mb-4 last:mb-0">
                {/* Dot */}
                <div className="relative z-10 flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-lg"
                  style={{ backgroundColor: evt.color + '30', border: `2px solid ${evt.color}` }}>
                  {evt.emoji}
                </div>
                {/* Content */}
                <div className="flex-1 pb-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-purple-400 text-xs font-mono font-bold">{evt.year}</span>
                    <h3 className="text-white text-sm font-semibold">{evt.title[lang]}</h3>
                  </div>
                  <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{evt.desc[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
