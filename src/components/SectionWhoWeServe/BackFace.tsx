// components/SectionWhoWeServe/BackFace.tsx
import React from 'react';

interface BackFaceProps {
  headline: string;
  description: string;
}

const BackFace: React.FC<BackFaceProps> = ({ headline, description }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full rounded-xl bg-black bg-opacity-70 p-6 text-center text-white font-sans text-sm sm:text-base">
      <h3 className="font-headline text-lg sm:text-xl mb-2">{headline}</h3>
      <p className="opacity-80">{description}</p>
    </div>
  );
};

export default BackFace;
