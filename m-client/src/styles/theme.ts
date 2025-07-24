export const theme = {
  colors: {
    primary: '#667eea',
    secondary: '#764ba2',
    background: '#0f0f23',
    surface: '#1a1a2e',
    text: '#ffffff',
    textSecondary: '#a0aec0',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    secondary: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
    dark: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
  },
  borderRadius: {
    sm: '6px',
    md: '12px',
    lg: '16px',
    xl: '20px',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px',
  },
  animations: {
    duration: {
      fast: '0.15s',
      normal: '0.3s',
      slow: '0.6s',
    },
    easing: {
      easeOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      easeIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
      easeInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    },
  },
};

export type Theme = typeof theme;

// Styled-components theme declaration
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}