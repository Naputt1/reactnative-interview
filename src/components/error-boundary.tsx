import { Component, ErrorInfo, ReactNode } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { Spacing } from '@/constants/theme';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView style={styles.container}>
          <ThemedView style={styles.content}>
            <ThemedText style={styles.title}>Something went wrong</ThemedText>
            <ThemedText style={styles.message}>
              {this.state.error?.message || 'An unexpected error occurred.'}
            </ThemedText>
            <Pressable onPress={this.handleRetry} style={styles.button}>
              <ThemedText style={styles.buttonText}>Try Again</ThemedText>
            </Pressable>
          </ThemedView>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.four,
    gap: Spacing.three,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  message: {
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'currentColor',
  },
  buttonText: {
    fontWeight: '600',
  },
});
