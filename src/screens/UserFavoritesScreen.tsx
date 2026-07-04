import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ProductCard } from '@/components/product-card';
import { ProductList } from '@/components/product-list';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useProducts } from '@/hooks/useProducts';
import { useProductSearch } from '@/hooks/useProductSearch';
import { Product } from '@/types/product';
import { RootStackParamList } from '@/navigation/RootNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function UserFavoritesScreen() {
  const favorites = useFavoritesStore((s) => s.favorites);
  const { data: products } = useProducts();
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState('');

  const favoriteProducts = products?.filter((p) => favorites.includes(p.id)) ?? [];
  const filtered = useProductSearch(favoriteProducts, search);

  if (favoriteProducts.length === 0 && !search) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText>No favorites yet.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ProductList
      data={filtered}
      searchValue={search}
      onSearchChange={setSearch}
      emptyMessage={
        search ? 'No products match your search.' : 'No favorites yet.'
      }
      renderItem={({ item }: { item: Product }) => (
        <ProductCard
          product={item}
          onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
