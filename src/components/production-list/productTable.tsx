import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "../../types/production-list/type";
import { getPaginationRange } from "./pagination.utils";
import { useProductSort } from "./useProductSort";
import { SortHeader } from "./sortHeader";
import { ProductRow } from "./productRow";

interface Props {
  readonly products: Product[];
  readonly selected: string[];
  readonly allSelected: boolean;
  readonly someSelected: boolean;
  readonly onToggleAll: () => void;
  readonly onToggleOne: (sku: string) => void;
  readonly page: number;
  readonly totalPages: number;
  readonly total: number;
  readonly onPageChange: (p: number) => void;
}

export function ProductTable({
  products,
  selected,
  allSelected,
  someSelected,
  onToggleAll,
  onToggleOne,
  page,
  totalPages,
  total,
  onPageChange,
}: Props) {
  const pages = getPaginationRange(page, totalPages);
  const { sort, toggleSort, sortedProducts } = useProductSort(products);

  let headerChecked: boolean | "indeterminate";
  if (allSelected) {
    headerChecked = true;
  } else if (someSelected) {
    headerChecked = "indeterminate";
  } else {
    headerChecked = false;
  }

  return (
    <div className="rounded-xl border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                checked={headerChecked}
                onCheckedChange={onToggleAll}
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
            </TableHead>

            <TableHead>
              <SortHeader
                label="Product"
                sortKey="title"
                activeKey={sort.key}
                order={sort.order}
                onSort={toggleSort}
              />
            </TableHead>

            <TableHead>SKU</TableHead>
            <TableHead>Category</TableHead>

            <TableHead>
              <SortHeader
                label="Stock"
                sortKey="stock"
                activeKey={sort.key}
                order={sort.order}
                onSort={toggleSort}
              />
            </TableHead>

            <TableHead>
              <SortHeader
                label="Price"
                sortKey="price"
                activeKey={sort.key}
                order={sort.order}
                onSort={toggleSort}
              />
            </TableHead>
            <TableHead className="text-right"> Action </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sortedProducts.map((p) => (
            <ProductRow
              key={p.id}
              product={p}
              selected={selected.includes(p.sku)}
              onToggle={() => onToggleOne(p.sku)}
            />
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center px-4 py-3 text-sm text-muted-foreground">
        <span>
          Showing {(page - 1) * 10 + 1}–{Math.min(page * 10, total)} from{" "}
          {total}
        </span>

        <div className="flex items-center gap-1">
          <button
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="h-8 w-8 rounded-lg bg-blue-100 text-blue-600 disabled:opacity-40"
          >
            ‹
          </button>

          {(() => {
            let ellipsisCount = 0;
            return pages.map((p) =>
              p === "..." ? (
                <span
                  key={`ellipsis-${++ellipsisCount}`}
                  className="px-2 text-blue-400"
                >
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => onPageChange(p)}
                  className={`h-8 w-8 rounded-lg text-sm font-medium ${
                    p === page
                      ? "bg-blue-600 text-white"
                      : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  }`}
                >
                  {p}
                </button>
              ),
            );
          })()}

          <button
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            className="h-8 w-8 rounded-lg bg-blue-100 text-blue-600 disabled:opacity-40"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
