import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useTheme, useAuth} from '@hooks/index';
import Button from '@components/common/Button';

const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const {user, logout} = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      padding: theme.spacing.lg,
    },
    welcome: {
      ...theme.typography.h1,
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: theme.spacing.lg,
    },
    subtitle: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: theme.spacing.xl,
    },
    userInfo: {
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.lg,
      marginBottom: theme.spacing.lg,
    },
    userText: {
      ...theme.typography.body,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    logoutButton: {
      marginTop: theme.spacing.lg,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcome}>Welcome to Multi-RN</Text>
        <Text style={styles.subtitle}>
          A comprehensive React Native architecture for multiple scenarios
        </Text>

        {user && (
          <View style={styles.userInfo}>
            <Text style={styles.userText}>Name: {user.name}</Text>
            <Text style={styles.userText}>Email: {user.email}</Text>
            <Text style={styles.userText}>Role: {user.role}</Text>
          </View>
        )}

        <Button
          title="Logout"
          onPress={handleLogout}
          variant="outline"
          style={styles.logoutButton}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;