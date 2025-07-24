import React, { useState } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '@styles/theme';
import Hero3D from '@components/3D/Hero3D';
import ParticleBackground from '@components/Effects/ParticleBackground';
import SimpleAnimatedStats from '@components/UI/SimpleAnimatedStats';

// Global styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: ${props => props.theme.gradients.dark};
    color: ${props => props.theme.colors.text};
    overflow-x: hidden;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
`;

// Styled components
const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`;

const Header = styled(motion.header)`
  text-align: center;
  padding: 4rem 0;
  position: relative;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  background: ${props => props.theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const HeroSection = styled(motion.div)`
  height: 400px;
  margin: 4rem 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Navigation = styled(motion.nav)`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
`;

const NavButton = styled(motion.button)<{ active: boolean }>`
  padding: 1rem 2rem;
  background: ${props => props.active 
    ? 'rgba(102, 126, 234, 0.3)' 
    : 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.text};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
`;

const Content = styled(motion.main)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  margin-bottom: 2rem;
  min-height: 400px;
`;

const StatusCard = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: ${props => props.theme.borderRadius.md};
  margin: 2rem 0;
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 1.1rem;
  font-weight: 500;
`;

const StatusDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #10b981;
  animation: pulse 2s infinite;
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

// Animation variants
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

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <ParticleBackground />
        
        <Container>
          <Header
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Title variants={itemVariants}>
              🚀 M-Client React
            </Title>
            <Subtitle variants={itemVariants}>
              Refactored React application with 3D animations, optimized architecture, TypeScript support, and modern development tools.
            </Subtitle>
          </Header>

          <HeroSection
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <Hero3D />
          </HeroSection>

          <Navigation
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {['home', 'users', 'about', 'contact'].map((view, index) => (
              <NavButton
                key={view}
                active={currentView === view}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentView(view)}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </NavButton>
            ))}
          </Navigation>

          <StatusCard
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            <motion.h2 
              style={{ marginBottom: '1rem' }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✅ React Application with 3D Animations!
            </motion.h2>
            <StatusIndicator>
              <StatusDot />
              <span>3D animations and particle effects active</span>
            </StatusIndicator>
            <p style={{ marginTop: '1rem' }}>
              The React application features stunning 3D animations, particle backgrounds, and interactive components!
            </p>
          </StatusCard>

          <AnimatePresence mode="wait">
            <Content
              key={currentView}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3 }}
            >
              {currentView === 'home' && (
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
              )}

              {currentView === 'users' && (
                <motion.div variants={itemVariants}>
                  <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>👥 User Management</h2>
                  <p style={{ textAlign: 'center', color: theme.colors.textSecondary }}>
                    User management components with 3D animations are ready to be implemented.
                    The enhanced architecture supports advanced interactive components.
                  </p>
                </motion.div>
              )}

              {currentView === 'about' && (
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  <motion.h2 variants={itemVariants} style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    📖 About the Enhanced Version
                  </motion.h2>
                  <motion.div variants={itemVariants} style={{ color: theme.colors.textSecondary, lineHeight: 1.8 }}>
                    <h3 style={{ color: theme.colors.text, marginBottom: '1rem' }}>🎨 New Animation Features:</h3>
                    <ul style={{ marginLeft: '2rem', marginBottom: '2rem' }}>
                      <li>✨ 3D floating sphere with particle effects</li>
                      <li>✨ Interactive particle background</li>
                      <li>✨ Animated statistics counters</li>
                      <li>✨ Smooth page transitions</li>
                      <li>✨ Hover animations and micro-interactions</li>
                      <li>✨ Framer Motion powered animations</li>
                    </ul>
                    <h3 style={{ color: theme.colors.text, marginBottom: '1rem' }}>🔧 Technical Enhancements:</h3>
                    <ul style={{ marginLeft: '2rem' }}>
                      <li>📦 Styled-components for dynamic styling</li>
                      <li>📦 Framer Motion for advanced animations</li>
                      <li>📦 React Intersection Observer for scroll animations</li>
                      <li>📦 Theme system with consistent design tokens</li>
                      <li>📦 Responsive design with mobile optimization</li>
                    </ul>
                  </motion.div>
                </motion.div>
              )}

              {currentView === 'contact' && (
                <motion.div variants={itemVariants}>
                  <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>📞 Enhanced Development Ready</h2>
                  <p style={{ textAlign: 'center', color: theme.colors.textSecondary, lineHeight: 1.8 }}>
                    The enhanced application now features:
                    <br />🎨 Stunning 3D animations and particle effects
                    <br />⚡ Smooth transitions and micro-interactions
                    <br />📱 Responsive design with mobile optimization
                    <br />🎯 Advanced animation libraries integration
                  </p>
                </motion.div>
              )}
            </Content>
          </AnimatePresence>
        </Container>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;