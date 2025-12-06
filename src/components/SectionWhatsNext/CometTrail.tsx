import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  hue: number;
}

interface CometTrailProps {
  isActive?: boolean;
  baseColor?: { r: number; g: number; b: number };
  isOverCard?: boolean;
}

export const CometTrail: React.FC<CometTrailProps> = ({ 
  isActive = true,
  baseColor = { r: 6, g: 182, b: 212 }, // Cyan default matching your theme
  isOverCard = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const velocityRef = useRef(0);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas to full viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      
      // Calculate velocity
      const dx = mouseRef.current.x - mouseRef.current.prevX;
      const dy = mouseRef.current.y - mouseRef.current.prevY;
      velocityRef.current = Math.sqrt(dx * dx + dy * dy);
    };

    // Create particles based on mouse movement
    const createParticles = () => {
      const velocity = velocityRef.current;
      if (velocity < 1) return; // Don't create particles if mouse isn't moving
      
      // Cap the effective velocity to prevent explosion effects
      const cappedVelocity = Math.min(velocity, 15);
      
      // Fewer particles overall, and less scaling with speed
      const particleCount = Math.min(Math.floor(cappedVelocity / 5) + 1, 4);
      
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
        const speed = cappedVelocity * 0.08 + Math.random() * 1.5;
        
        particlesRef.current.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          // Much smaller size scaling - cap the velocity contribution
          size: Math.random() * 2 + Math.min(cappedVelocity * 0.08, 1.5),
          hue: 180 + Math.random() * 40 // Cyan to blue range
        });
      }
      
      // Lower particle limit
      if (particlesRef.current.length > 100) {
        particlesRef.current = particlesRef.current.slice(-100);
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create new particles
      createParticles();
      
      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        // Update particle
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.98; // Friction
        particle.vy *= 0.98;
        particle.life -= 0.02; // Slightly faster fade
        
        if (particle.life <= 0) return false;
        
        // Draw particle with glow effect
        const opacity = particle.life;
        const size = particle.size * particle.life;
        
        // Smaller glow radius (2.5x instead of 4x)
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, size * 2.5
        );
        gradient.addColorStop(0, `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${opacity * 0.3})`);
        gradient.addColorStop(0.4, `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${opacity * 0.15})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, size * 2.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner bright core
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
        ctx.arc(particle.x, particle.y, size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        
        return true;
      });
      
      // Draw trail connecting recent particles - much thinner line
      if (particlesRef.current.length > 1) {
        const cappedVelocity = Math.min(velocityRef.current, 15);
        ctx.strokeStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, 0.08)`;
        ctx.lineWidth = Math.min(cappedVelocity * 0.15, 2); // Cap line width at 2px
        ctx.beginPath();
        ctx.moveTo(particlesRef.current[0].x, particlesRef.current[0].y);
        
        for (let i = 1; i < Math.min(particlesRef.current.length, 15); i++) {
          const particle = particlesRef.current[i];
          ctx.lineTo(particle.x, particle.y);
        }
        ctx.stroke();
      }
      
      // Slowly decrease velocity when mouse stops
      velocityRef.current *= 0.95;
      
      animationRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, baseColor]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: isOverCard ? 100 : 3,
        mixBlendMode: 'screen',
        opacity: isOverCard ? 0.7 : 1
      }}
    />
  );
};

export default CometTrail;