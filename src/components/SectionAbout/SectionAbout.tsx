'use client';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import React, { useRef, useState, useEffect } from 'react';
import './SectionAbout.css';

// Section-specific comet trail for mouse tracking inside cards
interface CardCometTrailProps {
  isActive: boolean;
  cardRef: React.RefObject<HTMLDivElement | null>;
  colorRgb?: string;
}

const CardCometTrail: React.FC<CardCometTrailProps> = ({ 
  isActive, 
  cardRef,
  colorRgb = '6, 182, 212'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    size: number;
  }>>([]);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!isActive || !cardRef?.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cardRect = cardRef.current.getBoundingClientRect();
    canvas.width = cardRect.width;
    canvas.height = cardRect.height;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      if (e.clientX >= rect.left && e.clientX <= rect.right &&
          e.clientY >= rect.top && e.clientY <= rect.bottom) {
        
        mouseRef.current.prevX = mouseRef.current.x;
        mouseRef.current.prevY = mouseRef.current.y;
        mouseRef.current.x = e.clientX - rect.left;
        mouseRef.current.y = e.clientY - rect.top;
        
        // Create subtle trail particles
        if (Math.random() > 0.1) { // More frequent particle creation
          particlesRef.current.push({
            x: mouseRef.current.x,
            y: mouseRef.current.y,
            vx: (Math.random() - 0.5) * 1.2,
            vy: (Math.random() - 0.5) * 1.2,
            life: 1.0,
            size: Math.random() * 4 + 2
          });
        }
        
        if (particlesRef.current.length > 60) {
          particlesRef.current = particlesRef.current.slice(-60);
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.015;
        
        if (particle.life <= 0) return false;
        
        const opacity = particle.life * 0.8; // Much more visible opacity
        ctx.beginPath();
        ctx.fillStyle = `rgba(${colorRgb}, ${opacity})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgba(${colorRgb}, ${opacity * 0.8})`;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow
        
        return true;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, cardRef, colorRgb]);

  if (!isActive || !cardRef?.current) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
};

