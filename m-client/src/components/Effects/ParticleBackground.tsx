import React, { useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

const float = keyframes`
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
`;

const ParticleContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
`;

const Particle = styled.div<{ 
  size: number; 
  left: number; 
  top: number; 
  delay: number; 
  duration: number;
}>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: #667eea;
  border-radius: 50%;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
  opacity: 0.6;
  ${props => css`
    animation: ${float} ${props.duration}s ease-in-out infinite;
    animation-delay: ${props.delay}s;
  `}
`;

const ParticleBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];
    const particleCount = 100;

    // Add keyframes to document head
    const style = document.createElement('style');
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

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 3 + 1;
      
      particle.style.position = 'absolute';
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.background = '#667eea';
      particle.style.borderRadius = '50%';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.opacity = '0.6';
      particle.style.animation = `floatBackground ${Math.random() * 4 + 4}s ease-in-out infinite`;
      particle.style.animationDelay = Math.random() * 2 + 's';
      particle.style.pointerEvents = 'none';
      
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
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <ParticleContainer ref={containerRef}>
      {/* Static particles for immediate render */}
      {Array.from({ length: 50 }, (_, i) => (
        <Particle
          key={i}
          size={Math.random() * 3 + 1}
          left={Math.random() * 100}
          top={Math.random() * 100}
          delay={Math.random() * 2}
          duration={Math.random() * 4 + 4}
        />
      ))}
    </ParticleContainer>
  );
};

export default ParticleBackground;