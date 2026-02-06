'use client';

import dynamic from 'next/dynamic';
import { Language } from '@/data/nodes';

// Dynamic imports
const LinearRegressionDemo = dynamic(() => import('./LinearRegressionDemo'), { ssr: false });
const KMeansDemo = dynamic(() => import('./KMeansDemo'), { ssr: false });
const AttentionDemo = dynamic(() => import('./AttentionDemo'), { ssr: false });

type DemoComponent = React.ComponentType<{ lang?: Language }>;

export const demos: Record<string, DemoComponent> = {
  'linear-reg': LinearRegressionDemo,
  'kmeans': KMeansDemo,
  'attention': AttentionDemo,
};

export function hasDemo(nodeId: string): boolean {
  return nodeId in demos;
}

export function getDemo(nodeId: string): DemoComponent | null {
  return demos[nodeId] || null;
}
