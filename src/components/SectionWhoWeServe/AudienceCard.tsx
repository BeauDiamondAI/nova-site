import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type AudienceCardProps = {
  id: string;
  headline: string;
  description: string;
  colorClass: string;
  isActive: boolean;
  onClick: () => void;
};

const AudienceCard: React.FC<AudienceCardProps> = ({
  id,
  headline,
  description,
  colorClass,
  isActive,
  onClick,
}) => {
  return (
    <motion.div
      layout
      initial={{ borderRadius: 16 }}
      animate={{ borderRadius: isActive ? 24 : 16 }}
      className={`cursor-pointer rounded-xl p-6 text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${colorClass}`}
      onClick={onClick}
    >
      <h3 className="text-xl font-bold mb-2 text-center">{headline}</h3>

      <AnimatePresence>
        {isActive && (
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
    </motion.div>
  );
};

export default AudienceCard;
