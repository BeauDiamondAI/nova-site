// components/SectionWhoWeServe/AudienceCard.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type AudienceCardProps = {
  id: string;
  headline: string;
  description: string;
  colorClass: string;
  isActive: boolean;
  onClick: () => void;
};

const AudienceCard: React.FC<AudienceCardProps> = ({ headline, description, colorClass }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`cursor-pointer rounded-xl p-6 text-white shadow-lg transition duration-300 ease-in-out transform hover:scale-105 ${colorClass}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <h3 className="text-xl font-bold mb-2 text-center">{headline}</h3>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="text-sm leading-relaxed text-center"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AudienceCard;
