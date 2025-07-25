import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@hooks/index';

const ForgotPasswordScreen: React.FC = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    text: {
      ...theme.typography.h2,
      color: theme.colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Forgot Password Screen</Text>
    </View>
  );
};

export default ForgotPasswordScreen;