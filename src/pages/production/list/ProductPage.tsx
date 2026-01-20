import { useEffect, useState } from "react";
import { getProducts } from "@/services/production-list/product.api";
import { TopToolbar } from "@/components/production-list/topToolbar";
import { FilterToolbar } from "@/components/production-list/filterToolbar";
import { TabBar } from "@/components/production-list/tabBar";
import { ProductTable } from "@/components/production-list/productTable";
import { ProductTab, Product } from "@/types/production-list/type";
import ComingSoon from "@/pages/coming-soon/coming_soon";


export default function ProductPage() {
  const [activeTab, setActiveTab] = useState<ProductTab>("all");

  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const totalPages = Math.ceil(total / limit);
  useEffect(() => {
    if (activeTab !== "all") return;

    async function fetchData() {
      const data = await getProducts(page, limit);
      setProducts(data.products);
      setTotal(data.total);
      setSelected([]);
    }

    fetchData();
  }, [activeTab, page]);

  const allSelected =
    selected.length === products.length && products.length > 0;

  const someSelected =
    selected.length > 0 &&
    selected.length < products.length;

  const toggleAll = () => {
    setSelected(
      allSelected ? [] : products.map((p) => p.sku)
    );
  };

  const toggleOne = (sku: string) => {
    setSelected((prev) =>
      prev.includes(sku)
        ? prev.filter((id) => id !== sku)
        : [...prev, sku]
    );
  };

  return (
    <div className="space-y-5">
      <TopToolbar />
      <div className="flex justify-between items-center">
        <TabBar
          activeTab={activeTab}
          onChange={(tab) => {
            setActiveTab(tab);
            setPage(1);
            setSelected([]);
          }}
        />
        <FilterToolbar />
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
