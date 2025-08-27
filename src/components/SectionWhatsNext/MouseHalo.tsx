import React, { useState, useEffect, useRef } from "react";

interface MouseHaloProps {
  targetElements: (HTMLDivElement | null)[];
  isActive: boolean;
  colorRgb: string;
}

export const MouseHalo: React.FC<MouseHaloProps> = ({ 
  targetElements, 
  isActive, 
  colorRgb 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Check if we're hovering over any target elements
      const isOverTarget = targetElements.some(element => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        );
      });

      if (isOverTarget) {
        setMousePosition({ x: e.clientX, y: e.clientY });
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    // Add event listeners to target elements
    targetElements.forEach(element => {
      if (element) {
        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);
      }
    });

    return () => {
      targetElements.forEach(element => {
        if (element) {
          element.removeEventListener('mousemove', handleMouseMove);
          element.removeEventListener('mouseleave', handleMouseLeave);
        }
      });
    };
  }, [targetElements, isActive]);

  if (!isActive || !isHovering) return null;

  return (
    <div
      ref={haloRef}
      style={{
        position: 'fixed',
        left: mousePosition.x - 75,
        top: mousePosition.y - 75,
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(${colorRgb}, 0.15) 0%, rgba(${colorRgb}, 0.08) 40%, rgba(${colorRgb}, 0.02) 70%, transparent 100%)`,
        pointerEvents: 'none',
        zIndex: 1000,
        transition: 'opacity 0.2s ease',
        opacity: isHovering ? 1 : 0,
        mixBlendMode: 'screen',
        filter: 'blur(1px)'
      }}
    />
  );
};