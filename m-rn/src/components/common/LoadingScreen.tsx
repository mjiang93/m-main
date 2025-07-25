import React from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import {useTheme} from '@hooks/index';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({message = 'Loading...'}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    text: {
      marginTop: theme.spacing.md,
      color: theme.colors.text,
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default LoadingScreen;