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

type DemoComponent = React.ComponentType<{ lang?: Language }>;

// Map node IDs to their demos
export const demos: Record<string, DemoComponent> = {
  'linear-reg': LinearRegressionDemo,
  'kmeans': KMeansDemo,
  'attention': AttentionDemo,
  'tokenization': TokenizationDemo,
  'embeddings': EmbeddingsDemo,
  'cnn': CNNDemo,
  'decision-tree': DecisionTreeDemo,
  'pca': PCADemo,
  'nn': NeuralNetworkDemo,
};

export function hasDemo(nodeId: string): boolean {
  return nodeId in demos;
}

export function getDemo(nodeId: string): DemoComponent | null {
  return demos[nodeId] || null;
}
