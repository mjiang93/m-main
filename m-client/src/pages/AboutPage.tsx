import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutContainer = styled.div`
  padding: 100px 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 5rem;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ContentSection = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2rem;
  text-align: center;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ContentCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

const CardIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

const TechStack = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const TechItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: 1rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
  }
`;

const TechIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const TechName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.25rem;
`;

const TechDescription = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const features = [
  {
    icon: '🚀',
    title: 'Modern Architecture',
    description: 'Built with the latest React 18, TypeScript, and modern web standards for optimal performance and maintainability.',
  },
  {
    icon: '🎨',
    title: 'Beautiful Design',
    description: 'Stunning UI with 3D effects, smooth animations, and a responsive design that works perfectly on all devices.',
  },
  {
    icon: '⚡',
    title: 'High Performance',
    description: 'Optimized for speed with code splitting, lazy loading, and efficient state management.',
  },
  {
    icon: '🔒',
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with proper error handling, input validation, and secure API communication.',
  },
];

const technologies = [
  { icon: '⚛️', name: 'React 18', description: 'Latest React with Concurrent Features' },
  { icon: '📘', name: 'TypeScript', description: 'Type-safe JavaScript' },
  { icon: '🎭', name: 'Framer Motion', description: 'Smooth Animations' },
  { icon: '🎯', name: 'Three.js', description: '3D Graphics & Effects' },
  { icon: '💅', name: 'Styled Components', description: 'CSS-in-JS Styling' },
  { icon: '🐍', name: 'Python Flask', description: 'Backend API Server' },
  { icon: '🗄️', name: 'SQLite', description: 'Lightweight Database' },
  { icon: '🌐', name: 'REST API', description: 'RESTful Web Services' },
];

const AboutPage: React.FC = () => {
  const { ref: featuresRef, inView: featuresInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: techRef, inView: techInView } = useInView({
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <AboutContainer>
      <HeroSection>
        <HeroTitle
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About M-Client
        </HeroTitle>
        <HeroSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          A cutting-edge user management system that combines beautiful design
          with powerful functionality, built using the latest web technologies.
        </HeroSubtitle>
      </HeroSection>

      <ContentSection ref={featuresRef}>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Key Features
        </SectionTitle>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={featuresInView ? 'visible' : 'hidden'}
        >
          <ContentGrid>
            {features.map((feature, index) => (
              <ContentCard key={index} variants={itemVariants}>
                <CardIcon>{feature.icon}</CardIcon>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </ContentCard>
            ))}
          </ContentGrid>
        </motion.div>
      </ContentSection>

      <ContentSection ref={techRef}>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          animate={techInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Technology Stack
        </SectionTitle>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={techInView ? 'visible' : 'hidden'}
        >
          <TechStack>
            {technologies.map((tech, index) => (
              <TechItem key={index} variants={itemVariants}>
                <TechIcon>{tech.icon}</TechIcon>
                <TechName>{tech.name}</TechName>
                <TechDescription>{tech.description}</TechDescription>
              </TechItem>
            ))}
          </TechStack>
        </motion.div>
      </ContentSection>
    </AboutContainer>
  );
};

export default AboutPage;