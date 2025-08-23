// components/SectionWhoWeServe/WhoWeServeSection.tsx
import React, { useState } from 'react';
import AudienceCard from './AudienceCard';

const audienceData = [
  {
    id: 'founders',
    headline: 'Founders & Creators',
    description:
      'Operational clarity, positioning precision, and business frameworks that think with you — and execute for you.',
    colorClass: 'bg-gradient-to-br from-fuchsia-500 to-pink-500',
  },
  {
    id: 'operators',
    headline: 'Operators & Teams',
    description:
      'Cognitive engines for real-time execution, workflow orchestration, and cross-domain decisioning.',
    colorClass: 'bg-gradient-to-br from-orange-500 to-yellow-500',
  },
  {
    id: 'enterprises',
    headline: 'Enterprises',
    description:
      'Deployable self-optimizing intelligence that integrates directly into core infrastructure — revolutionizing strategy and execution across every dimension.',
    colorClass: 'bg-gradient-to-br from-blue-500 to-cyan-500',
  },
  {
    id: 'privacy',
    headline: 'Privacy-First Companies',
    description:
      'Zero-trust compatible deployments with VPC integration — data discretion by design.',
    colorClass: 'bg-gradient-to-br from-green-500 to-emerald-500',
  },
  {
    id: 'future',
    headline: 'Future-Facing Innovators',
    description:
      'Soon: branded intelligence + marketing systems engineered for elite precision, creative excellence, and explosive growth.',
    colorClass: 'bg-gradient-to-br from-purple-600 to-indigo-500',
  },
];

const WhoWeServeSection = () => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    setActiveCardId(activeCardId === id ? null : id);
  };

  return (
    <section className="bg-gray-50 py-20">
      <h2 className="text-center text-white font-headline text-3xl sm:text-4xl font-bold mb-12">
        Who We Serve
      </h2>
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
        {audienceData.map((audience) => (
          <AudienceCard
            key={audience.id}
            headline={audience.headline}
            description={audience.description}
            isActive={activeCardId === audience.id}
            onClick={() => handleCardClick(audience.id)}
            colorClass={audience.colorClass}
          />
        ))}
      </div>
    </section>
  );
};

export default WhoWeServeSection;
