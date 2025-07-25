import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];
    const particleCount = 100;

    // Add keyframes to document head if not already present
    if (!document.querySelector('#particle-bg-styles')) {
      const style = document.createElement('style');
      style.id = 'particle-bg-styles';
      style.textContent = `
        @keyframes floatBackground {
          0%, 100% { 
            transform: translateY(0px) translateX(0px); 
            opacity: 0.6;
          }
          25% { 
            transform: translateY(-10px) translateX(5px); 
            opacity: 1;
          }
          50% { 
            transform: translateY(-20px) translateX(-5px); 
            opacity: 0.8;
          }
          75% { 
            transform: translateY(-10px) translateX(10px); 
            opacity: 0.4;
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 3 + 1;
      
      particle.className = 'absolute rounded-full bg-primary-500 pointer-events-none';
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.opacity = '0.6';
      particle.style.animation = `floatBackground ${Math.random() * 4 + 4}s ease-in-out infinite`;
      particle.style.animationDelay = Math.random() * 2 + 's';
      
      container.appendChild(particle);
      particles.push(particle);
    }

    // Cleanup function
    return () => {
      particles.forEach(particle => {
        if (container.contains(particle)) {
          container.removeChild(particle);
        }
      });
    };
  }, []);

  return (
    <div className="particle-container" ref={containerRef}>
      {/* Static particles for immediate render */}
      {Array.from({ length: 50 }, (_, i) => (
        <div
          key={i}
          className="particle absolute rounded-full bg-primary-500/60"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${Math.random() * 4 + 4}s`,
            '--duration': `${Math.random() * 4 + 4}s`,
            '--delay': `${Math.random() * 2}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;