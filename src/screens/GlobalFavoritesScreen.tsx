import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ProductCard } from '@/components/product-card';
import { ProductList } from '@/components/product-list';
import { useProducts } from '@/hooks/useProducts';
import { useProductSearch } from '@/hooks/useProductSearch';
import { Product } from '@/types/product';
import { RootStackParamList } from '@/navigation/RootNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function GlobalFavoritesScreen() {
  const { data: products, isLoading } = useProducts();
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState('');

  const sorted = products
    ? [...products].sort((a, b) => b.rating.rate - a.rating.rate)
    : [];

  const filtered = useProductSearch(sorted, search);

  return (
    <ProductList
      data={filtered}
      isLoading={isLoading}
      searchValue={search}
      onSearchChange={setSearch}
      renderItem={({ item }: { item: Product }) => (
        <ProductCard
          product={item}
          showRating
          onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
        />
      )}
    />
  );
}
