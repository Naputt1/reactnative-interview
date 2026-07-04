import { RouteProp, useRoute } from "@react-navigation/native";
import { Image } from "expo-image";

import { Pressable, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useProduct } from "@/hooks/useProduct";
import { RootStackParamList } from "@/navigation/RootNavigator";
import { useFavoritesStore } from "@/store/useFavoritesStore";

type ProductDetailRouteProp = RouteProp<RootStackParamList, "ProductDetail">;

export default function ProductDetailScreen() {
  const route = useRoute<ProductDetailRouteProp>();
  const { id } = route.params;
  const { data: product, isLoading, isError, error, refetch } = useProduct(id);
  const favorites = useFavoritesStore((s) => s.favorites);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const theme = useTheme();

  const favorited = product ? favorites.includes(product.id) : false;
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (isError) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText>{error?.message || "Failed to load product."}</ThemedText>
        <TouchableOpacity onPress={() => refetch()} style={styles.retryButton}>
          <ThemedText style={styles.retryText}>Try Again</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  if (isLoading || !product) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  const handleToggle = () => {
    if (!favorited) {
      scale.value = withSequence(
        withTiming(0.8, { duration: 0 }),
        withSpring(1.3, { damping: 8, stiffness: 100 }),
        withSpring(1),
      );
    } else {
      scale.value = withTiming(1, { duration: 0 });
    }
    toggleFavorite(product.id);
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: product.image }} style={styles.image} cachePolicy="memory-disk" transition={300} />

        <ThemedView style={styles.section}>
          <ThemedText style={styles.category}>{product.category}</ThemedText>
          <ThemedText style={styles.title}>{product.title}</ThemedText>
          <ThemedText style={styles.price}>
            ${product.price.toFixed(2)}
          </ThemedText>
          <ThemedText style={styles.rating}>
            Rating: {product.rating.rate}/5 ({product.rating.count} reviews)
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText style={styles.description}>
            {product.description}
          </ThemedText>
        </ThemedView>

        <Pressable
          onPress={handleToggle}
          style={({ pressed }) => [
            styles.favoriteButton,
            {
              backgroundColor: favorited ? theme.text : theme.backgroundElement,
              borderColor: theme.text,
            },
            pressed && { opacity: 0.7 },
          ]}
        >
          <Animated.View style={animatedStyle}>
            <ThemedText
              style={[
                styles.favoriteButtonText,
                {
                  color: favorited ? theme.background : theme.text,
                },
              ]}
            >
              {favorited ? "❤️ Favorited" : "♡ Add to Favorites"}
            </ThemedText>
          </Animated.View>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.four,
    gap: Spacing.three,
  },
  retryButton: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    borderWidth: 1,
    borderColor: "currentColor",
  },
  retryText: {
    fontWeight: "600",
  },
  content: {
    padding: Spacing.four,
    gap: Spacing.four,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  section: {
    gap: Spacing.two,
  },
  category: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
  },
  rating: {
    fontSize: 14,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
  },
  favoriteButton: {
    paddingVertical: Spacing.three,
    borderRadius: Spacing.three,
    alignItems: "center",
    borderWidth: 1,
  },
  favoriteButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
