import { useState } from 'react';
import { FlatList, RefreshControl, Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { SearchBar } from '@/components/search-bar';
import { useProducts } from '@/hooks/useProducts';
import { useProductSearch } from '@/hooks/useProductSearch';
import { Product } from '@/types/product';
import { Spacing } from '@/constants/theme';
import { RootStackParamList } from '@/navigation/RootNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function GlobalFavoritesScreen() {
  const { data: products, isLoading, refetch, isRefetching } = useProducts();
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState('');

  const sorted = products
    ? [...products].sort((a, b) => b.rating.rate - a.rating.rate)
    : [];

  const filtered = useProductSearch(sorted, search);

  const renderItem = ({ item }: { item: Product }) => (
    <Pressable
      onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <ThemedView style={styles.cardContent}>
        <ThemedText numberOfLines={2} style={styles.title}>
          {item.title}
        </ThemedText>
        <ThemedText style={styles.price}>${item.price.toFixed(2)}</ThemedText>
        <ThemedText style={styles.rating}>
          ★ {item.rating.rate}/5 ({item.rating.count})
        </ThemedText>
      </ThemedView>
    </Pressable>
  );

  if (isLoading) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <SearchBar value={search} onChangeText={setSearch} />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        ListEmptyComponent={
          <ThemedText style={styles.emptyText}>
            No products match your search.
          </ThemedText>
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
  card: {
    flexDirection: 'row',
    borderRadius: Spacing.three,
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.7,
  },
  cardContent: {
    flex: 1,
    padding: Spacing.three,
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 120,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 14,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 12,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: Spacing.five,
  },
});