// Animated text content component
interface AnimatedContentProps {
  isVisible: boolean;
  children: React.ReactNode[];
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({ isVisible, children }) => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      transition: { duration: 0.3 }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      style={{ position: 'relative', zIndex: 2 }}
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default function SectionAbout() {
  const ref = useRef<HTMLElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [75, -75]), {
    stiffness: 40,
    damping: 12,
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.2, 1, 1]);

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  };

  const handleCardClick = (cardId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  return (
    <section
      ref={ref}
      className="relative w-full text-white min-h-screen pt-32 pb-16 sm:pb-32 px-6 flex flex-col items-center justify-center text-center overflow-visible"
    >
      {/* Background layers */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-25"
        >
          <source
            src="/images/SectionAboutMedia/SectionAboutVideo2.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div
        className="pointer-events-none absolute inset-0 w-full h-full z-10"
        style={{
          backgroundImage: `url('/images/SectionAboutBlueWave.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.2,
        }}
      />
  
      <div className="absolute inset-0 bg-black opacity-20 z-20 pointer-events-none" />  

      {/* Content */}
      <motion.div
        className="relative z-50 max-w-6xl px-4 w-full"
        style={{ y, opacity }}
      >
        <h2 className="text-4xl sm:text-5xl font-bold font-headline mb-12">
          Thinks Deeper. Moves Faster. Deploys Intelligently.
        </h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants}
          custom={0}
          className="mb-16"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 leading-tight borna-medium">
            NovaThink is building the <span className="text-cyan-400">cognitive operating system</span> for the AI era.
          </h3>
        </motion.div>

        {/* Flippable Cards */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16 justify-center">
          {/* Card 1 */}
          <motion.div
            ref={card1Ref}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            custom={1}
            className={`flip-card-container flex-1 max-w-lg ${
              flippedCards.has('card1') ? 'flipped' : ''
            } ${hoveredCard === 'card1' ? 'hover' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick('card1');
            }}
            onMouseEnter={() => setHoveredCard('card1')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flip-card-inner">
              {/* Front Face */}
              <div className="flip-card-front glassmorphic-card-face">
                <h4 className="text-xl font-bold text-cyan-400 tracking-wide uppercase text-center borna-regular">
                  The Cognitive OS Layer Between LLMs and Execution
                </h4>
              </div>
              
              {/* Back Face */}
              <div className="flip-card-back scrollable glassmorphic-card-face">
                <CardCometTrail 
                  isActive={flippedCards.has('card1')} 
                  cardRef={card1Ref}
                />
                <AnimatedContent isVisible={flippedCards.has('card1')}>
                  <h4 className="text-lg font-bold text-cyan-400 mb-4 tracking-wide uppercase borna-regular">
                    The Cognitive OS Layer Between LLMs and Execution
                  </h4>
                  <p className="mb-6 text-base sm:text-lg leading-relaxed">
                    Where today{`'`}s large language models offer <span className="text-cyan-400">raw capacity</span>, NovaThink provides the <em className="text-cyan-300">meta-layer</em> that unlocks their full potential {`—`} transforming reactive tools into <span className="text-cyan-400">adaptive, persistent intelligences</span> capable of reasoning, remembering, and orchestrating action at scale.
                  </p>
                  <p className="text-base sm:text-lg leading-relaxed">
                    Today{`'`}s LLMs are <span className="text-cyan-400">not bottlenecked by training data or compute</span>. They are bottlenecked by lack of structure {`—`} missing the <span className="text-cyan-400">multi-step reasoning frameworks</span> and cognitive scaffolding required to sustain real-world complexity in domains like <span className="text-cyan-400">strategy, research, policy, defense, and executive operations</span>.
                  </p>
                </AnimatedContent>
              </div>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            ref={card2Ref}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            custom={2}
            className={`flip-card-container flex-1 max-w-lg ${
              flippedCards.has('card2') ? 'flipped' : ''
            } ${hoveredCard === 'card2' ? 'hover' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick('card2');
            }}
            onMouseEnter={() => setHoveredCard('card2')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flip-card-inner">
              {/* Front Face */}
              <div className="flip-card-front glassmorphic-card-face">
                <h4 className="text-xl font-bold text-cyan-400 tracking-wide uppercase text-center borna-regular">
                  Built for Mission-Critical Cognitive Infrastructure
                </h4>
              </div>
              
              {/* Back Face */}
              <div className="flip-card-back glassmorphic-card-face">
                <CardCometTrail 
                  isActive={flippedCards.has('card2')} 
                  cardRef={card2Ref}
                />
                <AnimatedContent isVisible={flippedCards.has('card2')}>
                  <h4 className="text-lg font-bold text-cyan-400 mb-4 tracking-wide uppercase borna-regular">
                    Built for Mission-Critical Cognitive Infrastructure
                  </h4>
                  <p className="mb-6 text-base leading-relaxed">
                    NovaThink closes the gap between <span className="text-cyan-400">possible and actual</span>.
                  </p>
                  <p className="mb-6 text-base leading-relaxed">
                    Our innovation is <span className="text-cyan-400">proprietary cognitive scaffolding</span> that amplifies intelligence <span className="text-cyan-400">without adding token overhead</span> {`—`} restructuring rather than inflating. The result is orders-of-magnitude <span className="text-cyan-400">increases in reasoning depth, continuity, and adaptive execution</span>. This isn{`'`}t more baggage for models to carry, but a <span className="text-cyan-400">precision cognitive OS layer</span> that transforms <span className="text-cyan-400">latent potential into actual intelligence</span> {`—`} persistent, stateful, and ready for mission-critical objectives.
                  </p>
                  <p className="mb-4 text-base leading-relaxed">
                    All of this is delivered through <span className="text-cyan-400">enterprise-grade infrastructure</span>:
                  </p>
                  <ul className="text-left space-y-2 text-sm leading-relaxed text-slate-200">
                    <li>• <span className="text-cyan-400">Fully isolated, encrypted VPC deployments</span> for uncompromising data security</li>
                    <li>• <span className="text-cyan-400">Multi-model backends</span> (OpenAI, Anthropic, open-source) for <span className="text-cyan-400">continuity and resilience</span></li>
                    <li>• <span className="text-cyan-400">Compliance engineered</span> from the ground up {`—`} <span className="text-cyan-400">SOC 2, ISO 27001</span>, and beyond</li>
                  </ul>
                </AnimatedContent>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Closing Subheadline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants}
          custom={3}
          className="mb-8"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight borna-medium">
            <span className="text-cyan-400">NovaThink is something fundamentally new:</span>
          </h3>
          <p className="text-xl leading-relaxed max-w-4xl mx-auto">
            An LLM-agnostic cognitive OS {`—`} the intelligence amplification layer that will define how humans and AI collaborate over the next decade.
          </p>
        </motion.div>
      </motion.div>

      {/* Cyan Accent Line */}
      <div className="h-[3px] mx-auto mt-12 bg-cyan-400 rounded-full shadow-[0_0_20px_5px_rgba(34,211,238,0.5)] w-1/4 z-60" />
    </section>
  );
}