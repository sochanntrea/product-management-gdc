import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { createProduct } from "@/features/products/services/production-add-new/product.api";
import {
  ProductForm,
  ProductFormValue,
} from "@/features/products/components/production-add-edit/ProductForm";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { addPendingProduct } from "@/features/products/components/handling-error/pendingProducts";
import { toast } from "sonner";

const INITIAL_FORM: ProductFormValue = {
  title: "",
  description: "",
  category: "",
  price: "",
  sku: "",
  stock: "",
  discountPercentage: "",
};

export default function ProductAddNew() {
  const navigate = useNavigate();
  const [form, setForm] = useState<ProductFormValue>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ProductFormValue, string>>
  >({});

  const updateForm = (key: keyof ProductFormValue, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const e: typeof errors = {};

    if (!form.title.trim()) e.title = "Product name is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.category) e.category = "Category is required";
    if (!form.price || Number(form.price) <= 0)
      e.price = "Price must be greater than 0";
    if (!form.discountPercentage || Number(form.discountPercentage) <= 0)
      e.discountPercentage = "Discount must be greater than 0";
    if (!form.sku.trim()) e.sku = "SKU is required";
    if (!form.stock || Number(form.stock) <= 0)
      e.stock = "Quantity must be greater than 0";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await createProduct({
        title: form.title,
        description: form.description,
        category: form.category,
        price: Number(form.price),
        sku: form.sku,
        stock: Number(form.stock),
      });

      addPendingProduct({
        sku: form.sku,
        action: "create",
        snapshot: form,
        timestamp: Date.now(),
      });

      toast("Sync in progress", {
        description:
          "Your request has been submitted successfully. The list will sync shortly.",
      });

      navigate("/products", {
        state: {
          action: "create",
          productSku: form.sku,
        },
      });
    } catch {
      toast("Failed", {
        description: "Failed to add product.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Breadcrumb />

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/products")}>
            <X size={16} /> Cancel
          </Button>

          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={onSubmit}
            disabled={loading}
          >
            <Plus size={16} /> Add Product
          </Button>
        </div>
      </div>

      <ProductForm value={form} onChange={updateForm} errors={errors} />
    </div>
  );
}
