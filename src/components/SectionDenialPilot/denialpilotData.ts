// src/app/components/SectionDenialPilot/denialpilotData.ts

import { DenialPilotCapability } from './types';

export const defaultCapabilities: DenialPilotCapability[] = [
  {
    id: 'navigator',
    icon: 'file-text',
    title: 'Navigator',
    description: 'Pre-submission prevention intelligence. Surfaces hidden thresholds, documentation requirements, and delegation routing for every CPT code and payer before submission.',
    badge: 'Pre-Submission Prevention',
    borderColor: 'border-slate-700 hover:border-blue-500/30',
    bgColor: 'bg-slate-800/50',
  },
  {
    id: 'appeals',
    icon: 'file-text',
    title: 'Appeals',
    description: 'Post-denial recovery automation. Generates clinical appeals with deterministically verified citations and tracks them through resolution.',
    badge: 'Post-Denial Recovery',
    borderColor: 'border-slate-700 hover:border-blue-500/30',
    bgColor: 'bg-slate-800/50',
  },
];

export const hoverCapabilities: DenialPilotCapability[] = [
  {
    id: 'citation-verification',
    icon: 'lock',
    title: 'Citation Lock',
    description: 'Every citation in every appeal is deterministically verified against the source policy document before submission. Zero hallucination guarantee.',
    badge: 'Powered by Trust Layer',
    borderColor: 'border-slate-700 hover:border-cyan-500/30',
    bgColor: 'bg-slate-800/50',
  },
  {
    id: 'source-lock',
    icon: 'shield-check',
    title: 'Source Lock',
    description: 'Every intelligence data point is cited to its original policy document with a verifiable lock icon. The compliance question of "how do we know this is accurate" has a one-click answer.',
    badge: 'Powered by Trust Layer',
    borderColor: 'border-slate-700 hover:border-purple-500/30',
    bgColor: 'bg-slate-800/50',
  },
];
