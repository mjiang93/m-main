import React, { useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

const float = keyframes`
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
  }
  50% { 
    transform: translateY(-20px) rotate(180deg); 
  }
`;

const pulse = keyframes`
  0%, 100% { 
    opacity: 1; 
    transform: scale(1);
  }
  50% { 
    opacity: 0.7; 
    transform: scale(1.05);
  }
`;

const rotate = keyframes`
  from { 
    transform: rotate(0deg); 
  }
  to { 
    transform: rotate(360deg); 
  }
`;

const HeroContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const AnimatedSphere = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  ${css`
    animation: ${float} 6s ease-in-out infinite;
  `}
  box-shadow: 
    0 0 50px rgba(102, 126, 234, 0.4),
    inset 0 0 50px rgba(255, 255, 255, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 20%;
    left: 20%;
    width: 30%;
    height: 30%;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    ${css`
      animation: ${pulse} 4s ease-in-out infinite;
    `}
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    border: 2px solid rgba(102, 126, 234, 0.2);
    border-radius: 50%;
    ${css`
      animation: ${rotate} 20s linear infinite;
    `}
  }

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

const ParticleContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Particle = styled.div<{ delay: number; duration: number; size: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: rgba(102, 126, 234, 0.6);
  border-radius: 50%;
  ${props => css`
    animation: ${float} ${props.duration}s ease-in-out infinite;
    animation-delay: ${props.delay}s;
  `}
`;

const Hero3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create floating particles
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];
    const particleCount = 20;

    // Add keyframes to document head
    const style = document.createElement('style');
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

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = Math.random() * 4 + 2 + 'px';
      particle.style.height = particle.style.width;
      particle.style.background = 'rgba(102, 126, 234, 0.6)';
      particle.style.borderRadius = '50%';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animation = `floatParticle ${Math.random() * 3 + 3}s ease-in-out infinite`;
      particle.style.animationDelay = Math.random() * 2 + 's';
      particle.style.pointerEvents = 'none';
      
      container.appendChild(particle);
      particles.push(particle);
    }

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
    <HeroContainer ref={containerRef}>
      <ParticleContainer>
        {Array.from({ length: 8 }, (_, i) => (
          <Particle
            key={i}
            delay={i * 0.5}
            duration={4 + Math.random() * 2}
            size={2 + Math.random() * 3}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </ParticleContainer>
      <AnimatedSphere />
    </HeroContainer>
  );
};

export default Hero3D;