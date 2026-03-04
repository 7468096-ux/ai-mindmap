# AI Mindmap v2.0 — Детальный план улучшений

## Исследование рынка: Лучшие практики

### От Duolingo (геймификация):
- **Streaks** — серия дней подряд увеличивает мотивацию на 60%
- **XP система** — очки за каждое действие
- **Микро-уроки** — 5-минутные сессии, не перегружают
- **Мгновенная обратная связь** — зелёный/красный после каждого ответа

### От Brilliant.org (интерактивное обучение):
- **Visual-first** — каждый концепт показывается визуально
- **Active learning** — вопросы на каждом шаге (не пассивное чтение)
- **Single concept per lesson** — фокус на одной идее
- **Blocked problem solving** — серия похожих задач для закрепления

### Когнитивная психология:
- **Progressive disclosure** — показывать информацию порционно
- **Dual coding** — текст + визуал запоминается в 6.5x лучше
- **Spaced repetition (SM-2)** — оптимальные интервалы повторения
- **Active recall** — вспоминать > перечитывать
- **Chunking** — группировка информации по 5-7 элементов
- **Interleaving** — чередование тем улучшает запоминание

---

## План реализации (7 фич)

### ФИЧА 1: Command Palette поиск (Cmd+K)
**Файл:** `src/components/SearchPalette.tsx`

- Оверлей по центру экрана (как VS Code Cmd+K)
- Fuzzy search по названиям нод (RU + EN)
- По клику — pan к ноде + открыть InfoPanel
- Keyboard: Cmd+K открыть, Escape закрыть, стрелки навигация, Enter выбор
- Показывать эмодзи + название + уровень абстракции

### ФИЧА 2: Progressive Disclosure (collapse/expand)
**Файл:** `src/components/SpaceMindMap.tsx`

- По умолчанию видны только Field + Theory (AI, ML, DL, NLP, CV)
- Клик на ноду раскрывает её дочерние ноды (с анимацией)
- Двойной клик — раскрыть всё поддерево
- Кнопка "Expand All" / "Collapse All" в легенде
- Collapsed нода показывает badge с количеством дочерних (+12)
- Рёбра скрываются/показываются вместе с нодами

### ФИЧА 3: XP + Streaks + Progress система (Duolingo-style)
**Файл:** `src/components/XPSystem.tsx`, `src/data/gamification.ts`

- XP за действия: прочитал ноду (+5), прошёл флешкарту (+10), квиз ответ правильный (+20), завершил path (+100)
- Уровни: Novice (0), Explorer (100), Practitioner (500), Expert (1500), Master (5000)
- Daily streak: счётчик дней подряд, сохраняется в localStorage
- Streak freeze: 1 пропуск не ломает серию
- Визуальный прогресс бар в шапке
- Celebration animations при level up

### ФИЧА 4: Улучшенные Flashcards с SM-2 алгоритмом
**Файл:** `src/components/FlashcardsPanel.tsx`, `src/data/flashcards.ts`

SM-2 алгоритм:
```
quality: 0-5 (0=полный провал, 5=идеально)
EF = EF + (0.1 - (5-q) * (0.08 + (5-q) * 0.02))
EF = max(1.3, EF)
interval: 
  rep 1 = 1 day
  rep 2 = 6 days
  rep n = interval(n-1) * EF
```

- Вынести данные карточек в `src/data/flashcards.ts`
- Каждая карточка хранит: lastReview, nextReview, easeFactor, interval, repetitions
- Кнопки: "Забыл" (q=1), "Сложно" (q=3), "Помню" (q=4), "Легко" (q=5)
- Показывать "due cards" — карточки, которые пора повторить
- Fill-in-the-blank режим (Active Recall): показать описание с пропуском, напечатать ответ

### ФИЧА 5: Аналогии + "Explain Like I'm 5" 
**Файл:** `src/data/nodes.ts` — добавить поле `analogy`

Добавить в каждую ноду (минимум для 20 ключевых):
```ts
analogy: {
  ru: "Attention — это как когда ты читаешь книгу и глаза возвращаются к важному слову",
  en: "Attention is like reading a book and your eyes keep going back to a key word"
}
```

Показывать в InfoPanel секцией "💡 Simple Analogy" перед How It Works.

### ФИЧА 6: Кнопка "Next" в InfoPanel для Learning Path
**Файл:** `src/components/InfoPanel.tsx`

- Если пользователь на learning path — показать внизу InfoPanel:
  - "✅ Mark as completed" кнопка
  - "→ Next: [название следующей ноды]" кнопка
  - Progress indicator: "3 / 10 in ML Basics"
- При нажатии Next — pan к следующей ноде + открыть её InfoPanel
- Auto-scroll карты к текущей ноде пути

### ФИЧА 7: Mobile-friendly bottom sheet + responsive
**Файлы:** `src/app/space.css`, `src/components/SpaceMindMap.tsx`

- На мобильных (<768px): InfoPanel = bottom sheet (swipe up/down)
- Кнопки Learning Paths / Quiz / Flashcards — в hamburger menu
- Pinch-to-zoom (уже есть touch, нужен multi-touch)
- Увеличить размер нод на мобильных
- Легенда = collapsible на мобильных
