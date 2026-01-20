import { useMemo, useState } from "react";
import { Product } from "../../types/production-list/type";

export type SortKey = "title" | "stock" | "price" | null;
export type SortOrder = "asc" | "desc";

export function useProductSort(products: Product[]) {
  const [sort, setSort] = useState<{
    key: SortKey;
    order: SortOrder;
  }>({
    key: null,
    order: "asc",
  });

  const toggleSort = (key: SortKey) => {
    setSort((prev) => {
      if (prev.key !== key) {
        return { key, order: "asc" };
      }
      return {
        key,
        order: prev.order === "asc" ? "desc" : "asc",
      };
    });
  };

  const sortedProducts = useMemo(() => {
    if (!sort.key) return products;

    const key = sort.key as keyof Product;

    return [...products].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];

      if (typeof aVal === "string") {
        return sort.order === "asc"
          ? aVal.localeCompare(bVal as string)
          : (bVal as string).localeCompare(aVal);
      }

      return sort.order === "asc"
        ? Number(aVal) - Number(bVal)
        : Number(bVal) - Number(aVal);
    });
  }, [products, sort]);

  return { sort, toggleSort, sortedProducts };
}
