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
  // Elite spring physics from Vercel/Rauno
  const springConfig = {
    type: "spring",
    stiffness: 400,
    damping: 25,
    mass: 0.5
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
      } as React.CSSProperties}
      custom={index}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      variants={cardVariants}
      onClick={onClick}
    >
      {/* Animated border that travels around frame */}
      {isActive && (
        <svg
          className="border-animation"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            borderRadius: '20px',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          <rect
            x="1"
            y="1"
            width="calc(100% - 2)"
            height="calc(100% - 2)"
            rx="20"
            ry="20"
            fill="none"
            stroke={color.accent}
            strokeWidth="2"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            style={{
              animation: 'drawBorder 1.5s ease-out forwards',
            }}
          />
        </svg>
      )}
      
      {/* Glass shimmer effect */}
      <div className="glass-shimmer" />
      
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
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ 
                opacity: 1, 
                height: "auto",
                y: 0
              }}
              exit={{ 
                opacity: 0, 
                height: 0,
                y: -10
              }}
              transition={{
                ...springConfig,
                opacity: { duration: 0.3 }
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