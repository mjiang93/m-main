import React from 'react';
import { motion } from 'framer-motion';
import Hero3D from '@components/3D/Hero3D';
import SimpleAnimatedStats from '@components/UI/SimpleAnimatedStats';

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
    title: 'Modern CSS',
    description: 'Latest CSS technologies with Tailwind CSS atomic framework and modern features.',
  },
];

export const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Section with 3D Animation */}
      <motion.div
        className="h-96 my-16 relative flex items-center justify-center"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        <Hero3D />
      </motion.div>

      {/* Main Content */}
      <motion.main
        className="content-section"
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
            className="text-3xl font-bold text-center mb-8 gradient-text"
          >
            🏠 Welcome to Enhanced M-Client
          </motion.h2>
          
          {/* Feature Grid */}
          <motion.div 
            className="feature-grid animate-stagger"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card group"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="card-icon group-hover:animate-bounce">
                  {feature.icon}
                </div>
                <h3 className="card-title">{feature.title}</h3>
                <p className="card-description">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Animated Statistics */}
          <motion.div
            variants={itemVariants}
            className="mt-12"
          >
            <SimpleAnimatedStats />
          </motion.div>
        </motion.div>
      </motion.main>
    </div>
  );
};