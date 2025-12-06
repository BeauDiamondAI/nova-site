// src/app/components/SectionDenialPilot/denialpilotData.ts

import { DenialPilotCapability } from './types';

export const defaultCapabilities: DenialPilotCapability[] = [
  {
    id: 'policy-retrieval',
    icon: 'file-text',
    title: 'Live Policy Retrieval',
    description: "Using NovaThink's RAG Engine to fetch current insurance policies at appeal generation time, ensuring 100% citation accuracy.",
    badge: 'Powered by Retrieval Layer',
    borderColor: 'border-slate-700 hover:border-blue-500/30',
    bgColor: 'bg-slate-800/50',
  },
];

export const hoverCapabilities: DenialPilotCapability[] = [
  {
    id: 'citation-verification',
    icon: 'lock',
    title: 'Citation Verification',
    description: 'Deterministic validation layer that checks every policy reference against source documents before submission. Zero hallucination guarantee.',
    badge: 'Powered by Security Layer',
    borderColor: 'border-slate-700 hover:border-cyan-500/30',
    bgColor: 'bg-slate-800/50',
  },
  {
    id: 'multi-tenant',
    icon: 'shield-check',
    title: 'Multi-Tenant Architecture',
    description: 'HIPAA-compliant infrastructure with clinic-level data isolation and role-based access control. SOC 2 certified.',
    badge: 'Powered by Compliance Layer',
    borderColor: 'border-slate-700 hover:border-purple-500/30',
    bgColor: 'bg-slate-800/50',
  },
];