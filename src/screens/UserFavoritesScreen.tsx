import { FlatList, Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useProducts } from '@/hooks/useProducts';
import { Product } from '@/types/product';
import { Spacing } from '@/constants/theme';
import { RootStackParamList } from '@/navigation/RootNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function UserFavoritesScreen() {
  const favorites = useFavoritesStore((s) => s.favorites);
  const { data: products } = useProducts();
  const navigation = useNavigation<NavigationProp>();

  const favoriteProducts = products?.filter((p) => favorites.includes(p.id)) ?? [];

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
      </ThemedView>
    </Pressable>
  );

  if (favoriteProducts.length === 0) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText>No favorites yet.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={favoriteProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
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
});
