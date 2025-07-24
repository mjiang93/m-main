import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero3D from '../components/3D/Hero3D';
import FeatureCards from '../components/UI/FeatureCards';
import AnimatedStats from '../components/UI/AnimatedStats';

const HomeContainer = styled.div`
  padding-top: 80px;
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
`;

const HeroText = styled.div`
  z-index: 2;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  line-height: 1.2;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const CTAButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const CTAButton = styled(Link)`
  padding: 1rem 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;

  &.primary {
    background: ${({ theme }) => theme.gradients.primary};
    color: white;
    box-shadow: ${({ theme }) => theme.shadows.glow};

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
    }
  }

  &.secondary {
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};

    &:hover {
      background: ${({ theme }) => theme.colors.primary};
      color: white;
      transform: translateY(-2px);
    }
  }
`;

const Hero3DContainer = styled.div`
  height: 500px;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 300px;
  }
`;

const FeaturesSection = styled.section`
  padding: 5rem 0;
  background: rgba(255, 255, 255, 0.02);
`;

const StatsSection = styled.section`
  padding: 5rem 0;
`;

const HomePage: React.FC = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroText>
            <HeroTitle
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Next-Gen User Management
            </HeroTitle>
            <HeroSubtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Experience the future of web applications with stunning 3D effects,
              smooth animations, and powerful user management capabilities.
            </HeroSubtitle>
            <CTAButtons
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <CTAButton to="/users" className="primary">
                🚀 Get Started
              </CTAButton>
              <CTAButton to="/about" className="secondary">
                📖 Learn More
              </CTAButton>
            </CTAButtons>
          </HeroText>
          <Hero3DContainer>
            <Hero3D />
          </Hero3DContainer>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <FeatureCards />
      </FeaturesSection>

      <StatsSection>
        <AnimatedStats />
      </StatsSection>
    </HomeContainer>
  );
};

export default HomePage;