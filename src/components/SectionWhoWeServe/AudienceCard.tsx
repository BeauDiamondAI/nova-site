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
  
  // Detect mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Elite spring physics
  const springConfig = {
    type: "spring",
    stiffness: 300,
    damping: 25,
    mass: 1.2
  };

  // SIMPLIFIED glow timing - let's see if this stops the flicker
  useEffect(() => {
    if (isActive) {
      setShowIntenseGlow(true);
      
      const dimTimer = setTimeout(() => {
        setShowIntenseGlow(false);
      }, 4000);
      
      return () => clearTimeout(dimTimer);
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
      {/* Shimmer removed for now - will revisit later */}
      
      {/* SIMPLIFIED glow - try CSS-only approach on mobile */}
      {!isMobile ? (
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
      ) : (
        // Mobile: Pure CSS glow to prevent flicker
        <div className="card-glow-layer" />
      )}

      {/* Card Content */}
      <motion.div className="card-content">
        <motion.div 
          className="card-icon"
          animate={{
            scale: isActive ? 1.1 : 1,
            rotate: isActive ? 5 : 0
          }}
          transition={springConfig}
        >
          {/* Use custom PNG icons for all cards */}
          {index === 0 ? (
            <img 
              src="/images/SectionWhoWeServeMedia/Card1.png" 
              alt="Founders & Creators"
              className="card-icon-svg"
            />
          ) : index === 1 ? (
            <img 
              src="/images/SectionWhoWeServeMedia/Card2.png" 
              alt="Operators & Teams"
              className="card-icon-svg"
            />
          ) : index === 2 ? (
            <img 
              src="/images/SectionWhoWeServeMedia/Card3.png" 
              alt="Tech & Data Teams"
              className="card-icon-svg"
            />
          ) : index === 3 ? (
            <img 
              src="/images/SectionWhoWeServeMedia/Card4.png" 
              alt="Enterprises"
              className="card-icon-svg"
            />
          ) : index === 4 ? (
            <img 
              src="/images/SectionWhoWeServeMedia/Card5.png" 
              alt="Scaling Organizations"
              className="card-icon-svg"
            />
          ) : (
            icon
          )}
        </motion.div>
        
        <h3 className="card-title">{title}</h3>
        
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
                delay: 0.2
              }}
            >
              {description}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Hover beam */}
      <motion.div 
        className="hover-beam"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};