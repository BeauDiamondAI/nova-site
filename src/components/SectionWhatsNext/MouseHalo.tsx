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
    if (!isActive) {
      setIsHovering(false);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Filter out null elements
      const validElements = targetElements.filter(element => element !== null);
      
      if (validElements.length === 0) return;

      // Check if we're hovering over any target elements
      const isOverTarget = validElements.some(element => {
        const rect = element!.getBoundingClientRect();
        return (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        );
      });

      if (isOverTarget) {
        // Get relative position within the first valid element
        const element = validElements[0]!;
        const rect = element.getBoundingClientRect();
        setMousePosition({ 
          x: e.clientX - rect.left, 
          y: e.clientY - rect.top 
        });
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    // Add event listeners to document for better capture
    document.addEventListener('mousemove', handleMouseMove);
    
    // Add leave listeners to target elements
    targetElements.forEach(element => {
      if (element) {
        element.addEventListener('mouseleave', handleMouseLeave);
      }
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      targetElements.forEach(element => {
        if (element) {
          element.removeEventListener('mouseleave', handleMouseLeave);
        }
      });
    };
  }, [targetElements, isActive]);

  // Don't render if not active or no valid target elements
  const validElements = targetElements.filter(element => element !== null);
  if (!isActive || !isHovering || validElements.length === 0) return null;

  const element = validElements[0]!;
  const rect = element.getBoundingClientRect();

  return (
    <div
      ref={haloRef}
      style={{
        position: 'absolute', // Changed from 'fixed' to 'absolute'
        left: mousePosition.x - 75,
        top: mousePosition.y - 75,
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(${colorRgb}, 0.25) 0%, rgba(${colorRgb}, 0.15) 40%, rgba(${colorRgb}, 0.05) 70%, transparent 100%)`,
        pointerEvents: 'none',
        zIndex: 1001, // Higher than card zIndex
        transition: 'all 0.1s ease',
        opacity: 1,
        mixBlendMode: 'screen'
      }}
    />
  );
};