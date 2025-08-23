// components/AudienceCard.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AudienceCard.css";

type AudienceCardProps = {
  id: string;
  isActive: boolean;
  onClick: (id: string) => void;
  headline: string;
  description: string;
  icon?: React.ReactNode;
};

export default function AudienceCard({
  id,
  isActive,
  onClick,
  headline,
  description,
  icon,
}: AudienceCardProps) {
  return (
    <motion.div
      className={`audience-card ${isActive ? "active" : ""}`}
      onClick={() => onClick(id)}
      initial={false}
      animate={{
        scale: isActive ? 1.05 : 1,
        zIndex: isActive ? 2 : 1,
        rotateX: isActive ? 0 : 4,
        rotateY: isActive ? 0 : -4,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <div className="card-glass">
        {icon && <div className="card-icon">{icon}</div>}
        <h3 className="card-headline">{headline}</h3>

        <AnimatePresence>
          {isActive && (
            <motion.div
              className="card-description"
              key="desc"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <p>{description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
