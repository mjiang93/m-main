import {Dimensions, Platform} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export const Config = {
  // Environment
  ENV: __DEV__ ? 'development' : 'production',
  
  // API Configuration
  API: {
    BASE_URL: __DEV__ 
      ? 'https://api-dev.example.com' 
      : 'https://api.example.com',
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3,
  },
  
  // App Configuration
  APP: {
    NAME: 'Multi-RN',
    VERSION: '1.0.0',
    BUILD_NUMBER: 1,
  },
  
  // Device Configuration
  DEVICE: {
    WIDTH: screenWidth,
    HEIGHT: screenHeight,
    IS_ANDROID: Platform.OS === 'android',
    IS_IOS: Platform.OS === 'ios',
    IS_TABLET: screenWidth >= 768,
  },
  
  // Storage Keys
  STORAGE_KEYS: {
    AUTH_TOKEN: '@auth_token',
    USER_DATA: '@user_data',
    THEME: '@theme',
    LANGUAGE: '@language',
    ONBOARDING: '@onboarding_completed',
  },
  
  // Feature Flags
  FEATURES: {
    BIOMETRIC_AUTH: true,
    PUSH_NOTIFICATIONS: true,
    ANALYTICS: true,
    CRASH_REPORTING: true,
    OFFLINE_MODE: true,
  },
  
  // Pagination
  PAGINATION: {
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100,
  },
  
  // Cache
  CACHE: {
    TTL: 5 * 60 * 1000, // 5 minutes
    MAX_SIZE: 50,
  },
};

export default Config;