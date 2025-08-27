import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductData } from "./productsData";
import { MouseHalo } from "./MouseHalo";

interface ProductOrbProps {
  product: ProductData;
  position: { x: number; y: number };
  isExpanded: boolean;
  hasExpandedCard: boolean;
  onClick: () => void;
  index: number;
}

export const ProductOrb: React.FC<ProductOrbProps> = ({
  product,
  position,
  isExpanded,
  hasExpandedCard,
  onClick,
  index
}) => {
  // Clean spring physics from CBF v1.1
  const springConfig = {
    type: "spring" as const,
    stiffness: 300,
    damping: 25,
    duration: 0.5
  };

  // Increased orb size - 30% larger than original 80px
  const orbSize = 104;
  const orbOffset = orbSize / 2; // 52px offset for centering
  
  // Ref for the expanded card to track mouse halo
  const expandedCardRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* Mouse Halo Effect */}
      <MouseHalo
        targetElements={[expandedCardRef.current]}
        isActive={isExpanded}
        colorRgb={product.colorRgb}
      />
      {/* Simple Floating Label - Only show when no cards are expanded */}
      <AnimatePresence>
        {!hasExpandedCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.1 } }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.2 }}
            style={{
              position: "absolute",
              left: position.x - (product.title.length * 4), // Dynamic positioning based on text length
              top: position.y - 120,
              zIndex: 5,
              pointerEvents: 'none'
            }}
          >
            <div style={{
              background: 'rgba(17, 24, 39, 0.9)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 8,
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.9)',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              boxShadow: `0 4px 12px rgba(0, 0, 0, 0.3), 0 0 20px rgba(${product.colorRgb}, 0.2)`,
              position: 'relative'
            }}>
              {product.title}
              {/* Connecting line */}
              <div style={{
                content: '""',
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 2,
                height: 20,
                background: `linear-gradient(to bottom, rgba(${product.colorRgb}, 0.6), transparent)`
              }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Orb - Only show when not expanded - Now using larger size */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            onClick={onClick}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { 
                delay: index * 0.1,
                ...springConfig
              }
            }}
            exit={{ opacity: 0, scale: 0, transition: { duration: 0.1 } }}
            whileHover={{ scale: 1.1, y: -8 }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: "absolute",
              left: position.x - orbOffset,
              top: position.y - orbOffset,
              width: orbSize,
              height: orbSize,
              borderRadius: "50%",
              background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4), ${product.color} 40%, #1f2937 85%, #0f172a 100%)`,
              boxShadow: `
                inset 0 1px 3px rgba(255, 255, 255, 0.6),
                inset 0 -1px 3px rgba(0, 0, 0, 0.4),
                0 0 20px rgba(${product.colorRgb}, 0.5),
                0 8px 20px rgba(0, 0, 0, 0.3),
                0 0 2px rgba(255, 255, 255, 0.2)
              `,
              cursor: "pointer",
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Inner highlight with floating animation */}
            <motion.div 
              style={{
                position: 'absolute',
                top: '15%',
                left: '25%',
                width: '30%',
                height: '30%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 70%)'
              }}
              animate={{
                y: [0, -4, 0],
                transition: {
                  duration: 3 + index * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Card with Smooth Morphing */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            ref={expandedCardRef}
            initial={{ 
              width: 120,
              height: 120,
              borderRadius: 16,
              left: position.x - 60,
              top: position.y - 60,
              opacity: 1
            }}
            animate={{ 
              width: 400,
              height: 320,
              borderRadius: 16,
              left: '50%',
              top: '52%', // Moved down from 45% to avoid text button overlap
              x: '-50%',
              y: '-50%',
              opacity: 1
            }}
            exit={{ 
              width: 120,
              height: 120,
              borderRadius: 16,
              left: position.x - 60,
              top: position.y - 60,
              x: 0,
              y: 0,
              opacity: 0
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              duration: 0.6
            }}
            style={{
              position: "absolute", // Changed from "fixed" to "absolute"
              background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.3) 0%, rgba(30, 41, 59, 0.25) 50%, rgba(15, 23, 42, 0.3) 100%)', // More transparent
              backdropFilter: 'blur(25px) saturate(200%) brightness(1.1)', // Enhanced blur and effects
              WebkitBackdropFilter: 'blur(25px) saturate(200%) brightness(1.1)', // Safari support
              border: `1px solid rgba(255, 255, 255, 0.2)`, // More visible glass border
              borderTop: `1px solid rgba(255, 255, 255, 0.3)`, // Brighter top edge
              borderLeft: `1px solid rgba(255, 255, 255, 0.15)`, // Subtle left highlight
              boxShadow: `
                0 0 0 1px rgba(255, 255, 255, 0.1),
                0 8px 32px rgba(0, 0, 0, 0.3),
                0 16px 64px rgba(0, 0, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.25),
                inset 0 -1px 0 rgba(0, 0, 0, 0.1),
                0 0 40px rgba(${product.colorRgb}, 0.2)
              `,
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 50
            }}
          >
            {/* Mouse Halo Effect - Now inside the card */}
            <MouseHalo
              targetElements={[expandedCardRef.current]}
              isActive={true}
              colorRgb={product.colorRgb}
            />
            {/* Card Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ marginBottom: '1.5rem' }}
            >
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                color: '#fff',
                margin: '0 0 0.5rem 0',
                lineHeight: 1.2
              }}>
                {product.title}
              </h3>
              <p style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: product.accentColor,
                margin: 0,
                opacity: 0.9
              }}>
                {product.tagline}
              </p>
            </motion.div>

            {/* Card Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                flex: 1,
                overflowY: 'auto'
              }}
            >
              <div
                style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  color: 'rgba(255, 255, 255, 0.85)'
                }}
                dangerouslySetInnerHTML={{
                  __html: product.description.replace(/\*\*(.*?)\*\*/g, '<strong style="color: rgba(255, 255, 255, 0.95); font-weight: 700;">$1</strong>')
                }}
              />
            </motion.div>

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                width: 32,
                height: 32,
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1.5rem',
                fontWeight: 300,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              whileHover={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: '#fff',
                rotate: 90
              }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </motion.button>

            {/* Featured Badge - Removed per request */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductOrb;