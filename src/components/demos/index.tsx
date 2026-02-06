'use client';

import dynamic from 'next/dynamic';

// Dynamic imports to avoid SSR issues
const LinearRegressionDemo = dynamic(() => import('./LinearRegressionDemo'), { ssr: false });
const KMeansDemo = dynamic(() => import('./KMeansDemo'), { ssr: false });
const AttentionDemo = dynamic(() => import('./AttentionDemo'), { ssr: false });

// Map node IDs to their demos
export const demos: Record<string, React.ComponentType> = {
  'linear-reg': LinearRegressionDemo,
  'kmeans': KMeansDemo,
  'attention': AttentionDemo,
};

export function hasDemo(nodeId: string): boolean {
  return nodeId in demos;
}

export function getDemo(nodeId: string): React.ComponentType | null {
  return demos[nodeId] || null;
}
