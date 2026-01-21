import { ProductFormValue } from "@/components/production-add-edit/ProductForm";

export type PendingProduct = {
  sku: string;
  action: "create" | "update" | "delete";
  snapshot: ProductFormValue;
  timestamp: number;
};

const KEY = "pending-products";
const EVENT = "pending-products-changed";

export function getPendingProducts(): PendingProduct[] {
  return JSON.parse(sessionStorage.getItem(KEY) || "[]");
}

export function addPendingProduct(item: PendingProduct) {
  const current = getPendingProducts();
  sessionStorage.setItem(KEY, JSON.stringify([...current, item]));
  window.dispatchEvent(new Event(EVENT));
}

export function removePendingProduct(sku: string) {
  const filtered = getPendingProducts().filter((p) => p.sku !== sku);
  sessionStorage.setItem(KEY, JSON.stringify(filtered));
  window.dispatchEvent(new Event(EVENT));
}

export function clearPendingProducts() {
  sessionStorage.removeItem(KEY);
  window.dispatchEvent(new Event(EVENT));
}

export const PENDING_EVENT = EVENT;
