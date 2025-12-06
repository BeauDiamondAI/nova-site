// src/app/components/SectionDenialPilot/novathinkData.ts

import { NovaThinkLayer } from './types';

export const novathinkLayers: NovaThinkLayer[] = [
  {
    id: 'compliance',
    label: 'LAYER: COMPLIANCE',
    color: 'text-purple-400',
    title: 'HIPAA + SOC 2 + ISO 27001 Infrastructure',
    description: 'Production-ready compliance architecture with encrypted data at rest and in transit, role-based access control, audit logging, and PHI isolation. SOC 2 Type I certified.',
  },
  {
    id: 'containerization',
    label: 'LAYER: CONTAINERIZATION',
    color: 'text-cyan-400',
    title: 'Fully Dockerized Architecture',
    description: 'Complete system containerization enabling infrastructure-agnostic deployment. Portable across AWS, Azure, GCP with zero code changes.',
  },
  {
    id: 'security',
    label: 'LAYER: SECURITY',
    color: 'text-red-400',
    title: 'VPC Lockdown + Token Auth',
    description: 'Private VPC gateway with zero public endpoints. HTTPBearer token authentication with role-based access control. AWS Secrets Manager runtime injection.',
  },
  {
    id: 'memory',
    label: 'LAYER: MEMORY',
    color: 'text-green-400',
    title: 'Dual-Memory System',
    description: 'Redis for volatile session context (TTL-managed). PostgreSQL for persistent strategic memory (manually tagged). Automatic routing between ephemeral and permanent storage.',
  },
  {
    id: 'retrieval',
    label: 'LAYER: RETRIEVAL',
    color: 'text-blue-400',
    title: 'High-Velocity RAG Engine',
    description: 'Vector-based semantic search pulling from live external policy databases. Sub-second retrieval for hallucination-proof citations.',
  },
];