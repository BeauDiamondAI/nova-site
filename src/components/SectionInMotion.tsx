'use client';

import React from 'react';

const SectionInMotion = () => {
  return (
    <section className="bg-zinc-950 text-white py-20 px-4 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6 animate-slideUpFast">
          Independent. Intentional. In Motion.
        </h2>
        <p className="text-lg md:text-xl text-gray-300 whitespace-pre-line mb-12">
          NovaThink is independently owned and privately funded.
We are not pursuing venture funding.

Most collaborations are privately initiated.

But if you’re already pushing the boundaries of what’s possible—and looking for your home—
📩 Reach out → info@novathink.ai
        </p>
        <div className="text-lg md:text-xl text-gray-300 space-y-2">
          <p>📧 info@novathink.ai</p>
          <p>🌐 www.novathink.ai</p>

        </div>
      </div>
    </section>
  );
};

export default SectionInMotion;
