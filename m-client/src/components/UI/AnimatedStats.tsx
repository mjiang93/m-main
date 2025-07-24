import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const StatNumber = styled(motion.div)`
  font-size: 3rem;
  font-weight: 800;
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

const StatDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
`;

interface AnimatedNumberProps {
  end: number;
  duration?: number;
  suffix?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ 
  end, 
  duration = 2000, 
  suffix = '' 
}) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [inView, end, duration]);

  return (
    <StatNumber ref={ref}>
      {count.toLocaleString()}{suffix}
    </StatNumber>
  );
};

const stats = [
  {
    number: 10000,
    suffix: '+',
    label: 'Active Users',
    description: 'Growing community of satisfied users',
  },
  {
    number: 99,
    suffix: '%',
    label: 'Uptime',
    description: 'Reliable and stable performance',
  },
  {
    number: 50,
    suffix: '+',
    label: 'Features',
    description: 'Comprehensive functionality suite',
  },
  {
    number: 24,
    suffix: '/7',
    label: 'Support',
    description: 'Round-the-clock assistance',
  },
];

const AnimatedStats: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <StatsContainer ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard key={index} variants={cardVariants}>
              <AnimatedNumber 
                end={stat.number} 
                suffix={stat.suffix}
              />
              <StatLabel>{stat.label}</StatLabel>
              <StatDescription>{stat.description}</StatDescription>
            </StatCard>
          ))}
        </StatsGrid>
      </motion.div>
    </StatsContainer>
  );
};

export default AnimatedStats;