import { PendingProduct } from "@/features/products/components/handling-error/pendingProducts";

export function exportPendingProductsCsv(data: PendingProduct[]) {
  if (data.length === 0) return;

  const header = [
    "SKU",
    "Title",
    "Category",
    "Price",
    "Stock",
    "Action",
    "Timestamp",
  ];

  const rows = data.map((p) => [
    p.sku,
    p.snapshot.title,
    p.snapshot.category,
    p.snapshot.price,
    p.snapshot.stock,
    p.action,
    new Date(p.timestamp).toISOString(),
  ]);

  const csv = header.join(",") + "\n" + rows.map((r) => r.join(",")).join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `pending-products-${Date.now()}.csv`;
  a.click();

  URL.revokeObjectURL(url);
}
