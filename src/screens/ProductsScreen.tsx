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

export default function ProductsScreen() {
  const { data: products, isLoading, isError, error, refetch, isRefetching } = useProducts();
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState('');
  const filtered = useProductSearch(products, search);

  return (
    <ProductList
      data={filtered}
      isLoading={isLoading}
      isError={isError}
      errorMessage={error?.message}
      onRetry={refetch}
      searchValue={search}
      onSearchChange={setSearch}
      onRefresh={refetch}
      refreshing={isRefetching}
      loadingMessage="Loading products..."
      emptyMessage="No products match your search."
      renderItem={({ item }: { item: Product }) => (
        <ProductCard
          product={item}
          onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
        />
      )}
    />
  );
}
