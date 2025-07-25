import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from '@components/Effects/ParticleBackground';
import { HomePage } from '@pages/HomePage';
import { UsersPage } from '@pages/UsersPage';
import AboutPage from '@pages/AboutPage';
import { ContactPage } from '@pages/ContactPage';

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
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/users', label: 'Users', icon: '👥' },
    { path: '/about', label: 'About', icon: '📖' },
    { path: '/contact', label: 'Contact', icon: '📞' },
  ];

  return (
    <motion.nav
      className="app-navigation"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {navItems.map((item) => (
        <motion.div key={item.path} variants={itemVariants}>
          <Link
            to={item.path}
            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </Link>
        </motion.div>
      ))}
    </motion.nav>
  );
};

// Animated page wrapper
const AnimatedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.main
      className="min-h-96 mb-8"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.main>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <ParticleBackground />
        
        <div className="main-container">
          {/* Header */}
          <motion.header
            className="page-header"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="page-title"
              variants={itemVariants}
            >
              🚀 M-Client React
            </motion.h1>
            <motion.p 
              className="page-subtitle"
              variants={itemVariants}
            >
              Enhanced React application with modern CSS, Tailwind atomic framework, routing, 3D animations, and cutting-edge web technologies.
            </motion.p>
          </motion.header>

          {/* Navigation */}
          <AppNavigation />

          {/* Status Card */}
          <motion.div
            className="status-card"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            <motion.h2 
              className="status-title"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✅ Modern CSS & Tailwind Integration Complete!
            </motion.h2>
            <div className="status-indicator">
              <div className="status-dot"></div>
              <span>Latest CSS technologies with atomic framework</span>
            </div>
            <p className="mt-4 text-white/80">
              Navigate between pages to experience the new CSS architecture with Tailwind classes, 
              modern CSS features, and optimized styling system!
            </p>
          </motion.div>

          {/* Page Routes */}
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
        </div>
      </div>
    </Router>
  );
};

export default App;