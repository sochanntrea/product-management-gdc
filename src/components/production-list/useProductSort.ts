import { useMemo, useState } from "react";
import { Product } from "../../types/production-list/type";

export type SortOrder = "asc" | "desc";
export type SortKey =
  | "title"
  | "category"
  | "price"
  | "stock"
  | "sku"
  | "meta.createdAt";

function getValueByPath<T>(obj: T, path: string): unknown {
  return path.split(".").reduce((acc, key) => {
    if (acc == null) return undefined;
    return acc[key as keyof typeof acc];
  }, obj as unknown);
}

export function useProductSort(products: Product[]) {
  const [sort, setSort] = useState<{
    key: SortKey | "";
    order: SortOrder;
  }>({
    key: "",
    order: "asc",
  });

  const toggleSort = (key: SortKey | "") => {
    setSort((prev) => ({
      key,
      order: prev.key === key && prev.order === "asc" ? "desc" : "asc",
    }));
  };

  const sortedProducts = useMemo(() => {
    if (!sort.key) return products;

    return [...products].sort((a, b) => {
      const aVal = getValueByPath(a, sort.key);
      const bVal = getValueByPath(b, sort.key);

      if (aVal == null || bVal == null) return 0;

      if (sort.key.includes("createdAt")) {
        return sort.order === "asc"
          ? new Date(aVal as string | number | Date).getTime() -
              new Date(bVal as string | number | Date).getTime()
          : new Date(bVal as string | number | Date).getTime() -
              new Date(aVal as string | number | Date).getTime();
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sort.order === "asc" ? aVal - bVal : bVal - aVal;
      }

      return sort.order === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [products, sort]);

  return { sort, toggleSort, sortedProducts };
}
