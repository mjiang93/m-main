# M-Client React Application

A modern React application built with TypeScript, Vite, and optimized for PNPM package management.

## 🚀 Features

- **React 18** with TypeScript for type safety
- **Vite** for lightning-fast development and builds
- **PNPM** for efficient package management
- **ESLint** for code quality and consistency
- **Modern Architecture** with organized project structure
- **Path Aliases** for clean imports
- **Custom Hooks** for reusable logic
- **Responsive Design** with glassmorphism UI

## 📁 Project Structure

```
m-client/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── 3D/            # 3D components
│   │   ├── Effects/       # Visual effects
│   │   ├── Layout/        # Layout components
│   │   └── UI/            # UI components
│   ├── pages/             # Page-level components
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API and external services
│   ├── styles/            # Theme and styling
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main application component
│   └── index.tsx          # Application entry point
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## 🛠️ Development

### Prerequisites

- Node.js >= 16.0.0
- PNPM >= 8.0.0

### Installation

```bash
# Install dependencies
pnpm install
```

### Available Scripts

```bash
# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Type checking
pnpm run type-check

# Lint code
pnpm run lint

# Clean build directory
pnpm run clean
```

## 🎯 Path Aliases

The project uses TypeScript path aliases for cleaner imports:

```typescript
import { User } from '@/types';
import { Button } from '@components/UI/Button';
import { HomePage } from '@pages/HomePage';
import { apiService } from '@services/apiService';
import { theme } from '@styles/theme';
import { formatDate } from '@utils';
import { useLocalStorage } from '@hooks';
```

## 🔧 Configuration

### Vite Configuration

- **Path aliases** for clean imports
- **Development server** on port 3000
- **Build optimizations** with vendor chunking
- **Source maps** for debugging

### TypeScript Configuration

- **Strict mode** enabled
- **Path mapping** for aliases
- **Modern ES2020** target
- **React JSX** transform

### ESLint Configuration

- **TypeScript** support
- **React hooks** rules
- **Unused variables** detection
- **Code quality** enforcement

## 🎨 Styling

The application uses a modern glassmorphism design with:

- **CSS-in-JS** for component styling
- **Theme system** with consistent colors and spacing
- **Responsive design** with mobile-first approach
- **Smooth animations** and transitions

## 📦 Package Management

This project is optimized for PNPM:

- **Workspace configuration** for monorepo support
- **Efficient dependency** resolution
- **Fast installation** and updates
- **Disk space optimization**

## 🚀 Deployment

The application is ready for deployment with:

- **Optimized builds** via Vite
- **Tree shaking** for smaller bundles
- **Source maps** for debugging
- **Modern browser** support

## 🔄 Migration Notes

This refactored version includes:

- ✅ Proper TypeScript configuration
- ✅ PNPM workspace setup
- ✅ Modern React patterns
- ✅ Organized project structure
- ✅ Development tooling
- ✅ Build optimizations

## 📝 Next Steps

1. **Component Development**: Implement the existing components in the new structure
2. **API Integration**: Set up API services with proper typing
3. **State Management**: Add Redux Toolkit or Zustand if needed
4. **Testing**: Add Jest and React Testing Library
5. **Styling**: Implement a complete design system

## 🤝 Contributing

1. Follow the established project structure
2. Use TypeScript for all new code
3. Follow ESLint rules and conventions
4. Write meaningful commit messages
5. Test your changes before submitting

## 📄 License

This project is private and proprietary.