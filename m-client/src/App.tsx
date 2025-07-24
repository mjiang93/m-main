import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '@styles/theme';
import ParticleBackground from '@components/Effects/ParticleBackground';
import { HomePage } from '@pages/HomePage';
import { UsersPage } from '@pages/UsersPage';
import AboutPage from '@pages/AboutPage';
import { ContactPage } from '@pages/ContactPage';

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
  padding: 4rem 0 2rem;
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

const Navigation = styled(motion.nav)`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  padding: 1rem 2rem;
  background: ${props => props.$isActive 
    ? 'rgba(102, 126, 234, 0.3)' 
    : 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
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

const PageContainer = styled(motion.main)`
  min-height: 400px;
  margin-bottom: 2rem;
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

const pageVariants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: 20,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

// Navigation component
const AppNavigation: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/users', label: 'Users' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <Navigation
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {navItems.map((item) => (
        <motion.div key={item.path} variants={itemVariants}>
          <NavLink
            to={item.path}
            $isActive={location.pathname === item.path}
          >
            {item.label}
          </NavLink>
        </motion.div>
      ))}
    </Navigation>
  );
};

// Animated page wrapper
const AnimatedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <PageContainer
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </PageContainer>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
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
                Enhanced React application with routing, 3D animations, optimized architecture, and modern development tools.
              </Subtitle>
            </Header>

            <AppNavigation />

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
                ✅ React Router Navigation Active!
              </motion.h2>
              <StatusIndicator>
                <StatusDot />
                <span>Multi-page navigation with smooth transitions</span>
              </StatusIndicator>
              <p style={{ marginTop: '1rem' }}>
                Navigate between pages using the menu above. Each page features unique content and animations!
              </p>
            </StatusCard>

            <AnimatePresence mode="wait">
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <AnimatedPage>
                      <HomePage />
                    </AnimatedPage>
                  } 
                />
                <Route 
                  path="/users" 
                  element={
                    <AnimatedPage>
                      <UsersPage />
                    </AnimatedPage>
                  } 
                />
                <Route 
                  path="/about" 
                  element={
                    <AnimatedPage>
                      <AboutPage />
                    </AnimatedPage>
                  } 
                />
                <Route 
                  path="/contact" 
                  element={
                    <AnimatedPage>
                      <ContactPage />
                    </AnimatedPage>
                  } 
                />
              </Routes>
            </AnimatePresence>
          </Container>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
};

export default App;