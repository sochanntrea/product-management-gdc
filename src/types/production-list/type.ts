export type ProductTab = "all" | "published" | "low_stock" | "draft";

export interface ProductMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface Product {
  id: number;
  sku: string;
  title: string;
  category: string;
  stock: number;
  price: number;
  thumbnail: string;
  meta: ProductMeta;
  _optimistic?: boolean;
}
