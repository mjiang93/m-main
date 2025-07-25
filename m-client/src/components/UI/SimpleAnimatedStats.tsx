import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) {
      setHasAnimated(true);
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
  }, [hasAnimated, end, duration]);

  return (
    <div className="text-5xl font-extrabold gradient-text mb-2">
      {count.toLocaleString()}{suffix}
    </div>
  );
};

const stats = [
  {
    number: 10000,
    suffix: '+',
    label: 'Active Users',
    description: 'Growing community of satisfied users',
    icon: '👥',
  },
  {
    number: 99,
    suffix: '%',
    label: 'Uptime',
    description: 'Reliable and stable performance',
    icon: '⚡',
  },
  {
    number: 50,
    suffix: '+',
    label: 'Features',
    description: 'Comprehensive functionality suite',
    icon: '🚀',
  },
  {
    number: 24,
    suffix: '/7',
    label: 'Support',
    description: 'Round-the-clock assistance',
    icon: '🛠️',
  },
];

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

const SimpleAnimatedStats: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="card text-center group"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <div className="text-4xl mb-4 group-hover:animate-bounce">
                {stat.icon}
              </div>
              <AnimatedNumber 
                end={stat.number} 
                suffix={stat.suffix}
              />
              <h3 className="text-xl font-bold text-white mb-2">
                {stat.label}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SimpleAnimatedStats;