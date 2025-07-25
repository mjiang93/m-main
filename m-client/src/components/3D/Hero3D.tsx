import React, { useEffect, useRef } from 'react';

const Hero3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create floating particles
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];
    const particleCount = 20;

    // Add keyframes to document head if not already present
    if (!document.querySelector('#hero-3d-styles')) {
      const style = document.createElement('style');
      style.id = 'hero-3d-styles';
      style.textContent = `
        @keyframes floatParticle {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
          }
        }
      `;
      document.head.appendChild(style);
    }

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 4 + 2;
      
      particle.className = 'absolute rounded-full pointer-events-none';
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.background = 'rgba(102, 126, 234, 0.6)';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animation = `floatParticle ${Math.random() * 3 + 3}s ease-in-out infinite`;
      particle.style.animationDelay = Math.random() * 2 + 's';
      
      container.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach(particle => {
        if (container.contains(particle)) {
          container.removeChild(particle);
        }
      });
    };
  }, []);

  return (
    <div className="hero-3d" ref={containerRef}>
      {/* Particle Container */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="particle absolute rounded-full bg-primary-500/60"
            style={{
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
              '--duration': `${4 + Math.random() * 2}s`,
              '--delay': `${i * 0.5}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>
      
      {/* Main Animated Sphere */}
      <div className="animated-sphere">
        {/* Inner glow effect */}
        <div className="absolute top-1/5 left-1/5 w-3/10 h-3/10 rounded-full bg-white/30 animate-pulse-slow"></div>
        
        {/* Outer ring */}
        <div className="absolute -top-1/2 -left-1/2 w-full h-full border-2 border-primary-500/20 rounded-full animate-spin-slow"
             style={{ width: '200%', height: '200%' }}></div>
      </div>
    </div>
  );
};

export default Hero3D;