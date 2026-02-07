'use client';

import dynamic from 'next/dynamic';
import { Language } from '@/data/nodes';

// Dynamic imports to avoid SSR issues
const LinearRegressionDemo = dynamic(() => import('./LinearRegressionDemo'), { ssr: false });
const KMeansDemo = dynamic(() => import('./KMeansDemo'), { ssr: false });
const AttentionDemo = dynamic(() => import('./AttentionDemo'), { ssr: false });
const TokenizationDemo = dynamic(() => import('./TokenizationDemo'), { ssr: false });
const EmbeddingsDemo = dynamic(() => import('./EmbeddingsDemo'), { ssr: false });
const CNNDemo = dynamic(() => import('./CNNDemo'), { ssr: false });
const DecisionTreeDemo = dynamic(() => import('./DecisionTreeDemo'), { ssr: false });
const PCADemo = dynamic(() => import('./PCADemo'), { ssr: false });
const NeuralNetworkDemo = dynamic(() => import('./NeuralNetworkDemo'), { ssr: false });

// NEW DEMOS
const LogisticRegressionDemo = dynamic(() => import('./LogisticRegressionDemo'), { ssr: false });
const DropoutDemo = dynamic(() => import('./DropoutDemo'), { ssr: false });
const AutoencoderDemo = dynamic(() => import('./AutoencoderDemo'), { ssr: false });
const Word2VecDemo = dynamic(() => import('./Word2VecDemo'), { ssr: false });
const DiffusionDemo = dynamic(() => import('./DiffusionDemo'), { ssr: false });
const GANDemo = dynamic(() => import('./GANDemo'), { ssr: false });
const QLearningDemo = dynamic(() => import('./QLearningDemo'), { ssr: false });
const SVMDemo = dynamic(() => import('./SVMDemo'), { ssr: false });
const LSTMDemo = dynamic(() => import('./LSTMDemo'), { ssr: false });

type DemoComponent = React.ComponentType<{ lang?: Language }>;

// Map node IDs to their demos
export const demos: Record<string, DemoComponent> = {
  // Original demos
  'linear-reg': LinearRegressionDemo,
  'kmeans': KMeansDemo,
  'attention': AttentionDemo,
  'tokenization': TokenizationDemo,
  'embeddings': EmbeddingsDemo,
  'cnn': CNNDemo,
  'decision-tree': DecisionTreeDemo,
  'pca': PCADemo,
  'nn': NeuralNetworkDemo,
  
  // New demos
  'logreg': LogisticRegressionDemo,
  'dropout': DropoutDemo,
  'autoencoder': AutoencoderDemo,
  'word2vec': Word2VecDemo,
  'diffusion': DiffusionDemo,
  'gan': GANDemo,
  'qlearning': QLearningDemo,
  'svm': SVMDemo,
  'lstm': LSTMDemo,
};

export function hasDemo(nodeId: string): boolean {
  return nodeId in demos;
}

export function getDemo(nodeId: string): DemoComponent | null {
  return demos[nodeId] || null;
}
