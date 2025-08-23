// components/SectionWhoWeServe/WhoWeServeSection.tsx
import React, { useState } from 'react';
import AudienceCard from './AudienceCard';

const AUDIENCES = [
  {
    id: 'creators',
    headline: 'Creators',
    description: 'Tools to help you collaborate, publish, and monetize.',
    colorClass: 'bg-gradient-to-br from-fuchsia-600 to-pink-600',
  },
  {
    id: 'startups',
    headline: 'Startups',
    description: 'Speed up your go-to-market with flexible infra and AI.',
    colorClass: 'bg-gradient-to-br from-orange-500 to-amber-500',
  },
  {
    id: 'enterprises',
    headline: 'Enterprises',
    description: 'Custom solutions for complex systems and scale.',
    colorClass: 'bg-gradient-to-br from-blue-600 to-sky-500',
  },
  {
    id: 'developers',
    headline: 'Developers',
    description: 'Launch, test, and iterate quickly with composable APIs.',
    colorClass: 'bg-gradient-to-br from-green-600 to-emerald-500',
  },
];

const WhoWeServeSection: React.FC = () => {
  const [flippedId, setFlippedId] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    setFlippedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-12 bg-gray-50">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 font-display">
        Who We Serve
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {AUDIENCES.map(({ id, headline, description, colorClass }) => (
          <AudienceCard
            key={id}
            id={id}
            headline={headline}
            description={description}
            colorClass={colorClass}
            isActive={flippedId === id}
            onClick={() => handleCardClick(id)}
          />
        ))}
      </div>
    </section>
  );
};

export default WhoWeServeSection;
