import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  gap: 1rem;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid rgba(102, 126, 234, 0.2);
  border-top: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled(motion.p)`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1rem;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const DotsContainer = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const Dot = styled(motion.div)`
  width: 8px;
  height: 8px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
`;

interface LoadingSpinnerProps {
  text?: string;
  size?: 'small' | 'medium' | 'large';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  text = 'Loading...', 
  size = 'medium' 
}) => {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -10 },
  };

  const dotTransition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: 'reverse' as const,
    ease: 'easeInOut',
  };

  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {text}
      </LoadingText>
      <DotsContainer>
        {[0, 1, 2].map((index) => (
          <Dot
            key={index}
            variants={dotVariants}
            initial="initial"
            animate="animate"
            transition={{
              ...dotTransition,
              delay: index * 0.1,
            }}
          />
        ))}
      </DotsContainer>
    </LoadingContainer>
  );
};

export default LoadingSpinner;