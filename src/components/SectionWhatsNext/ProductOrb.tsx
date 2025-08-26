import React, { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductData } from "./productsData";
import "./ProductOrb.css";

interface ProductOrbProps {
  product: ProductData;
  position: { x: number; y: number; ring: number };
  isExpanded: boolean;
  onClick: () => void;
  index: number;
}

export const ProductOrb = forwardRef<HTMLDivElement, ProductOrbProps>(
  ({ product, position, isExpanded, onClick, index }, ref) => {
    // CBF v1.1 spring physics configuration
    const springConfig = {
      type: "spring" as const,
      stiffness: 300,
      damping: 25,
      duration: 0.5
    };

    const expansionSpringConfig = {
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
      duration: 0.6
    };

    // Morphing animation variants
    const morphingVariants = {
      orb: {
        width: 160,
        height: 160,
        borderRadius: "50%",
        scale: 1,
        zIndex: 10,
        transition: springConfig
      },
      card: {
        width: 400,
        height: 320,
        borderRadius: 16,
        scale: 1,
        zIndex: 100,
        transition: expansionSpringConfig
      }
    };

    // Staggered entrance animation
    const entranceVariants = {
      hidden: {
        opacity: 0,
        scale: 0,
        rotate: -180
      },
      visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
          delay: index * 0.15,
          ...springConfig
        }
      }
    };

    // Floating animation for orbs only
    const floatingVariants = {
      floating: {
        y: [0, -8, 0],
        rotate: [0, 2, 0, -2, 0],
        transition: {
          duration: 4 + (index * 0.5),
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    };

    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onClick();
    };

    return (
      <>
        {/* Floating tagline label - only visible when not expanded */}
        <AnimatePresence>
          {!isExpanded && (
            <motion.div
              className="product-tagline"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.8 + (index * 0.15) }}
              style={{
                position: "absolute",
                left: position.x - 40,
                top: position.y - 120,
                zIndex: 5
              }}
            >
              <div className="tagline-content">
                {product.title}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main orb/card morphing container */}
        <motion.div
          ref={ref}
          layoutId={`product-${product.id}`}
          className={`product-orb ${isExpanded ? 'expanded' : ''}`}
          style={{
            position: "absolute",
            left: isExpanded ? "50%" : `${position.x}%`,
            top: isExpanded ? "50%" : `${position.y}%`,
            transform: isExpanded ? "translate(-50%, -50%)" : "translate(-50%, -50%)",
            "--orb-color": product.color,
            "--orb-color-rgb": product.colorRgb,
            "--orb-accent": product.accentColor,
            zIndex: isExpanded ? 1000 : 10
          } as React.CSSProperties}
          initial="hidden"
          animate="visible"
          variants={entranceVariants}
          onClick={handleClick}
        >
          {/* Orb state */}
          {!isExpanded && (
            <motion.div
              className="orb-container"
              variants={floatingVariants}
              animate="floating"
              whileHover={{
                scale: 1.05,
                y: -12,
                transition: springConfig
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 }
              }}
            >
              <div className="orb-inner">
                <div className="orb-highlight" />
              </div>
            </motion.div>
          )}

          {/* Expanded card state */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="expanded-card"
                initial="orb"
                animate="card"
                exit="orb"
                variants={morphingVariants}
              >
                {/* Card header */}
                <motion.div
                  className="card-header"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <h3 className="card-title">{product.title}</h3>
                  <p className="card-tagline">{product.tagline}</p>
                </motion.div>

                {/* Card content */}
                <motion.div
                  className="card-content"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div 
                    className="card-description"
                    dangerouslySetInnerHTML={{ 
                      __html: product.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                    }}
                  />
                </motion.div>

                {/* Close button */}
                <motion.button
                  className="close-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span>×</span>
                </motion.button>

                {/* Featured badge for flagship products */}
                {product.featured && (
                  <motion.div
                    className="featured-badge"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    Flagship
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Background blur overlay when expanded */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="card-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={handleClick}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </>
    );
  }
);

ProductOrb.displayName = "ProductOrb";