'use client';

import { useState, useEffect } from 'react';
import { Language } from '@/data/nodes';
import { TopicQuiz, TopicQuestion, saveQuizResult, loadQuizResults } from '@/data/topicQuizzes';

interface Props {
  quiz: TopicQuiz;
  lang: Language;
  onClose: () => void;
  onPass: (xp: number) => void;
}

export default function TopicQuizModal({ quiz, lang, onClose, onPass }: Props) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [alreadyPassed, setAlreadyPassed] = useState(false);

  useEffect(() => {
    const results = loadQuizResults();
    if (results[quiz.nodeId]?.passed) {
      setAlreadyPassed(true);
    }
  }, [quiz.nodeId]);

  const question = quiz.questions[currentQ];
  const totalQ = quiz.questions.length;
  const scorePercent = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;
  const passed = scorePercent >= quiz.passingScore;

  const handleAnswer = (index: number) => {
    if (showExplanation) return;
    setSelected(index);
    setShowExplanation(true);
    if (index === question.correctIndex) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < totalQ - 1) {
      setCurrentQ(prev => prev + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
      const finalCorrect = selected === question.correctIndex ? correctCount + 1 : correctCount;
      // Recalculate with final answer included if we haven't counted it yet
      const actualCorrect = showExplanation ? correctCount : finalCorrect;
      const actualPercent = Math.round((actualCorrect / totalQ) * 100);
      const isPassed = actualPercent >= quiz.passingScore;
      
      const result = saveQuizResult({
        nodeId: quiz.nodeId,
        score: actualPercent,
        passed: isPassed,
        date: Date.now(),
        xpAwarded: isPassed && !alreadyPassed,
      });
      
      if (isPassed && !alreadyPassed) {
        onPass(quiz.xpReward);
      }
    }
  };

  const texts = {
    en: {
      exam: 'Topic Exam',
      question: 'Question',
      of: 'of',
      next: 'Next',
      finish: 'Finish',
      passed: 'Passed! 🎉',
      failed: 'Not yet...',
      score: 'Score',
      required: 'Required',
      xpEarned: 'XP earned',
      tryAgain: 'Try Again',
      close: 'Close',
      alreadyPassed: 'Already passed ✓',
      explanation: 'Explanation',
      difficulty: { recall: '📝 Recall', understand: '🧠 Understanding', apply: '🔧 Application' },
    },
    ru: {
      exam: 'Контрольная работа',
      question: 'Вопрос',
      of: 'из',
      next: 'Далее',
      finish: 'Завершить',
      passed: 'Сдано! 🎉',
      failed: 'Пока не сдано...',
      score: 'Результат',
      required: 'Нужно',
      xpEarned: 'XP получено',
      tryAgain: 'Попробовать снова',
      close: 'Закрыть',
      alreadyPassed: 'Уже сдано ✓',
      explanation: 'Объяснение',
      difficulty: { recall: '📝 Запоминание', understand: '🧠 Понимание', apply: '🔧 Применение' },
    },
  };
  const t = texts[lang];

  // Stop propagation for pan
  const stopProp = (e: React.MouseEvent | React.TouchEvent) => e.stopPropagation();

  if (finished) {
    return (
      <>
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" onClick={onClose} />
        <div className="fixed inset-x-4 top-[15%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[440px] z-[61] bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden"
          onMouseDown={stopProp} onTouchStart={stopProp}>
          <div className={`p-6 text-center ${passed ? 'bg-gradient-to-br from-green-900/40 to-emerald-900/40' : 'bg-gradient-to-br from-red-900/30 to-gray-900'}`}>
            <div className="text-5xl mb-3">{passed ? '🏆' : '📚'}</div>
            <h2 className="text-white text-xl font-bold">{passed ? t.passed : t.failed}</h2>
            <div className="text-3xl font-bold mt-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {scorePercent}%
            </div>
            <div className="text-gray-400 text-sm mt-1">
              {correctCount}/{totalQ} • {t.required}: {quiz.passingScore}%
            </div>
            {passed && !alreadyPassed && (
              <div className="mt-3 inline-flex items-center gap-2 bg-yellow-900/30 border border-yellow-700/30 px-4 py-2 rounded-full">
                <span className="text-yellow-400 font-bold">+{quiz.xpReward} XP</span>
              </div>
            )}
            {alreadyPassed && passed && (
              <div className="mt-3 text-green-400 text-sm">{t.alreadyPassed}</div>
            )}
          </div>
          <div className="p-4 flex gap-3">
            {!passed && (
              <button onClick={() => { setCurrentQ(0); setCorrectCount(0); setFinished(false); setSelected(null); setShowExplanation(false); }}
                className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-colors">
                🔄 {t.tryAgain}
              </button>
            )}
            <button onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium transition-colors">
              {t.close}
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" onClick={onClose} />
      <div className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[500px] z-[61] bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden max-h-[80vh] overflow-y-auto"
        onMouseDown={stopProp} onTouchStart={stopProp}>
        
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-purple-900/60 to-pink-900/60 border-b border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="text-white font-bold">{t.exam}</h2>
            <p className="text-purple-300 text-sm">{quiz.title[lang]}</p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white text-xl w-8 h-8 flex items-center justify-center bg-black/20 rounded-full">×</button>
        </div>

        {/* Progress */}
        <div className="px-4 pt-3">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>{t.question} {currentQ + 1} {t.of} {totalQ}</span>
            <span className="text-purple-400">{t.difficulty[question.difficulty]}</span>
          </div>
          <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all" style={{ width: `${((currentQ + 1) / totalQ) * 100}%` }} />
          </div>
        </div>

        {/* Question */}
        <div className="p-4">
          <h3 className="text-white text-lg font-medium mb-4">{question.question[lang]}</h3>
          
          <div className="space-y-2">
            {question.options[lang].map((opt, i) => {
              const isCorrect = i === question.correctIndex;
              const isSelected = selected === i;
              let cls = 'w-full p-3 rounded-lg text-left transition-all border-2 text-sm ';
              if (showExplanation) {
                if (isCorrect) cls += 'bg-green-900/20 border-green-600 text-green-300';
                else if (isSelected) cls += 'bg-red-900/20 border-red-600 text-red-300';
                else cls += 'bg-gray-800/50 border-gray-700 text-gray-500';
              } else {
                cls += 'bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700/50 hover:border-gray-600';
              }
              return (
                <button key={i} onClick={() => handleAnswer(i)} disabled={showExplanation} className={cls}>
                  <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                  {showExplanation && isCorrect && ' ✓'}
                  {showExplanation && isSelected && !isCorrect && ' ✗'}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">{t.explanation}</div>
              <p className="text-gray-300 text-sm">{question.explanation[lang]}</p>
            </div>
          )}

          {/* Next button */}
          {showExplanation && (
            <button onClick={handleNext}
              className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-medium transition-all">
              {currentQ < totalQ - 1 ? t.next : t.finish} →
            </button>
          )}
        </div>
      </div>
    </>
  );
}
