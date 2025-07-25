import {StyleSheet} from 'react-native';
import {BaseToast, ErrorToast} from 'react-native-toast-message';

const styles = StyleSheet.create({
  successToast: {
    borderLeftColor: '#34C759',
    backgroundColor: '#F0FFF4',
  },
  errorToast: {
    borderLeftColor: '#FF3B30',
    backgroundColor: '#FFF5F5',
  },
  infoToast: {
    borderLeftColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  warningToast: {
    borderLeftColor: '#FF9500',
    backgroundColor: '#FFFAF0',
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  text1: {
    fontSize: 16,
    fontWeight: '600',
  },
  text2: {
    fontSize: 14,
    fontWeight: '400',
  },
});

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={styles.successToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={styles.errorToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
  info: (props: any) => (
    <BaseToast
      {...props}
      style={styles.infoToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
  warning: (props: any) => (
    <BaseToast
      {...props}
      style={styles.warningToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
};