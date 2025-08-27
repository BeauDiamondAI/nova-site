import React from "react";
import { motion } from "framer-motion";
import { ProductData } from "./productsData";

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
  return (
    <>
      {/* Simple Floating Label - Fixed positioning */}
      {!hasExpandedCard && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.6 + index * 0.1, duration: 0.2 }}
          style={{
            position: "absolute",
            left: position.x - 60,
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
            boxShadow: `0 4px 12px rgba(0, 0, 0, 0.3), 0 0 20px rgba(${product.colorRgb}, 0.2)`
          }}>
            {product.title}
          </div>
        </motion.div>
      )}

      {/* Main morphing element - handles both orb and card states */}
      <motion.div
        onClick={onClick}
        initial={
          isExpanded
            ? {
                // Start as small box at orb position
                width: 120,
                height: 120,
                borderRadius: 16,
                left: position.x - 60,
                top: position.y - 60,
                opacity: 1,
                scale: 1
              }
            : {
                // Start as orb
                opacity: 0,
                scale: 0
              }
        }
        animate={
          isExpanded
            ? {
                // Expand to full card at center
                width: 400,
                height: 320,
                borderRadius: 16,
                left: '50%',
                top: '50%',
                x: '-50%',
                y: '-50%',
                opacity: 1,
                scale: 1
              }
            : {
                // Show as orb
                opacity: 1,
                scale: 1
              }
        }
        exit={{
          opacity: 0,
          scale: 0.8
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          duration: 0.6
        }}
        style={{
          position: isExpanded ? "fixed" : "absolute",
          left: isExpanded ? undefined : position.x - 40,
          top: isExpanded ? undefined : position.y - 40,
          width: isExpanded ? undefined : 80,
          height: isExpanded ? undefined : 80,
          borderRadius: isExpanded ? 16 : "50%",
          background: isExpanded 
            ? 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)'
            : `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4), ${product.color} 40%, #1f2937 85%, #0f172a 100%)`,
          backdropFilter: isExpanded ? 'blur(40px) saturate(180%)' : undefined,
          border: isExpanded ? `1px solid ${product.accentColor}` : undefined,
          boxShadow: isExpanded
            ? `
                0 0 0 1px rgba(255, 255, 255, 0.05),
                0 0 60px rgba(${product.colorRgb}, 0.4),
                0 20px 40px rgba(0, 0, 0, 0.5),
                inset 0 1px 0 rgba(255, 255, 255, 0.15)
              `
            : `
                inset 0 1px 3px rgba(255, 255, 255, 0.6),
                inset 0 -1px 3px rgba(0, 0, 0, 0.4),
                0 0 20px rgba(${product.colorRgb}, 0.5),
                0 8px 20px rgba(0, 0, 0, 0.3),
                0 0 2px rgba(255, 255, 255, 0.2)
              `,
          cursor: "pointer",
          zIndex: isExpanded ? 50 : 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isExpanded ? '2rem' : 0,
          flexDirection: isExpanded ? 'column' : undefined,
          overflow: isExpanded ? 'hidden' : 'visible'
        }}
        whileHover={!isExpanded ? { scale: 1.1, y: -8 } : {}}
        whileTap={{ scale: 0.95 }}
      >
        {/* Orb inner highlight - only show when not expanded */}
        {!isExpanded && (
          <motion.div 
            style={{
              width: '30%',
              height: '30%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 70%)',
              position: 'absolute',
              top: '15%',
              left: '25%'
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
        )}

        {/* Card Content - only show when expanded */}
        {isExpanded && (
          <>
            {/* Card Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ 
                marginBottom: '1.5rem',
                width: '100%'
              }}
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
                overflowY: 'auto',
                width: '100%'
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
                justifyContent: 'center'
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

            {/* Featured Badge */}
            {product.featured && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                style={{
                  position: 'absolute',
                  top: '-8px',
                  left: '1rem',
                  background: `linear-gradient(135deg, ${product.accentColor}, rgba(${product.colorRgb}, 0.8))`,
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.25rem 0.75rem',
                  borderRadius: 12,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  boxShadow: `0 4px 12px rgba(${product.colorRgb}, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)`
                }}
              >
                Flagship
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </>
  );
};

export default ProductOrb;