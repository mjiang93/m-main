import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterContainer = styled(motion.footer)`
  background: rgba(15, 15, 35, 0.9);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  p, a {
    color: ${({ theme }) => theme.colors.textSecondary};
    text-decoration: none;
    line-height: 1.6;
    transition: color 0.3s ease;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.gradients.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <FooterContent>
        <FooterSection>
          <h3>M-Client</h3>
          <p>
            A modern React-based user management system with beautiful 3D effects
            and animations. Built with cutting-edge technologies for the best
            user experience.
          </p>
          <SocialLinks>
            <SocialLink href="#" aria-label="GitHub">
              🐙
            </SocialLink>
            <SocialLink href="#" aria-label="Twitter">
              🐦
            </SocialLink>
            <SocialLink href="#" aria-label="LinkedIn">
              💼
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>Quick Links</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a href="/">Home</a>
            <a href="/users">User Management</a>
            <a href="/about">About Us</a>
            <a href="/contact">Contact</a>
          </div>
        </FooterSection>

        <FooterSection>
          <h3>Technologies</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span>React 18 + TypeScript</span>
            <span>Three.js + React Three Fiber</span>
            <span>Framer Motion</span>
            <span>Styled Components</span>
          </div>
        </FooterSection>
      </FooterContent>

      <Copyright>
        <p>&copy; 2024 M-Client. All rights reserved. | Built with ❤️ and modern web technologies</p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;