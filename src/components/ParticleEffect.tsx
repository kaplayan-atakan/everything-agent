import React, { useEffect, useRef, useState } from 'react';
import './ParticleEffect.css';

interface ParticleEffectProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  particleCount?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
  pulsePhase: number;
  trail: { x: number; y: number; opacity: number }[];
}

function ParticleEffect({
  className = '',
  intensity = 'medium',
  colors = {
    primary: '#00FFFF',   // Electric Blue
    secondary: '#FF00FF', // Neon Pink
    accent: '#2A003F'     // Deep Purple
  },
  particleCount
}: ParticleEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const particlesRef = useRef<Particle[]>([]);

  // Configuration based on intensity
  const getConfig = () => {
    const configs = {
      low: { 
        count: particleCount || 30, 
        speed: 0.5, 
        maxOpacity: 0.4,
        connectionDistance: 80,
        spawnRate: 0.02
      },
      medium: { 
        count: particleCount || 50, 
        speed: 0.8, 
        maxOpacity: 0.6,
        connectionDistance: 100,
        spawnRate: 0.03
      },
      high: { 
        count: particleCount || 80, 
        speed: 1.2, 
        maxOpacity: 0.8,
        connectionDistance: 120,
        spawnRate: 0.05
      }
    };
    return configs[intensity];
  };

  const config = getConfig();

  // Create a new particle
  const createParticle = (width: number, height: number): Particle => {
    const colorArray = [colors.primary, colors.secondary, colors.accent];
    const selectedColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * config.speed,
      vy: (Math.random() - 0.5) * config.speed,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * config.maxOpacity,
      color: selectedColor,
      life: 0,
      maxLife: Math.random() * 1000 + 500,
      pulsePhase: Math.random() * Math.PI * 2,
      trail: []
    };
  };

  // Initialize particles
  const initializeParticles = (width: number, height: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < config.count; i++) {
      particles.push(createParticle(width, height));
    }
    return particles;
  };

  // Update particle physics
  const updateParticle = (particle: Particle, width: number, height: number, deltaTime: number) => {
    // Update position
    particle.x += particle.vx * deltaTime;
    particle.y += particle.vy * deltaTime;

    // Update trail
    particle.trail.unshift({ x: particle.x, y: particle.y, opacity: particle.opacity });
    if (particle.trail.length > 8) {
      particle.trail.pop();
    }

    // Update trail opacity
    particle.trail.forEach((point, index) => {
      point.opacity = particle.opacity * (1 - index / particle.trail.length);
    });

    // Bounce off edges with some randomness
    if (particle.x < 0 || particle.x > width) {
      particle.vx *= -0.8;
      particle.x = Math.max(0, Math.min(width, particle.x));
      particle.vx += (Math.random() - 0.5) * 0.2;
    }
    
    if (particle.y < 0 || particle.y > height) {
      particle.vy *= -0.8;
      particle.y = Math.max(0, Math.min(height, particle.y));
      particle.vy += (Math.random() - 0.5) * 0.2;
    }

    // Update life and opacity
    particle.life += deltaTime;
    particle.pulsePhase += 0.02 * deltaTime;
    
    const lifeFactor = 1 - (particle.life / particle.maxLife);
    const pulseFactor = (Math.sin(particle.pulsePhase) + 1) / 2;
    particle.opacity = lifeFactor * pulseFactor * config.maxOpacity;

    // Add some drift towards center occasionally
    if (Math.random() < 0.001) {
      const centerX = width / 2;
      const centerY = height / 2;
      const dx = centerX - particle.x;
      const dy = centerY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 0) {
        particle.vx += (dx / distance) * 0.01;
        particle.vy += (dy / distance) * 0.01;
      }
    }

    // Regenerate particle if it's too old or too faded
    if (particle.life > particle.maxLife || particle.opacity < 0.01) {
      const newParticle = createParticle(width, height);
      Object.assign(particle, newParticle);
    }
  };

  // Draw particle with glow effect
  const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
    // Draw trail
    particle.trail.forEach((point, index) => {
      if (point.opacity > 0.01) {
        const trailSize = particle.size * (1 - index / particle.trail.length);
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, trailSize * 2
        );
        
        gradient.addColorStop(0, `${particle.color}${Math.floor(point.opacity * 100).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${particle.color}00`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Draw main particle
    const gradient = ctx.createRadialGradient(
      particle.x, particle.y, 0,
      particle.x, particle.y, particle.size * 3
    );
    
    gradient.addColorStop(0, `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`);
    gradient.addColorStop(0.5, `${particle.color}${Math.floor(particle.opacity * 128).toString(16).padStart(2, '0')}`);
    gradient.addColorStop(1, `${particle.color}00`);

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
    ctx.fill();

    // Draw core
    ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
  };

  // Draw connections between nearby particles
  const drawConnections = (ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < config.connectionDistance) {
          const opacity = (1 - distance / config.connectionDistance) * 
                         Math.min(p1.opacity, p2.opacity) * 0.3;
          
          if (opacity > 0.01) {
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            gradient.addColorStop(0, `${p1.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
            gradient.addColorStop(1, `${p2.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    }
  };

  // Main animation loop
  const animate = (timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = dimensions;
    
    // Clear canvas with slight trail effect
    ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
    ctx.fillRect(0, 0, width, height);

    const particles = particlesRef.current;
    const deltaTime = 16; // Assuming 60fps

    // Update and draw particles
    particles.forEach(particle => {
      updateParticle(particle, width, height, deltaTime);
      drawParticle(ctx, particle);
    });

    // Draw connections
    drawConnections(ctx, particles);

    // Occasionally spawn new particles
    if (Math.random() < config.spawnRate && particles.length < config.count * 1.2) {
      particles.push(createParticle(width, height));
    }

    animationRef.current = requestAnimationFrame(animate);
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
      particlesRef.current = initializeParticles(dimensions.width, dimensions.height);
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions]);

  return (
    <div className={`particle-effect ${className}`}>
      <canvas
        ref={canvasRef}
        className="particles-canvas"
      />
    </div>
  );
}

export default ParticleEffect;