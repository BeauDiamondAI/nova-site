import React from "react";
import { motion } from "framer-motion";
import "./AudienceCard.css";

interface AudienceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.15,
      duration: 0.6,
      type: "spring",
      stiffness: 70,
    },
  }),
};

export const AudienceCard: React.FC<AudienceCardProps> = ({
  icon,
  title,
  description,
  index,
  isActive,
  onClick,
}) => {
  return (
    <motion.div
      className={`audience-card ${isActive ? "active" : ""}`}
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      layout
      onClick={onClick}
    >
      <div className="card-content">
        <div className="card-icon">{icon}</div>
        <div className="card-title">{title}</div>
        {isActive && <div className="card-description">{description}</div>}
      </div>
    </motion.div>
  );
};
