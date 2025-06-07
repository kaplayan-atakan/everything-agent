import React, { useEffect, useRef, useState } from 'react';
import './AnimatedGridBackground.css';

interface AnimatedGridBackgroundProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

interface GridPoint {
  x: number;
  y: number;
  opacity: number;
  pulsePhase: number;
}

interface GridLine {
  start: { x: number; y: number };
  end: { x: number; y: number };
  opacity: number;
  animationOffset: number;
}

function AnimatedGridBackground({
  className = '',
  intensity = 'medium',
  colors = {
    primary: '#00FFFF',   // Electric Blue
    secondary: '#FF00FF', // Neon Pink
    accent: '#2A003F'     // Deep Purple
  }
}: AnimatedGridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Grid configuration based on intensity
  const getConfig = () => {
    const configs = {
      low: { gridSize: 80, maxOpacity: 0.3, animationSpeed: 0.002 },
      medium: { gridSize: 60, maxOpacity: 0.5, animationSpeed: 0.003 },
      high: { gridSize: 40, maxOpacity: 0.7, animationSpeed: 0.005 }
    };
    return configs[intensity];
  };

  const config = getConfig();

  // Initialize grid points and lines
  const initializeGrid = (width: number, height: number) => {
    const points: GridPoint[] = [];
    const lines: GridLine[] = [];

    // Create grid points
    for (let x = 0; x <= width + config.gridSize; x += config.gridSize) {
      for (let y = 0; y <= height + config.gridSize; y += config.gridSize) {
        points.push({
          x,
          y,
          opacity: Math.random() * config.maxOpacity,
          pulsePhase: Math.random() * Math.PI * 2
        });
      }
    }

    // Create horizontal lines
    for (let y = 0; y <= height + config.gridSize; y += config.gridSize) {
      lines.push({
        start: { x: -config.gridSize, y },
        end: { x: width + config.gridSize, y },
        opacity: Math.random() * config.maxOpacity,
        animationOffset: Math.random() * Math.PI * 2
      });
    }

    // Create vertical lines
    for (let x = 0; x <= width + config.gridSize; x += config.gridSize) {
      lines.push({
        start: { x, y: -config.gridSize },
        end: { x, y: height + config.gridSize },
        opacity: Math.random() * config.maxOpacity,
        animationOffset: Math.random() * Math.PI * 2
      });
    }

    return { points, lines };
  };

  // Animation function
  const animate = (
    ctx: CanvasRenderingContext2D,
    points: GridPoint[],
    lines: GridLine[],
    timestamp: number
  ) => {
    const { width, height } = dimensions;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Animate and draw lines
    lines.forEach((line, index) => {
      // Update opacity with wave animation
      const wave = Math.sin(timestamp * config.animationSpeed + line.animationOffset);
      line.opacity = (wave + 1) / 2 * config.maxOpacity;

      // Create gradient for line
      const gradient = ctx.createLinearGradient(
        line.start.x, line.start.y,
        line.end.x, line.end.y
      );

      const color1 = index % 3 === 0 ? colors.primary : 
                     index % 3 === 1 ? colors.secondary : colors.accent;
      
      gradient.addColorStop(0, `${color1}00`);
      gradient.addColorStop(0.5, `${color1}${Math.floor(line.opacity * 255).toString(16).padStart(2, '0')}`);
      gradient.addColorStop(1, `${color1}00`);

      // Draw line
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(line.start.x, line.start.y);
      ctx.lineTo(line.end.x, line.end.y);
      ctx.stroke();

      // Add flowing light effect
      const flowPosition = (timestamp * config.animationSpeed * 50 + line.animationOffset * 100) % 
                          Math.sqrt((line.end.x - line.start.x) ** 2 + (line.end.y - line.start.y) ** 2);
      
      const totalLength = Math.sqrt((line.end.x - line.start.x) ** 2 + (line.end.y - line.start.y) ** 2);
      const t = flowPosition / totalLength;
      
      if (t >= 0 && t <= 1) {
        const flowX = line.start.x + (line.end.x - line.start.x) * t;
        const flowY = line.start.y + (line.end.y - line.start.y) * t;
        
        // Draw flowing light
        const lightGradient = ctx.createRadialGradient(flowX, flowY, 0, flowX, flowY, 8);
        lightGradient.addColorStop(0, `${color1}AA`);
        lightGradient.addColorStop(1, `${color1}00`);
        
        ctx.fillStyle = lightGradient;
        ctx.beginPath();
        ctx.arc(flowX, flowY, 8, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Animate and draw intersection points
    points.forEach((point) => {
      // Update pulse animation
      point.pulsePhase += config.animationSpeed * 2;
      const pulse = Math.sin(point.pulsePhase);
      point.opacity = (pulse + 1) / 2 * config.maxOpacity;

      // Draw point with glow effect
      const pointGradient = ctx.createRadialGradient(
        point.x, point.y, 0,
        point.x, point.y, 4
      );
      
      const glowColor = Math.floor(Math.random() * 3) === 0 ? colors.primary :
                       Math.floor(Math.random() * 3) === 1 ? colors.secondary : colors.accent;
      
      pointGradient.addColorStop(0, `${glowColor}${Math.floor(point.opacity * 255).toString(16).padStart(2, '0')}`);
      pointGradient.addColorStop(1, `${glowColor}00`);

      ctx.fillStyle = pointGradient;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  // Main animation loop
  const startAnimation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = dimensions;
    const { points, lines } = initializeGrid(width, height);

    const loop = (timestamp: number) => {
      animate(ctx, points, lines, timestamp);
      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);
  };

  // Handle resize
  const updateDimensions = () => {
    if (canvasRef.current && canvasRef.current.parentElement) {
      const parent = canvasRef.current.parentElement;
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      
      setDimensions({ width, height });
      
      canvasRef.current.width = width;
      canvasRef.current.height = height;
    }
  };

  useEffect(() => {
    updateDimensions();
    
    const handleResize = () => updateDimensions();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      startAnimation();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, startAnimation]);

  return (
    <div className={`animated-grid-background ${className}`}>
      <canvas
        ref={canvasRef}
        className="grid-canvas"
      />
    </div>
  );
};

export default AnimatedGridBackground;
