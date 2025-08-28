'use client';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import React, { useRef, useState, useEffect } from 'react';
import './SectionAbout.css';

// Particle explosion component
interface ParticleExplosionProps {
  x: number;
  y: number;
  onComplete: () => void;
}

const ParticleExplosion: React.FC<ParticleExplosionProps> = ({ x, y, onComplete }) => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    angle: (Math.PI * 2 * i) / 30 + Math.random() * 0.5,
    speed: 5 + Math.random() * 10,
    size: 2 + Math.random() * 4
  }));

  return (
    <div 
      style={{
        position: 'fixed',
        left: x,
        top: y,
        pointerEvents: 'none',
        zIndex: 1000
      }}
    >
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          initial={{ 
            x: 0, 
            y: 0, 
            scale: 1, 
            opacity: 1 
          }}
          animate={{ 
            x: Math.cos(particle.angle) * particle.speed * 50,
            y: Math.sin(particle.angle) * particle.speed * 50,
            scale: 0,
            opacity: 0
          }}
          transition={{ 
            duration: 1.2,
            ease: "easeOut"
          }}
          onAnimationComplete={() => {
            if (particle.id === 0) onComplete();
          }}
          style={{
            position: 'absolute',
            width: particle.size,
            height: particle.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(6, 182, 212, 1) 0%, rgba(6, 182, 212, 0.6) 100%)`,
            boxShadow: `0 0 ${particle.size * 2}px rgba(6, 182, 212, 0.8)`
          }}
        />
      ))}
    </div>
  );
};

// Section-specific comet trail
interface SectionCometTrailProps {
  isActive: boolean;
  sectionRef: React.RefObject<HTMLElement | null>;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
}

const SectionCometTrail: React.FC<SectionCometTrailProps> = ({ isActive, sectionRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const velocityRef = useRef(0);

  useEffect(() => {
    if (!isActive || !sectionRef?.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const sectionRect = sectionRef.current.getBoundingClientRect();
    
    const resizeCanvas = () => {
      if (!sectionRef.current) return;
      const sectionRect = sectionRef.current.getBoundingClientRect();
      canvas.width = sectionRect.width;
      canvas.height = sectionRect.height;
    };
    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      // Check if mouse is within section bounds
      if (e.clientX >= rect.left && e.clientX <= rect.right &&
          e.clientY >= rect.top && e.clientY <= rect.bottom) {
        
        mouseRef.current.prevX = mouseRef.current.x;
        mouseRef.current.prevY = mouseRef.current.y;
        mouseRef.current.x = e.clientX - rect.left;
        mouseRef.current.y = e.clientY - rect.top;
        
        const dx = mouseRef.current.x - mouseRef.current.prevX;
        const dy = mouseRef.current.y - mouseRef.current.prevY;
        velocityRef.current = Math.sqrt(dx * dx + dy * dy);
      } else {
        velocityRef.current = 0;
      }
    };

    const createParticles = () => {
      const velocity = velocityRef.current;
      if (velocity < 1) return;
      
      const particleCount = Math.min(Math.floor(velocity / 3), 8);
      
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
        const speed = velocity * 0.1 + Math.random() * 2;
        
        particlesRef.current.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          size: Math.random() * 3 + velocity * 0.2
        });
      }
      
      if (particlesRef.current.length > 150) {
        particlesRef.current = particlesRef.current.slice(-150);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      createParticles();
      
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        particle.life -= 0.015;
        
        if (particle.life <= 0) return false;
        
        const opacity = particle.life;
        const size = particle.size * particle.life;
        
        // Outer glow
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, size * 4
        );
        gradient.addColorStop(0, `rgba(6, 182, 212, ${opacity * 0.4})`);
        gradient.addColorStop(0.4, `rgba(6, 182, 212, ${opacity * 0.2})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, size * 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner core
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
        ctx.arc(particle.x, particle.y, size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        
        return true;
      });
      
      velocityRef.current *= 0.95;
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
  }, [isActive, sectionRef]);

  if (!isActive || !sectionRef?.current) return null;

  const sectionRect = sectionRef.current.getBoundingClientRect();

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: sectionRect.width,
        height: sectionRect.height,
        pointerEvents: 'none',
        zIndex: 40,
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default function SectionAbout() {
  const ref = useRef<HTMLElement>(null);
  const [unlockedCards, setUnlockedCards] = useState<string[]>([]);
  const [explosions, setExplosions] = useState<Array<{id: number; x: number; y: number}>>([]);
  const [cometTrailActive, setCometTrailActive] = useState(false);
  
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

  const handleCardClick = (cardId: string, event: React.MouseEvent<HTMLDivElement>) => {
    if (!unlockedCards.includes(cardId)) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      
      setExplosions(prev => [...prev, { id: Date.now(), x, y }]);
      setUnlockedCards(prev => [...prev, cardId]);
      
      // Activate comet trail only after first card unlock
      if (!cometTrailActive) {
        setCometTrailActive(true);
      }
    }
  };

  const handleExplosionComplete = (explosionId: number) => {
    setExplosions(prev => prev.filter(e => e.id !== explosionId));
  };

  return (
    <section
      ref={ref}
      className="relative w-full text-white min-h-screen pt-32 pb-16 sm:pb-32 px-6 flex flex-col items-center justify-center text-center overflow-visible"
    >
      {/* Background layers remain the same */}
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

      {/* Section-specific comet trail */}
      <SectionCometTrail isActive={cometTrailActive} sectionRef={ref} />

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
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 leading-tight">
            NovaThink is building the <span className="text-cyan-400">cognitive operating system</span> for the AI era.
          </h3>
        </motion.div>

        {/* Cards with blur overlay */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16 justify-center">
          {/* Card 1 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            custom={1}
            className="glassmorphic-card flex-1 max-w-lg relative cursor-pointer"
            onClick={(e) => handleCardClick('card1', e)}
          >
            <h4 className="text-lg font-bold text-cyan-400 mb-4 tracking-wide uppercase">
              The Cognitive OS Layer Between LLMs and Execution
            </h4>
            <p className="mb-6 text-base sm:text-lg leading-relaxed">
              Where today's large language models offer raw capacity, NovaThink provides the <em className="text-cyan-300">meta-layer</em> that unlocks their full potential — transforming reactive tools into <strong className="text-white">adaptive, persistent intelligences</strong> capable of reasoning, remembering, and orchestrating action at scale.
            </p>
            <p className="text-base sm:text-lg leading-relaxed">
              Today's LLMs are not bottlenecked by training data or compute. They are bottlenecked by lack of structure — missing the <strong className="text-white">multi-step reasoning frameworks</strong> and <strong className="text-white">cognitive persistence</strong> required to sustain real-world complexity in domains like strategy, research, policy, defense, and executive operations.
            </p>
            
            {/* Blur overlay */}
            <AnimatePresence>
              {!unlockedCards.includes('card1') && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
                  style={{
                    background: `linear-gradient(to bottom, 
                      transparent 0%, 
                      transparent 20%, 
                      rgba(255, 255, 255, 0.05) 30%,
                      rgba(255, 255, 255, 0.15) 60%,
                      rgba(255, 255, 255, 0.25) 100%)`,
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                  }}
                >
                  <div className="absolute bottom-8 left-0 right-0 text-center">
                    <span className="text-cyan-400 font-bold text-sm uppercase tracking-wider">
                      Click to unlock
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            custom={2}
            className="glassmorphic-card flex-1 max-w-lg relative cursor-pointer"
            onClick={(e) => handleCardClick('card2', e)}
          >
            <h4 className="text-lg font-bold text-cyan-400 mb-4 tracking-wide uppercase">
              Built for Mission-Critical Cognitive Infrastructure
            </h4>
            <p className="mb-6 text-base leading-relaxed">
              NovaThink closes this gap. We embed recursive logic frameworks, adaptive cognition patterns, and domain-specific reasoning protocols — creating stateful AI systems that <strong className="text-white">think beyond the prompt window</strong> and carry objectives forward with continuity, depth, and adaptive learning over time.
            </p>
            <p className="mb-4 text-base leading-relaxed">
              All of this is delivered through <strong className="text-white">enterprise-grade infrastructure</strong>:
            </p>
            <ul className="text-left space-y-2 text-sm leading-relaxed text-slate-200">
              <li>• Fully isolated, encrypted VPC deployments for uncompromising data security</li>
              <li>• Multi-model backends (OpenAI, Anthropic, open-source) for continuity and resilience</li>
              <li>• Compliance engineered from the ground up — SOC 2, ISO 27001, and beyond</li>
            </ul>
            
            {/* Blur overlay */}
            <AnimatePresence>
              {!unlockedCards.includes('card2') && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
                  style={{
                    background: `linear-gradient(to bottom, 
                      transparent 0%, 
                      transparent 20%, 
                      rgba(255, 255, 255, 0.05) 30%,
                      rgba(255, 255, 255, 0.15) 60%,
                      rgba(255, 255, 255, 0.25) 100%)`,
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                  }}
                >
                  <div className="absolute bottom-8 left-0 right-0 text-center">
                    <span className="text-cyan-400 font-bold text-sm uppercase tracking-wider">
                      Click to unlock
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
            <span className="text-cyan-400">NovaThink is something fundamentally new:</span>
          </h3>
          <p className="text-xl leading-relaxed max-w-4xl mx-auto">
            An LLM-agnostic cognitive OS — the intelligence amplification layer that will define how humans and AI collaborate over the next decade.
          </p>
        </motion.div>
      </motion.div>

      {/* Cyan Accent Line */}
      <div className="h-[3px] mx-auto mt-12 bg-cyan-400 rounded-full shadow-[0_0_20px_5px_rgba(34,211,238,0.5)] w-1/4 z-60" />

      {/* Particle explosions */}
      <AnimatePresence>
        {explosions.map(explosion => (
          <ParticleExplosion
            key={explosion.id}
            x={explosion.x}
            y={explosion.y}
            onComplete={() => handleExplosionComplete(explosion.id)}
          />
        ))}
      </AnimatePresence>
    </section>
  );
}