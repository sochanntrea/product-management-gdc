import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface ProductFormValue {
  title: string;
  description: string;
  category: string;
  price: string;
  sku: string;
  stock: string;
}

interface Props {
  readonly value: ProductFormValue;
  readonly onChange: (
    key: keyof ProductFormValue,
    value: string
  ) => void;
}

export function ProductForm({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 space-y-6">
        <section className="rounded-xl border bg-white p-6">
          <h2 className="text-base font-semibold mb-4">
            General Information
          </h2>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">
                Product Name
              </label>
              <Input
                placeholder="Type product name here..."
                value={value.title}
                onChange={(e) =>
                  onChange("title", e.target.value)
                }
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">
                Description
              </label>
              <Textarea
                placeholder="Type product description here..."
                className="min-h-[140px]"
                value={value.description}
                onChange={(e) =>
                  onChange("description", e.target.value)
                }
              />
            </div>
          </div>
        </section>

        <section className="rounded-xl border bg-white p-6">
          <h2 className="text-base font-semibold mb-4">
            Pricing
          </h2>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">
                Base Price
              </label>
              <Input
                type="number"
                placeholder="$ Type base price here..."
                value={value.price}
                onChange={(e) =>
                  onChange("price", e.target.value)
                }
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">
                Discount Precentage (%)
              </label>
              <Input
                type="number"
                placeholder="Type discount precentage..."
              />
            </div>
          </div>
        </section>

        <section className="rounded-xl border bg-white p-6">
          <h2 className="text-base font-semibold mb-4">
            Inventory
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">
                SKU
              </label>
              <Input
                placeholder="Type product SKU here..."
                value={value.sku}
                onChange={(e) =>
                  onChange("sku", e.target.value)
                }
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">
                Quantity
              </label>
              <Input
                type="number"
                placeholder="Type product quantity here..."
                value={value.stock}
                onChange={(e) =>
                  onChange("stock", e.target.value)
                }
              />
            </div>
          </div>
        </section>
      </div>

      <div>
        <section className="rounded-xl border bg-white p-6">
          <h2 className="text-base font-semibold mb-5">
            Category
          </h2>

          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">
              Product Category
            </label>
            <Select
              value={value.category}
              onValueChange={(v) =>
                onChange("category", v)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="smartphones">
                  Smartphones
                </SelectItem>
                <SelectItem value="laptops">
                  Laptops
                </SelectItem>
                <SelectItem value="fragrances">
                  Fragrances
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>
      </div>
    </div>
  );
}
