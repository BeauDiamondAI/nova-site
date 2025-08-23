import React from 'react';

interface FrontFaceProps {
  headline: string;
  gradient: string;
}

const FrontFace: React.FC<FrontFaceProps> = ({ headline, gradient }) => {
  return (
    <div
      className={`flex items-center justify-center h-full w-full rounded-xl p-6 text-white font-headline text-lg sm:text-xl text-center transition-transform duration-500 ${gradient}`}
    >
      {headline}
    </div>
  );
};

export default FrontFace;
