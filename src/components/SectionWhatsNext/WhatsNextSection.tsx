import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductOrb } from "./ProductOrb";
import { productsData } from "./productsData";

const WhatsNextSection: React.FC = () => {
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [isTextComplete, setIsTextComplete] = useState(false);
  const [isTextCollapsed, setIsTextCollapsed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const paragraphs = [
    "The future of AI isn't more apps. It's the emergence of a cognitive operating system - a new layer of intelligence that makes strategy, execution, and adaptation seamless across every domain.",
    "That's what NovaThink is building. Not tools, but the scaffolding for an entirely new relationship between human and synthetic intelligence."
  ];

  // Simple intersection observer to trigger content
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !showContent) {
          setShowContent(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [showContent]);

  // Text streaming effect - left to right, word by word
  useEffect(() => {
    if (!showContent) return;

    const streamText = () => {
      if (currentParagraph >= paragraphs.length) {
        setIsTextComplete(true);
        return;
      }

      const currentParagraphText = paragraphs[currentParagraph];
      const words = currentParagraphText.split(' ');
      let wordIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (wordIndex <= words.length) {
          setDisplayedText(() => {
            const allPreviousParagraphs = paragraphs.slice(0, currentParagraph).join('\n\n');
            const currentText = words.slice(0, wordIndex).join(' ');
            return allPreviousParagraphs + (allPreviousParagraphs ? '\n\n' : '') + currentText;
          });
          wordIndex++;
        } else {
          clearInterval(typeInterval);
          setCurrentParagraph(prevParagraph => prevParagraph + 1);
        }
      }, 100); // Slower for word-by-word streaming

      return () => clearInterval(typeInterval);
    };

    const timer = setTimeout(streamText, 800); // Delay before starting
    return () => clearTimeout(timer);
  }, [showContent, currentParagraph, paragraphs]);

  // Upward V-shaped arc - curves up and out from center
  const getOrbPosition = (index: number) => {
    const totalOrbs = productsData.length;
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    
    const centerX = screenWidth / 2;
    const centerY = screenHeight / 2;
    
    // Create a V-shape that curves upward from center
    const arcWidth = Math.min(screenWidth * 0.8, 1300);
    const arcHeight = 100; // How much the ends lift up
    const baseY = centerY + 160; // Moved down by about one orb length (80px more)
    
    const progress = index / (totalOrbs - 1); // 0 to 1
    const x = centerX - arcWidth / 2 + progress * arcWidth;
    
    // V-shape: distance from center determines height
    const distanceFromCenter = Math.abs(progress - 0.5) * 2; // 0 at center, 1 at edges
    const y = baseY - arcHeight * distanceFromCenter;
    
    return { x, y };
  };

  const handleOrbClick = (productId: string) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
  };

  const toggleTextExpansion = () => {
    setIsTextCollapsed(!isTextCollapsed);
    // Reset text states when expanding
    if (isTextCollapsed) {
      setDisplayedText(paragraphs.join('\n\n'));
      setCurrentParagraph(paragraphs.length);
      setIsTextComplete(true);
    }
  };

  const renderStreamingText = () => {
    if (isTextCollapsed) {
      // Show first third of both paragraphs combined with expand button
      const allText = paragraphs.join(' ');
      const thirdPoint = Math.floor(allText.length / 3);
      const visibleText = allText.slice(0, thirdPoint).trim() + "...";
      
      return (
        <div>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'rgba(255, 255, 255, 0.85)',
            lineHeight: 1.6,
            margin: '0 0 1rem 0',
            fontWeight: 400
          }}>
            {visibleText}
          </p>
          <button
            onClick={toggleTextExpansion}
            style={{
              background: 'rgba(6, 182, 212, 0.2)',
              border: '1px solid rgba(6, 182, 212, 0.5)',
              borderRadius: '20px',
              color: '#06B6D4',
              fontSize: '0.9rem',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              margin: '0 auto'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(6, 182, 212, 0.3)';
              e.currentTarget.style.borderColor = '#06B6D4';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(6, 182, 212, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.5)';
            }}
          >
            Read More 
            <span style={{ transform: 'rotate(90deg)', fontSize: '0.8rem' }}>→</span>
          </button>
        </div>
      );
    }

    return (
      <div>
        {displayedText.split('\n\n').filter(p => p.trim()).map((paragraph, index) => (
          <p key={index} style={{
            fontSize: index === 0 ? 'clamp(1rem, 2vw, 1.2rem)' : 'clamp(0.95rem, 1.8vw, 1.1rem)',
            color: index === 0 ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.75)',
            lineHeight: 1.6,
            margin: index === 0 ? '0 0 1rem 0' : 0,
            fontWeight: 400
          }}>
            {paragraph}
            {index === displayedText.split('\n\n').filter(p => p.trim()).length - 1 && 
             currentParagraph < paragraphs.length && (
              <span style={{
                display: 'inline-block',
                width: '2px',
                height: '1.2em',
                backgroundColor: '#06B6D4',
                marginLeft: '4px',
                animation: 'blink 1s infinite'
              }} />
            )}
          </p>
        ))}
        {isTextComplete && (
          <button
            onClick={toggleTextExpansion}
            style={{
              background: 'rgba(6, 182, 212, 0.2)',
              border: '1px solid rgba(6, 182, 212, 0.5)',
              borderRadius: '20px',
              color: '#06B6D4',
              fontSize: '0.9rem',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              margin: '1rem auto 0 auto',
              opacity: 0,
              animation: 'fadeIn 0.5s ease 1s forwards'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(6, 182, 212, 0.3)';
              e.currentTarget.style.borderColor = '#06B6D4';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(6, 182, 212, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.5)';
            }}
          >
            Collapse 
            <span style={{ transform: 'rotate(-90deg)', fontSize: '0.8rem' }}>→</span>
          </button>
        )}
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="whats-next-section"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        isolation: 'isolate',
        zIndex: 1
      }}
    >
      {/* Scoped keyframes just for this section */}
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      
      {/* Earth Background Video */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1
      }}>
        <video
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            minWidth: '100%',
            minHeight: '100%',
            transform: 'translate(-50%, -50%)',
            objectFit: 'cover',
            willChange: 'auto'
          }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/images/SectionWhatsNextMedia/WhatsNext.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Background overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(15, 23, 42, 0.6) 50%, rgba(0, 0, 0, 0.5) 100%)',
        zIndex: 2
      }} />

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={showContent ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{
          position: 'absolute',
          top: '60px',
          left: 0,
          right: 0,
          zIndex: 10,
          textAlign: 'center',
          width: '100%'
        }}
      >
        <h2 className="text-4xl sm:text-5xl font-bold font-headline mb-5" style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 800,
          color: '#ffffff',
          margin: '0 0 1.5rem 0',
          background: 'linear-gradient(135deg, #ffffff 0%, rgba(6, 182, 212, 0.9) 50%, #ffffff 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 30px rgba(6, 182, 212, 0.3)',
          letterSpacing: '-0.02em'
        }}>
          What&apos;s Next at NovaThink
        </h2>
        
        {/* Streaming intro text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 2rem'
          }}
        >
          {renderStreamingText()}
        </motion.div>
      </motion.div>

      {/* Product Orbs - Show only after text is complete */}
      <AnimatePresence>
        {showContent && isTextComplete && (
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            zIndex: 10
          }}>
            {productsData.map((product, index) => {
              const position = getOrbPosition(index);
              return (
                <ProductOrb
                  key={product.id}
                  product={product}
                  position={position}
                  isExpanded={expandedProductId === product.id}
                  hasExpandedCard={expandedProductId !== null}
                  onClick={() => handleOrbClick(product.id)}
                  index={index}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WhatsNextSection;