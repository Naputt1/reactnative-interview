import { Image } from 'expo-image';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types/product';

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('https://fakestoreapi.com/products');
  if (!res.ok) throw new Error(`Failed to fetch products (${res.status})`);
  const products: Product[] = await res.json();
  Image.prefetch(
    products.map((p) => p.image),
    { cachePolicy: 'memory-disk' },
  );
  return products;
}

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
}
