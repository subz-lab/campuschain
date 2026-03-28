import { useState, useCallback } from 'react';

export function useParallax(intensity = 20) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    // Track relative to the element to calculate 3D tilt and translate
    const rect = e.currentTarget.getBoundingClientRect();
    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;
    
    // For translation (moving layers)
    const x = ((xPos / rect.width) - 0.5) * intensity;
    const y = ((yPos / rect.height) - 0.5) * intensity;
    
    // For 3D Rotation (tilt)
    const rotateX = ((yPos / rect.height) - 0.5) * -intensity;
    const rotateY = ((xPos / rect.width) - 0.5) * intensity;

    setOffset({ x, y });
    setRotate({ x: rotateX, y: rotateY });
  }, [intensity]);

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
    setRotate({ x: 0, y: 0 });
  }, []);

  return { offset, rotate, handleMouseMove, handleMouseLeave };
}
