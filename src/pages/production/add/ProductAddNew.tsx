import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

import { createProduct } from "@/services/production-add-new/product.api";
import {
  ProductForm,
  ProductFormValue,
} from "@/components/production-add-new/ProductForm";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";

const INITIAL_FORM: ProductFormValue = {
  title: "",
  description: "",
  category: "",
  price: "",
  sku: "",
  stock: "",
};

export default function ProductAddNew() {
  const navigate = useNavigate();
  const [form, setForm] =
    useState<ProductFormValue>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);

  const updateForm = (
    key: keyof ProductFormValue,
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async () => {
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

      alert("Product added successfully");
      navigate("/products");
    } catch {
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Breadcrumb />

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/products")}
          >
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

      <ProductForm
        value={form}
        onChange={updateForm}
      />
    </div>
  );
}
