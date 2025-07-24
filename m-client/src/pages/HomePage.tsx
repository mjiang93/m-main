import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Hero3D from '@components/3D/Hero3D';
import SimpleAnimatedStats from '@components/UI/SimpleAnimatedStats';

const HomeContainer = styled.div`
  width: 100%;
`;

const HeroSection = styled(motion.div)`
  height: 400px;
  margin: 4rem 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  margin-bottom: 2rem;
`;

const FeatureGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
`;

const CardDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const features = [
  {
    icon: '⚛️',
    title: 'React 18 + TypeScript',
    description: 'Built with the latest React 18 and TypeScript for optimal performance and type safety.',
  },
  {
    icon: '⚡',
    title: 'Vite Powered',
    description: 'Lightning-fast development with Vite build tool and hot module replacement.',
  },
  {
    icon: '🎨',
    title: '3D Animations',
    description: 'Beautiful 3D animations and particle effects powered by Framer Motion.',
  },
  {
    icon: '🔧',
    title: 'Optimized Architecture',
    description: 'Clean code structure with proper separation of concerns and reusable components.',
  },
  {
    icon: '📦',
    title: 'PNPM Ready',
    description: 'Optimized for PNPM package manager with proper workspace configuration.',
  },
  {
    icon: '🚀',
    title: 'Production Ready',
    description: 'Configured with ESLint, TypeScript strict mode, and build optimizations.',
  },
];

export const HomePage: React.FC = () => {
  return (
    <HomeContainer>
      <HeroSection
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        <Hero3D />
      </HeroSection>

      <Content
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            variants={itemVariants}
            style={{ marginBottom: '2rem', textAlign: 'center' }}
          >
            🏠 Welcome to Enhanced M-Client
          </motion.h2>
          <FeatureGrid variants={containerVariants}>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <CardIcon>{feature.icon}</CardIcon>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </FeatureCard>
            ))}
          </FeatureGrid>
          
          <motion.div
            variants={itemVariants}
            style={{ marginTop: '3rem' }}
          >
            <SimpleAnimatedStats />
          </motion.div>
        </motion.div>
      </Content>
    </HomeContainer>
  );
};