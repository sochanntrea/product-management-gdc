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
  discountPercentage?: string;
}

type Errors = Partial<Record<keyof ProductFormValue, string>>;

interface Props {
  readonly value: ProductFormValue;
  readonly errors: Errors;
  readonly onChange: (key: keyof ProductFormValue, value: string) => void;
}

export function ProductForm({ value, errors = {}, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 space-y-6">
        <section className="rounded-xl border bg-white p-6">
          <h2 className="text-base font-semibold mb-4">General Information</h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">
                Product Name <span className="text-red-500">*</span>
              </label>
              <Input
                value={value.title}
                onChange={(e) => onChange("title", e.target.value)}
                placeholder="Type product name here..."
              />
              {errors.title && (
                <p className="text-xs text-red-600 mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-muted-foreground">
                Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                className="min-h-[140px]"
                value={value.description}
                onChange={(e) => onChange("description", e.target.value)}
                placeholder="Type product description here..."
              />
              {errors.description && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.description}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-xl border bg-white p-6">
          <h2 className="text-base font-semibold mb-4">Pricing</h2>

          <div>
            <label className="text-sm text-muted-foreground">
              Base Price <span className="text-red-500">*</span>
            </label>
            <Input
              type="number"
              value={value.price}
              onChange={(e) => onChange("price", e.target.value)}
              placeholder="$ Type base prive here..."
            />
            {errors.price && (
              <p className="text-xs text-red-600 mt-1">{errors.price}</p>
            )}
          </div>
          <div>
            <label className="text-sm text-muted-foreground">
              Discount Percentage(%) <span className="text-red-500">*</span>
            </label>
            <Input
              type="number"
              value={value.discountPercentage}
              onChange={(e) => onChange("discountPercentage", e.target.value)}
              placeholder="Type discount percentage..."
            />
            {errors.discountPercentage && (
              <p className="text-xs text-red-600 mt-1">
                {errors.discountPercentage}
              </p>
            )}
          </div>
        </section>

        <section className="rounded-xl border bg-white p-6">
          <h2 className="text-base font-semibold mb-4">Inventory</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground">
                SKU <span className="text-red-500">*</span>
              </label>
              <Input
                value={value.sku}
                onChange={(e) => onChange("sku", e.target.value)}
                placeholder="Type product SKU here..."
              />
              {errors.sku && (
                <p className="text-xs text-red-600 mt-1">{errors.sku}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-muted-foreground">
                Quantity <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                value={value.stock}
                onChange={(e) => onChange("stock", e.target.value)}
                placeholder="Type product quantity here..."
              />
              {errors.stock && (
                <p className="text-xs text-red-600 mt-1">{errors.stock}</p>
              )}
            </div>
          </div>
        </section>
      </div>

      <div>
        <section className="rounded-xl border bg-white p-6">
          <h2 className="text-base font-semibold mb-5">Category</h2>

          <label className="text-sm text-muted-foreground">
            Product Category <span className="text-red-500">*</span>
          </label>

          <Select
            value={value.category || undefined}
            onValueChange={(v) => onChange("category", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="smartphones">Smartphones</SelectItem>
              <SelectItem value="laptops">Laptops</SelectItem>
              <SelectItem value="fragrances">Fragrances</SelectItem>
              <SelectItem value="beauty">Beauty</SelectItem>
              <SelectItem value="furniture">Furniture</SelectItem>
              <SelectItem value="groceries">Groceries</SelectItem>
              <SelectItem value="home-decoration">Home-Decoration</SelectItem>
              <SelectItem value="	kitchen-accessories">
                Kitchen-Accessories
              </SelectItem>
              <SelectItem value="mens-shirts">Mens-Shirts</SelectItem>
              <SelectItem value="mens-shoes">Mens-Shoes</SelectItem>
              <SelectItem value="mens-watches">Mens-Watches</SelectItem>
              <SelectItem value="mobile-accessories">
                Mobile-Accessories
              </SelectItem>
              <SelectItem value="motorcycle">Motorcycle</SelectItem>
              <SelectItem value="skin-care">Skin-care</SelectItem>
              <SelectItem value="sports-accessories">
                Sports-Accessories
              </SelectItem>
              <SelectItem value="sunglasses">Sunglasses</SelectItem>
              <SelectItem value="tablets">Tablets</SelectItem>
              <SelectItem value="tops">Tops</SelectItem>
              <SelectItem value="vehicle">Vehicle</SelectItem>
              <SelectItem value="womens-bags">Womens-Bags</SelectItem>
              <SelectItem value="womens-dresses">Womens-Dresses</SelectItem>
              <SelectItem value="womens-jewellery">
                Womens-Jewellerys
              </SelectItem>
              <SelectItem value="womens-shoes">Womens-Shoes</SelectItem>
              <SelectItem value="womens-watches">Womens-Watches</SelectItem>
            </SelectContent>
          </Select>

          {errors.category && (
            <p className="text-xs text-red-600 mt-1">{errors.category}</p>
          )}
        </section>
      </div>
    </div>
  );
}
