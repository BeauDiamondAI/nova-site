import React, { useEffect, useState } from "react";
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
  // Track glow dimming state
  const [showIntenseGlow, setShowIntenseGlow] = useState(false);

  // Elite spring physics from CBF v1.0 - Rauno's patterns
  const springConfig = {
    type: "spring",
    stiffness: 300,  // CBF: Vercel's standard
    damping: 25,     // CBF: Balanced motion
    mass: 1.2        // CBF: Slightly heavier for premium feel
  };

  // Handle glow timing - intense glow on click, then gradual 4-second dim
  useEffect(() => {
    if (isActive) {
      // FIXED: Small delay to prevent mobile flicker on state change
      const stabilizeTimer = setTimeout(() => {
        setShowIntenseGlow(true);
      }, 50); // Very short delay to let mobile rendering stabilize
      
      // FIXED: Gradual dim after 4 seconds
      const dimTimer = setTimeout(() => {
        setShowIntenseGlow(false);
      }, 4000);
      
      return () => {
        clearTimeout(stabilizeTimer);
        clearTimeout(dimTimer);
      };
    } else {
      setShowIntenseGlow(false);
    }
  }, [isActive]);

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
      className={`audience-card ${isActive ? "active" : ""} ${showIntenseGlow ? "intense-glow" : ""}`}
      style={{
        "--card-primary": color.primary,
        "--card-glow": color.glow,
        "--card-accent": color.accent
      } as React.CSSProperties}
      custom={index}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      variants={cardVariants}
      onClick={onClick}
    >
      {/* Diagonal shimmer effect - only on active cards */}
      {isActive && (
        <div className="glass-shimmer-subtle" />
      )}
      
      {/* Glow effect layer with mobile-optimized timing */}
      <motion.div 
        className="card-glow-layer"
        animate={{
          opacity: isActive ? (showIntenseGlow ? 1 : 0.4) : 0
        }}
        transition={{
          duration: showIntenseGlow ? 0.3 : 4.0,
          ease: "easeOut"
        }}
      />

      {/* Card Content Container with synchronized expansion */}
      <motion.div 
        className="card-content"
        // REMOVED: No need for height animation here - CSS handles it now
      >
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
        
        {/* Text reveal with synchronized timing */}
        <AnimatePresence mode="wait">
          {isActive && (
            <motion.p
              className="card-description"
              initial={{ 
                opacity: 0, 
                height: 0,
                marginTop: 0
              }}
              animate={{ 
                opacity: 1, 
                height: "auto",
                marginTop: "1rem"
              }}
              exit={{ 
                opacity: 0, 
                height: 0,
                marginTop: 0
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.2 // FIXED: Slightly longer delay to sync with card expansion
              }}
            >
              {description}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Interactive hover beam effect - Rauno's pattern */}
      <motion.div 
        className="hover-beam"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};