import React, { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ProductData } from "./productsData";

interface MobileProductCarouselProps {
  products: ProductData[];
}

export const MobileProductCarousel: React.FC<MobileProductCarouselProps> = ({
  products
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const swipeThreshold = 50;

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    
    // Swipe left (next)
    if (offset.x < -swipeThreshold || velocity.x < -500) {
      if (currentIndex < products.length - 1) {
        setDirection(1);
        setCurrentIndex(prev => prev + 1);
      }
    }
    // Swipe right (previous)
    else if (offset.x > swipeThreshold || velocity.x > 500) {
      if (currentIndex > 0) {
        setDirection(-1);
        setCurrentIndex(prev => prev - 1);
      }
    }
  };

  const goToIndex = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const currentProduct = products[currentIndex];
  const nextProduct = products[currentIndex + 1];
  const prevProduct = products[currentIndex - 1];

  // Animation variants for the card - simple slide, no morph
  const cardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0
    })
  };

  return (
    <div style={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1.5rem",
      padding: "0 1rem",
      position: "relative"
    }}>
      {/* Carousel Container */}
      <div style={{
        position: "relative",
        width: "100%",
        height: 340,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible"
      }}>
        {/* Previous Orb (peeking from left) */}
        <AnimatePresence>
          {prevProduct && (
            <motion.div
              key={`prev-${prevProduct.id}`}
              initial={{ opacity: 0, x: -20, scale: 0.8 }}
              animate={{ opacity: 0.6, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              onClick={() => goToIndex(currentIndex - 1)}
              style={{
                position: "absolute",
                left: -20,
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4), ${prevProduct.color} 40%, #1f2937 85%, #0f172a 100%)`,
                boxShadow: `
                  inset 0 1px 2px rgba(255, 255, 255, 0.5),
                  0 0 15px rgba(${prevProduct.colorRgb}, 0.4),
                  0 4px 12px rgba(0, 0, 0, 0.3)
                `,
                cursor: "pointer",
                zIndex: 5
              }}
            >
              {/* Inner highlight */}
              <div style={{
                position: "absolute",
                top: "15%",
                left: "25%",
                width: "30%",
                height: "30%",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 70%)"
              }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Card (Swipeable) */}
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentProduct.id}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: "tween",
              ease: "easeOut",
              duration: 0.3
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            style={{
              width: "calc(100% - 60px)",
              maxWidth: 340,
              minHeight: 280,
              background: "linear-gradient(135deg, rgba(17, 24, 39, 0.4) 0%, rgba(30, 41, 59, 0.35) 50%, rgba(15, 23, 42, 0.4) 100%)",
              backdropFilter: "blur(25px) saturate(180%) brightness(1.1)",
              WebkitBackdropFilter: "blur(25px) saturate(180%) brightness(1.1)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderTop: "1px solid rgba(255, 255, 255, 0.25)",
              boxShadow: `
                0 8px 32px rgba(0, 0, 0, 0.3),
                0 0 40px rgba(${currentProduct.colorRgb}, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              `,
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              cursor: "grab",
              touchAction: "pan-y",
              zIndex: 10,
              position: "relative",
              overflow: "hidden"
            }}
            whileTap={{ cursor: "grabbing" }}
          >
            {/* Color accent bar */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: `linear-gradient(90deg, transparent, ${currentProduct.accentColor}, transparent)`,
              opacity: 0.8
            }} />

            {/* Card Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              style={{ marginBottom: "1rem" }}
            >
              <h3 style={{
                fontSize: "1.35rem",
                fontWeight: 800,
                color: "#fff",
                margin: "0 0 0.4rem 0",
                lineHeight: 1.2
              }}>
                {currentProduct.title}
              </h3>
              <p style={{
                fontSize: "0.95rem",
                fontWeight: 600,
                color: currentProduct.accentColor,
                margin: 0
              }}>
                {currentProduct.tagline}
              </p>
            </motion.div>

            {/* Card Content */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              style={{
                flex: 1,
                overflowY: "auto"
              }}
            >
              <div
                style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.6,
                  color: "rgba(255, 255, 255, 0.85)"
                }}
                dangerouslySetInnerHTML={{
                  __html: currentProduct.description.replace(
                    /\*\*(.*?)\*\*/g,
                    '<strong style="color: rgba(255, 255, 255, 0.95); font-weight: 700;">$1</strong>'
                  )
                }}
              />
            </motion.div>

            {/* Swipe hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "1rem",
                color: "rgba(255, 255, 255, 0.4)",
                fontSize: "0.75rem"
              }}
            >
              {currentIndex > 0 && <span>←</span>}
              <span>Swipe to explore</span>
              {currentIndex < products.length - 1 && <span>→</span>}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Next Orb (peeking from right) */}
        <AnimatePresence>
          {nextProduct && (
            <motion.div
              key={`next-${nextProduct.id}`}
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 0.7, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              onClick={() => goToIndex(currentIndex + 1)}
              style={{
                position: "absolute",
                right: -20,
                width: 70,
                height: 70,
                borderRadius: "50%",
                background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4), ${nextProduct.color} 40%, #1f2937 85%, #0f172a 100%)`,
                boxShadow: `
                  inset 0 1px 2px rgba(255, 255, 255, 0.5),
                  0 0 20px rgba(${nextProduct.colorRgb}, 0.5),
                  0 4px 12px rgba(0, 0, 0, 0.3)
                `,
                cursor: "pointer",
                zIndex: 5
              }}
            >
              {/* Inner highlight */}
              <div style={{
                position: "absolute",
                top: "15%",
                left: "25%",
                width: "30%",
                height: "30%",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 70%)"
              }} />
              
              {/* Subtle pulsing glow animation */}
              <motion.div
                animate={{
                  boxShadow: [
                    `0 0 20px rgba(${nextProduct.colorRgb}, 0.3)`,
                    `0 0 30px rgba(${nextProduct.colorRgb}, 0.5)`,
                    `0 0 20px rgba(${nextProduct.colorRgb}, 0.3)`
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  position: "absolute",
                  inset: -2,
                  borderRadius: "50%",
                  pointerEvents: "none"
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dot Indicators */}
      <div style={{
        display: "flex",
        gap: "0.5rem",
        justifyContent: "center",
        alignItems: "center"
      }}>
        {products.map((product, index) => (
          <motion.button
            key={product.id}
            onClick={() => goToIndex(index)}
            animate={{
              scale: index === currentIndex ? 1.2 : 1,
              backgroundColor: index === currentIndex 
                ? product.accentColor 
                : "rgba(255, 255, 255, 0.3)"
            }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: index === currentIndex ? 24 : 8,
              height: 8,
              borderRadius: 4,
              border: "none",
              cursor: "pointer",
              transition: "width 0.3s ease"
            }}
          />
        ))}
      </div>

      {/* Product counter */}
      <div style={{
        fontSize: "0.8rem",
        color: "rgba(255, 255, 255, 0.5)",
        textAlign: "center"
      }}>
        {currentIndex + 1} of {products.length}
      </div>
    </div>
  );
};

export default MobileProductCarousel;