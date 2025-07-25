# Multi-Scenario React Native Architecture (M-RN)

A comprehensive, scalable React Native architecture designed to handle multiple scenarios and use cases. This architecture provides a solid foundation for building robust mobile applications with modern development practices.

## 🏗️ Architecture Overview

This architecture follows a modular, scalable approach with clear separation of concerns:

```
m-rn/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── common/         # Common components (Button, Input, etc.)
│   ├── config/             # Configuration files
│   │   ├── index.ts        # App configuration
│   │   ├── theme.ts        # Theme configuration
│   │   └── toast.ts        # Toast configuration
│   ├── hooks/              # Custom React hooks
│   ├── navigation/         # Navigation configuration
│   ├── screens/            # Screen components
│   │   ├── auth/          # Authentication screens
│   │   ├── main/          # Main app screens
│   │   ├── onboarding/    # Onboarding screens
│   │   ├── settings/      # Settings screens
│   │   └── common/        # Common screens
│   ├── services/          # API services and external integrations
│   ├── store/             # Redux store and slices
│   │   └── slices/        # Redux slices
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── assets/                # Static assets (images, fonts, etc.)
└── package.json
```

## 🚀 Key Features

### State Management
- **Redux Toolkit** for efficient state management
- **Redux Persist** for data persistence
- Modular slice-based architecture
- Async thunks for API calls

### Navigation
- **React Navigation v6** with TypeScript support
- Stack, Tab, and Drawer navigation patterns
- Type-safe navigation with parameter validation
- Deep linking support ready

### UI/UX
- **Theming system** with light/dark mode support
- **Responsive design** with device-specific adaptations
- **Reusable components** with consistent styling
- **Toast notifications** for user feedback

### API Integration
- **Axios-based HTTP client** with interceptors
- **Automatic token refresh** mechanism
- **Request/Response transformation**
- **Error handling** and retry logic

### Development Experience
- **TypeScript** for type safety
- **Path mapping** for clean imports
- **ESLint & Prettier** for code quality
- **Modular architecture** for scalability

## 📱 Supported Scenarios

### 1. Authentication Flow
- Login/Register screens
- Password reset functionality
- Biometric authentication support
- Token-based authentication with refresh

### 2. Main Application Flow
- Tab-based navigation
- Profile management
- Settings and preferences
- Notifications handling

### 3. Onboarding Experience
- Welcome screens
- Feature introduction
- User preferences setup
- Terms and conditions

### 4. Multi-Theme Support
- Light and dark themes
- Dynamic theme switching
- Consistent color schemes
- Responsive typography

## 🛠️ Installation & Setup

1. **Install dependencies:**
```bash
npm install
# or
yarn install
```

2. **iOS Setup:**
```bash
cd ios && pod install
```

3. **Run the application:**
```bash
# iOS
npm run ios
# or
yarn ios

# Android
npm run android
# or
yarn android
```

## 🔧 Configuration

### Environment Configuration
Update `src/config/index.ts` with your environment-specific settings:

```typescript
export const Config = {
  API: {
    BASE_URL: 'https://your-api-url.com',
    TIMEOUT: 30000,
  },
  // ... other configurations
};
```

### Theme Customization
Modify `src/config/theme.ts` to customize the app's appearance:

```typescript
export const lightTheme: Theme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    // ... other colors
  },
  // ... other theme properties
};
```

## 📚 Usage Examples

### Using Custom Hooks

```typescript
import {useAuth, useTheme} from '@hooks/index';

const MyComponent = () => {
  const {user, login, logout} = useAuth();
  const theme = useTheme();
  
  // Component logic here
};
```

### API Service Usage

```typescript
import {authService} from '@services/authService';

const handleLogin = async (credentials) => {
  try {
    const response = await authService.login(credentials);
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

### Redux Store Usage

```typescript
import {useAppDispatch, useAppSelector} from '@hooks/index';
import {loginUser} from '@store/slices/authSlice';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const {isLoading} = useAppSelector(state => state.auth);
  
  const handleLogin = (credentials) => {
    dispatch(loginUser(credentials));
  };
};
```

## 🎨 Component Library

### Button Component
```typescript
<Button
  title="Login"
  onPress={handleLogin}
  variant="primary"
  size="medium"
  loading={isLoading}
/>
```

### Input Component
```typescript
<Input
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
  error={emailError}
/>
```

## 🔒 Security Features

- **Token-based authentication** with automatic refresh
- **Secure storage** for sensitive data
- **API request/response encryption** ready
- **Biometric authentication** support
- **Deep linking** security measures

## 📊 Performance Optimizations

- **Lazy loading** for screens and components
- **Image optimization** and caching
- **Bundle splitting** for reduced app size
- **Memory management** best practices
- **Network request optimization**

## 🧪 Testing Strategy

- **Unit tests** for utilities and services
- **Component tests** for UI components
- **Integration tests** for API services
- **E2E tests** for critical user flows

## 📈 Scalability Considerations

- **Modular architecture** for easy feature addition
- **Code splitting** for performance
- **Micro-frontend** architecture ready
- **Multi-environment** support
- **CI/CD** pipeline integration ready

## 🤝 Contributing

1. Follow the established folder structure
2. Use TypeScript for all new code
3. Follow the naming conventions
4. Add proper error handling
5. Update documentation as needed

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions and support, please refer to the documentation or create an issue in the repository.

---

**Built with ❤️ for the React Native community**