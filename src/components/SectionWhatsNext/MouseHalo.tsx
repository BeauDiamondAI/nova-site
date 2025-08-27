import React, { useState, useEffect, useRef } from "react";

interface MouseHaloProps {
  isActive: boolean;
  colorRgb: string;
}

export const MouseHalo: React.FC<MouseHaloProps> = ({ 
  isActive, 
  colorRgb 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Since MouseHalo is inside the card, just track mouse position directly
      setMousePosition({ 
        x: e.clientX, 
        y: e.clientY 
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isActive]);

  if (!isActive) return null;

  // Get the parent card's position to calculate relative coordinates
  const parentRect = haloRef.current?.parentElement?.getBoundingClientRect();
  if (!parentRect) return null;

  return (
    <div
      ref={haloRef}
      style={{
        position: 'absolute',
        left: mousePosition.x - parentRect.left - 75,
        top: mousePosition.y - parentRect.top - 75,
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(${colorRgb}, 0.4) 0%, rgba(${colorRgb}, 0.2) 40%, transparent 70%)`,
        pointerEvents: 'none',
        zIndex: 1001,
        transition: 'left 0.1s ease, top 0.1s ease',
        opacity: 1,
        mixBlendMode: 'screen'
      }}
    />
  );
};