import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { ErrorBoundary } from '@/components/error-boundary';
import { RootNavigator } from '@/navigation/RootNavigator';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer theme={theme}>
          <AnimatedSplashOverlay />
          <RootNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
