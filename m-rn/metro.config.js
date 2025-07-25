const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    alias: {
      '@': './src',
      '@components': './src/components',
      '@screens': './src/screens',
      '@navigation': './src/navigation',
      '@services': './src/services',
      '@store': './src/store',
      '@utils': './src/utils',
      '@hooks': './src/hooks',
      '@types': './src/types',
      '@assets': './assets',
      '@config': './src/config',
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);