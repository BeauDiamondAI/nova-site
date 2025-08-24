import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AudienceCard.css";

export interface AudienceCardProps {
  icon: string;
  title: string;
  description: string;
  color: {
    primary: string;
    glow: string;
    accent: string;
  };
  index: number;
  isActive: boolean;
  onClick: () => void;
}

export const AudienceCard: React.FC<AudienceCardProps> = ({
  icon,
  title,
  description,
  color,
  index,
  isActive,
  onClick,
}) => {
  // Elite spring physics from Vercel/Rauno - SLOWER for smooth expansion
  const springConfig = {
    type: "spring",
    stiffness: 200,  // Reduced from 400 for slower expansion
    damping: 30,      // Increased from 25 for smoother motion
    mass: 1           // Increased from 0.5 for more weight
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        ...springConfig,
        delay: index * 0.08
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: springConfig
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  return (
    <motion.div
      className={`audience-card ${isActive ? "active" : ""}`}
      style={{
        "--card-primary": color.primary,
        "--card-glow": color.glow,
        "--card-accent": color.accent,
        borderColor: isActive ? color.accent : undefined,
        boxShadow: isActive ? `0 0 60px ${color.glow}` : undefined
      } as React.CSSProperties}
      custom={index}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      variants={cardVariants}
      onClick={onClick}
    >
      {/* Glass shimmer effect - only on active cards */}
      {isActive && (
        <div className="glass-shimmer-subtle" />
      )}
      
      {/* Animated border glow - travels around the card */}
      {isActive && (
        <div className="border-glow-animated" />
      )}
      
      {/* Glow effect layer */}
      <motion.div 
        className="card-glow-layer"
        animate={{
          opacity: isActive ? 1 : 0.5
        }}
        transition={springConfig}
      />

      {/* Card Content */}
      <div className="card-content">
        <motion.div 
          className="card-icon"
          animate={{
            scale: isActive ? 1.1 : 1,
            rotate: isActive ? 5 : 0
          }}
          transition={springConfig}
        >
          {icon}
        </motion.div>
        
        <h3 className="card-title">{title}</h3>
        
        <AnimatePresence mode="wait">
          {isActive && (
            <motion.p
              className="card-description"
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: 1, 
                height: "auto"
              }}
              exit={{ 
                opacity: 0, 
                height: 0
              }}
              transition={{
                duration: 0.8,
                ease: "easeInOut"
              }}
            >
              {description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive hover beam effect */}
      <motion.div 
        className="hover-beam"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};