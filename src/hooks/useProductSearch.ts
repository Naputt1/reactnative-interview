import { useMemo } from 'react';
import { Product } from '@/types/product';

export function useProductSearch(products: Product[] | undefined, query: string): Product[] {
  return useMemo(() => {
    if (!products) return [];
    if (!query.trim()) return products;

    const lower = query.toLowerCase();
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower),
    );
  }, [products, query]);
}
