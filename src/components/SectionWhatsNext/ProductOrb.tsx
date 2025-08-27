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
            position: "fixed",
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

      {/* Orb - Always visible when not expanded */}
      {!isExpanded && (
        <motion.div
          onClick={onClick}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -4, 0]
          }}
          transition={{
            opacity: { delay: index * 0.1, duration: 0.5 },
            scale: { delay: index * 0.1, duration: 0.5 },
            y: { 
              duration: 3 + index * 0.3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          whileHover={{ scale: 1.1, y: -8 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: "fixed",
            left: position.x - 40,
            top: position.y - 40,
            width: 80,
            height: 80,
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
          {/* Inner highlight */}
          <div style={{
            width: '30%',
            height: '30%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 70%)',
            position: 'absolute',
            top: '15%',
            left: '25%'
          }} />
        </motion.div>
      )}

      {/* Expanded Card - Completely separate from orb */}
      {isExpanded && (
        <motion.div
          initial={{ 
            opacity: 0,
            scale: 0.1,
            x: position.x - 200,
            y: position.y - 160
          }}
          animate={{ 
            opacity: 1,
            scale: 1,
            x: (typeof window !== 'undefined' ? window.innerWidth : 1200) / 2 - 200,
            y: (typeof window !== 'undefined' ? window.innerHeight : 800) / 2 - 160
          }}
          exit={{ 
            opacity: 0,
            scale: 0.1,
            x: position.x - 200,
            y: position.y - 160
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            duration: 0.5
          }}
          style={{
            position: "fixed",
            width: 400,
            height: 320,
            background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
            backdropFilter: 'blur(40px) saturate(180%)',
            border: `1px solid ${product.accentColor}`,
            boxShadow: `
              0 0 0 1px rgba(255, 255, 255, 0.05),
              0 0 60px rgba(${product.colorRgb}, 0.4),
              0 20px 40px rgba(0, 0, 0, 0.5),
              inset 0 1px 0 rgba(255, 255, 255, 0.15)
            `,
            borderRadius: 16,
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 50
          }}
        >
          {/* Card Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
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
            transition={{ delay: 0.3 }}
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
            transition={{ delay: 0.4 }}
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
              transition={{ delay: 0.5 }}
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
        </motion.div>
      )}
    </>
  );
};

export default ProductOrb;