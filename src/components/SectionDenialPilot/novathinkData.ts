// src/app/components/SectionDenialPilot/novathinkData.ts

import { NovaThinkLayer } from './types';

export const novathinkLayers: NovaThinkLayer[] = [
  {
    id: 'trust',
    label: 'LAYER: TRUST',
    color: 'text-cyan-400',
    title: 'Source Lock + Citation Lock',
    description: 'Every intelligence data point in DenialPilot is cited to its source policy document with a verifiable lock icon. Every appeal citation is deterministically verified against source policy text before submission. The customer compliance question of "how do we know this is accurate" has a one-click answer.',
  },
  {
    id: 'compliance',
    label: 'LAYER: COMPLIANCE',
    color: 'text-purple-400',
    title: 'HIPAA + SOC 2 + Tamper-Proof Audit Trail',
    description: 'SOC 2 Type I certified, Type II in progress. Append-only audit log with database triggers and 7-year retention, exceeding HIPAA\'s 6-year minimum. Row-Level Security and tenant isolation enforced at the database layer. AWS Secrets Manager runtime credential injection.',
  },
  {
    id: 'containerization',
    label: 'LAYER: CONTAINERIZATION',
    color: 'text-green-400',
    title: 'Fully Dockerized Architecture',
    description: 'Complete system containerization enabling infrastructure-agnostic deployment. Portable across AWS, Azure, and GCP with zero code changes.',
  },
  {
    id: 'retrieval',
    label: 'LAYER: RETRIEVAL',
    color: 'text-blue-400',
    title: 'High-Velocity RAG Engine',
    description: 'Vector-based semantic search pulling from live external policy databases. Sub-second retrieval for hallucination-proof citations.',
  },
];
