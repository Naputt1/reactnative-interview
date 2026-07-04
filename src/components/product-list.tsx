import { FlatList, Pressable, RefreshControl, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { SearchBar } from './search-bar';
import { Product } from '@/types/product';
import { Spacing } from '@/constants/theme';

interface ProductListProps {
  data: Product[];
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
  refreshing?: boolean;
  emptyMessage?: string;
  searchValue: string;
  onSearchChange: (text: string) => void;
  onRefresh?: () => void;
  renderItem: ({ item }: { item: Product }) => React.ReactElement;
  loadingMessage?: string;
}

export function ProductList({
  data,
  isLoading,
  isError,
  errorMessage,
  onRetry,
  refreshing,
  emptyMessage = 'No products found.',
  searchValue,
  onSearchChange,
  onRefresh,
  renderItem,
  loadingMessage = 'Loading...',
}: ProductListProps) {
  if (isError) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText style={styles.errorText}>{errorMessage || 'Something went wrong'}</ThemedText>
        {onRetry && (
          <Pressable onPress={onRetry} style={styles.retryButton}>
            <ThemedText style={styles.retryText}>Try Again</ThemedText>
          </Pressable>
        )}
      </ThemedView>
    );
  }

  if (isLoading) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText>{loadingMessage}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <SearchBar value={searchValue} onChangeText={onSearchChange} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={refreshing ?? false} onRefresh={onRefresh} />
          ) : undefined
        }
        ListEmptyComponent={
          <ThemedText style={styles.emptyText}>{emptyMessage}</ThemedText>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: Spacing.three,
    gap: Spacing.three,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: Spacing.five,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: Spacing.three,
  },
  retryButton: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    borderWidth: 1,
    borderColor: 'currentColor',
  },
  retryText: {
    fontWeight: '600',
  },
});
