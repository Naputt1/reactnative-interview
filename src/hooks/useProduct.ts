import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types/product';

async function fetchProduct(id: number): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch product (${res.status})`);
  return res.json();
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
  });
}
