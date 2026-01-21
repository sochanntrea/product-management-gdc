import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/services/production-list/product.api";
import { TopToolbar } from "@/components/production-list/topToolbar";
import { FilterToolbar } from "@/components/production-list/filterToolbar";
import { TabBar } from "@/components/production-list/tabBar";
import { ProductTable } from "@/components/production-list/productTable";
import { ProductTab, Product } from "@/types/production-list/type";
import ComingSoon from "@/pages/coming-soon/coming_soon";

import {
  getPendingProducts,
  removePendingProduct,
} from "@/utils/pendingProducts";
import { PendingPanel } from "./PendingPanel";

export default function ProductPage() {
  const location = useLocation();

  const actionState = location.state as
    | { action?: "create" | "update"; productSku?: string }
    | undefined;

  const [activeTab, setActiveTab] = useState<ProductTab>("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const limit = 10;
  const totalPages = Math.ceil(total / limit);
  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getProducts(page, limit);

      setProducts(data.products);
      setTotal(data.total);
      setSelected([]);
      const pending = getPendingProducts();

      pending.forEach((p) => {
        const exists = data.products.some((prod) => prod.sku === p.sku);

        if (p.action === "create" && exists) {
          removePendingProduct(p.sku);
        }

        if (p.action === "delete" && !exists) {
          removePendingProduct(p.sku);
        }
      });

      if (
        (actionState?.action === "create" ||
          actionState?.action === "update") &&
        actionState.productSku
      ) {
        const exists = data.products.some(
          (p) => p.sku === actionState.productSku,
        );

        if (!exists) {
          alert(
            "Your request was submitted successfully, but the data is still syncing. Please refresh or check again shortly.",
          );
        }
      }
    } catch {
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [page, limit, actionState?.productSku]);

  useEffect(() => {
    if (activeTab !== "all") return;
    loadProducts();
  }, [activeTab, page, loadProducts]);

  useEffect(() => {
    if (location.state) {
      window.history.replaceState({}, document.title);
    }
  }, []);

  const allSelected =
    selected.length === products.length && products.length > 0;

  const someSelected = selected.length > 0 && selected.length < products.length;

  const toggleAll = () => {
    setSelected(allSelected ? [] : products.map((p) => p.sku));
  };

  const toggleOne = (sku: string) => {
    setSelected((prev) =>
      prev.includes(sku) ? prev.filter((id) => id !== sku) : [...prev, sku],
    );
  };

  return (
    <div className="space-y-5">
      <TopToolbar />

      <PendingPanel />

      <div className="flex justify-between items-center">
        <TabBar
          activeTab={activeTab}
          onChange={(tab) => {
            setActiveTab(tab);
            setPage(1);
            setSelected([]);
          }}
        />

        <div className="flex gap-2">
          <FilterToolbar />

          <Button variant="outline" onClick={loadProducts} disabled={loading}>
            {loading ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
      </div>

      {activeTab === "all" ? (
        <ProductTable
          products={products}
          selected={selected}
          allSelected={allSelected}
          someSelected={someSelected}
          onToggleAll={toggleAll}
          onToggleOne={toggleOne}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          total={total}
        />
      ) : (
        <ComingSoon />
      )}
    </div>
  );
}
