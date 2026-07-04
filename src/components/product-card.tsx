import { Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { Product } from '@/types/product';
import { Spacing } from '@/constants/theme';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  showRating?: boolean;
}

export function ProductCard({ product, onPress, showRating }: ProductCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <ThemedView style={styles.cardContent}>
        <ThemedText numberOfLines={2} style={styles.title}>
          {product.title}
        </ThemedText>
        <ThemedText style={styles.price}>
          ${product.price.toFixed(2)}
        </ThemedText>
        {showRating && (
          <ThemedText style={styles.rating}>
            ★ {product.rating.rate}/5 ({product.rating.count})
          </ThemedText>
        )}
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
});
