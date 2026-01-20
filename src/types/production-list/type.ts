export type ProductTab = "all" | "published" | "low_stock" | "draft";

export interface Product {
  id: number;
  sku: string;
  title: string;
  category: string;
  stock: number;
  price: number;
  thumbnail: string;
}
