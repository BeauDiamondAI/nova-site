// components/SectionWhoWeServe/AudienceCard.tsx

import { motion, AnimatePresence } from 'framer-motion';

type AudienceCardProps = {
  headline: string;
  description: string;
  colorClass: string;
  isActive: boolean;
  onClick: () => void;
};

const AudienceCard: React.FC<AudienceCardProps> = ({
  headline,
  description,
  colorClass,
  isActive,
  onClick,
}) => {
  return (
    <div
      className={`cursor-pointer rounded-xl p-6 text-white shadow-lg transition-all duration-500 transform hover:scale-105 ${colorClass} ${
        isActive ? 'min-h-[280px]' : 'h-[180px]'
      }`}
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
    </div>
  );
};

export default AudienceCard;
