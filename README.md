# 🧠 AI Mindmap v1.0

> Interactive visual map of AI/ML terminology for learning artificial intelligence

[![Deploy](https://github.com/7468096-ux/ai-mindmap/actions/workflows/nextjs.yml/badge.svg)](https://github.com/7468096-ux/ai-mindmap/actions)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://7468096-ux.github.io/ai-mindmap/)

## 🎯 About

AI Mindmap is an educational tool for learning the hierarchy of artificial intelligence concepts. The project visualizes connections between concepts from high-level fields (AI, ML, DL) to specific implementations (GPT, BERT, YOLO).

**Live Demo:** https://7468096-ux.github.io/ai-mindmap/

## ✨ Features v1.0

### Content
- 📚 **112 nodes** — complete AI/ML terminology coverage
- 🌍 **Bilingual** — Russian and English languages
- 📖 **Detailed descriptions** — for every concept
- 🔑 **Key Points** — essential facts in each node
- 🔧 **How It Works** — mechanism explanations

### Interactivity
- 🎮 **25 interactive demos** — algorithm visualizations in action
- 🖱️ **Drag & Drop** — movable nodes
- 🔍 **Zoom & Pan** — scaling and navigation
- ✨ **Space UI** — animated starry background

### Demo Visualizations
| Category | Demos |
|----------|-------|
| **Regression** | Linear Regression, Logistic Regression |
| **Classification** | Decision Tree, Random Forest, SVM, XGBoost |
| **Clustering** | K-Means, PCA |
| **Neural Networks** | NN, CNN, RNN, LSTM, Dropout |
| **Attention** | Attention, Transformer, ViT |
| **Generative** | GAN, VAE, Autoencoder, Diffusion |
| **NLP** | Tokenization, Embeddings, Word2Vec |
| **RL** | Q-Learning |
| **Architecture** | ResNet |

## 🏗️ Architecture

### Level Hierarchy
```
Field
  └── Theory
        └── Method
              └── Algorithm
                    └── Implementation
```

### Main Branches
```
AI (Artificial Intelligence)
├── ML (Machine Learning)
│   ├── Supervised Learning
│   │   ├── Linear Regression, Logistic Regression
│   │   ├── Decision Tree, Random Forest, XGBoost
│   │   ├── SVM, Neural Networks
│   │   └── ...
│   ├── Unsupervised Learning
│   │   ├── K-Means, PCA
│   │   └── ...
│   └── Reinforcement Learning
│       └── Q-Learning, ...
│
├── Deep Learning
│   ├── CNN, RNN, LSTM
│   ├── Transformer, Attention
│   ├── GAN, VAE, Diffusion
│   └── ...
│
├── NLP (Natural Language Processing)
│   ├── Tokenization, Embeddings
│   ├── LLM (GPT, BERT, Claude)
│   └── RAG, Agents
│
└── Computer Vision
    ├── Classification, Detection, Segmentation
    ├── ResNet, ViT, YOLO
    └── CLIP, Stable Diffusion
```

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** GitHub Pages
- **CI/CD:** GitHub Actions

## 📦 Installation

```bash
# Clone
git clone https://github.com/7468096-ux/ai-mindmap.git
cd ai-mindmap

# Install dependencies
npm install

# Run dev server
npm run dev

# Build
npm run build
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── page.tsx           # Main page (mindmap)
│   ├── playground/        # Demo page
│   └── globals.css        # Global styles
├── components/
│   ├── SpaceMindMap.tsx   # Main map component
│   └── demos/             # 25 interactive demos
│       ├── index.tsx      # Demo registry
│       ├── LinearRegressionDemo.tsx
│       ├── CNNDemo.tsx
│       └── ...
└── data/
    └── nodes.ts           # 112 nodes with content
```

## 📋 Version History

| Version | Date | Changes |
|---------|------|---------|
| v0.1 | 2024-01 | Basic structure, core AI concepts |
| v0.2 | 2024-01 | Language toggle RU/EN |
| v0.3 | 2024-01 | Full ML branch with algorithms |
| v0.4 | 2024-02 | Deep Learning + "How It Works" |
| v0.5 | 2024-02 | Computer Vision branch |
| v0.6 | 2024-02 | Implementations (BERT, GPT, CLIP) |
| **v1.0** | **2024-02-07** | **112 nodes, 25 demos, full coverage** |

## 🚀 Roadmap v2.0

See [ROADMAP.md](./ROADMAP.md) for detailed development plan.

**Planned:**
- 📖 Learning Path (recommended study order)
- 🧪 Study modes (overview / deep dive / practice)
- 📝 Code examples for each algorithm
- 🔗 Explicit "Required for..." connections
- ✅ Learning progress tracking
- 📊 Algorithm comparison tables

## 🤝 Contributing

Issues and Pull Requests are welcome!

## 📄 License

MIT License — free to use for any purpose.

---

**Author:** [Aleksandr Lukashkin](https://github.com/7468096-ux)  
**AI Assistant:** Alice 🐰 (Clawdbot)
