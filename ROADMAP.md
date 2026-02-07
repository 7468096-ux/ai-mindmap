# 🗺️ AI Mindmap — Roadmap v2.0

> Development plan: from interactive map to full-fledged educational platform

## 📊 Current Status (v1.0)

✅ **Achieved:**
- 112 nodes with full content (RU/EN)
- 25 interactive demos
- Space UI with animations
- Drag & drop, zoom, pan
- GitHub Pages deployment

---

## 🎯 Development Phases

### Phase 1: Content Quality (v1.1)
**Timeline: 1-2 weeks**

#### 1.1 Fix Inaccuracies
- [ ] GPT-4 parameters: change to "hundreds of billions+ (exact not disclosed)"
- [ ] DALL-E: clarify that v1 was dVAE, v2/v3 — diffusion
- [ ] Verify all dates and facts

#### 1.2 Add Practical Context
- [ ] **"Where it's used"** — real-world examples for each node
  - Linear Regression → price prediction, trends
  - CNN → face recognition, medical imaging
  - Transformer → ChatGPT, translators
- [ ] **"When to use"** — algorithm selection criteria
  - Small data → SVM, Decision Tree
  - Large data → Neural Networks
  - Images → CNN
  - Sequences → RNN/Transformer

#### 1.3 Improve Demos
- [ ] Add step-by-step explanations to each demo
- [ ] "What's happening here?" button with detailed description
- [ ] "Slow mode" for step-by-step viewing

---

### Phase 2: Learning Experience (v1.2)
**Timeline: 2-3 weeks**

#### 2.1 Learning Paths
Recommended study paths:

**Path 1: ML Basics (for beginners)**
```
AI → ML → Supervised → Linear Regression → Logistic Regression 
→ Decision Tree → Random Forest → Model Evaluation
```

**Path 2: Deep Learning**
```
Neural Networks → Backpropagation → CNN → RNN → LSTM 
→ Attention → Transformer
```

**Path 3: Modern AI**
```
Transformer → LLM → GPT → BERT → Prompting → RAG → Agents
```

**Path 4: Computer Vision**
```
CNN → Classification → Detection (YOLO) → Segmentation 
→ ResNet → ViT → CLIP
```

#### 2.2 Study Modes
- [ ] **📖 Overview** — quick view of entire tree in 10 minutes
- [ ] **🎯 Deep Dive** — one branch in detail with demos
- [ ] **🧪 Practice** — demos + interactive tasks

#### 2.3 UI Improvements
- [ ] Highlight active path on map
- [ ] Mini-map for navigation
- [ ] Breadcrumbs: AI > ML > Supervised > Linear Regression

---

### Phase 3: Interactivity (v1.3)
**Timeline: 2-3 weeks**

#### 3.1 Node Connections
- [ ] Explicit arrows with labels
  - "Is foundation for"
  - "Improves"  
  - "Solves problem of"
- [ ] On node click — highlight all related nodes
- [ ] "Show dependencies" mode

#### 3.2 Comparison Tables
- [ ] SVM vs Logistic Regression vs Decision Tree
- [ ] CNN vs ViT
- [ ] RNN vs LSTM vs Transformer
- [ ] GAN vs VAE vs Diffusion

Table format:
| Criteria | Algorithm A | Algorithm B |
|----------|-------------|-------------|
| Complexity | O(n²) | O(n) |
| Data needed | Small | Large |
| Interpretability | High | Low |

#### 3.3 Code Examples
- [ ] Python snippets for each algorithm
- [ ] Minimal working example (10-20 lines)
- [ ] Copy to clipboard

```python
# Example: Linear Regression
from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)
```

---

### Phase 4: Progress & Personalization (v1.4)
**Timeline: 3-4 weeks**

#### 4.1 Learning Progress
- [ ] LocalStorage for saving progress
- [ ] "Completed" mark on nodes
- [ ] Progress bar by branch
- [ ] Statistics: learned X of Y nodes

#### 4.2 Flashcards
- [ ] Quick cards for review
- [ ] Question → answer format
- [ ] Spaced repetition

Examples:
- Q: "What does ReLU do?" → A: "Replaces negative values with 0"
- Q: "How is LSTM better than RNN?" → A: "Solves vanishing gradient via gates"

#### 4.3 Mini-Quizzes
- [ ] After each node — 2-3 questions
- [ ] Multiple choice
- [ ] Explanation of correct answer

---

### Phase 5: Advanced Features (v2.0)
**Timeline: 4-6 weeks**

#### 5.1 Search
- [ ] Search by node names
- [ ] Search by content
- [ ] Filters by level/branch

#### 5.2 Export
- [ ] Export map to PDF
- [ ] Export progress
- [ ] Share specific nodes

#### 5.3 Mobile Version
- [ ] Responsive design for mobile
- [ ] Touch-friendly navigation
- [ ] PWA (Progressive Web App)

---

## 📅 Timeline

```
February 2024
├── Week 1-2: Phase 1 (Content Quality)
│   ├── Fix facts
│   ├── "Where it's used"
│   └── Improve demos
│
├── Week 3-4: Phase 2 (Learning Experience)
│   ├── Learning Paths
│   ├── Study modes
│   └── UI navigation

March 2024
├── Week 1-2: Phase 3 (Interactivity)
│   ├── Node connections
│   ├── Comparison tables
│   └── Code examples
│
├── Week 3-4: Phase 4 (Progress)
│   ├── Learning progress
│   ├── Flashcards
│   └── Quizzes

April 2024
└── Phase 5 (Advanced)
    ├── Search
    ├── Export
    └── Mobile version
```

---

## 🎯 Success KPIs

| Metric | Current | Goal v2.0 |
|--------|---------|-----------|
| Nodes | 112 | 150+ |
| Demos | 25 | 40+ |
| Avg session time | ? | 10+ min |
| Return users | ? | 30%+ |

---

## 💡 Future Ideas (v3.0+)

- 🤖 AI assistant for content questions
- 👥 Collaborative learning (multiplayer mode)
- 📊 Personal recommendations
- 🎓 Completion certificates
- 🔌 API for integration

---

## 📝 How to Contribute

1. Pick a task from roadmap
2. Create issue with description
3. Fork → Branch → PR
4. Code review → Merge

---

*Last updated: 2024-02-07*
