import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Save } from "lucide-react";
import {
  getProductById,
  updateProduct,
} from "@/features/products/services/production-edit/product.api";
import {
  ProductForm,
  ProductFormValue,
} from "@/features/products/components/production-add-edit/ProductForm";
import { addPendingProduct } from "@/features/products/components/handling-error/pendingProducts";
import { toast } from "sonner";

type Errors = Partial<Record<keyof ProductFormValue, string>>;

const INITIAL_FORM: ProductFormValue = {
  title: "",
  description: "",
  category: "",
  price: "",
  sku: "",
  stock: "",
  discountPercentage: "",
};

const ProductEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<ProductFormValue>(INITIAL_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);

        setForm({
          title: data.title ?? "",
          description: data.description ?? "",
          category: data.category ?? "",
          price: String(data.price ?? ""),
          sku: data.sku ?? "",
          stock: String(data.stock ?? ""),
          discountPercentage: String(data.discountPercentage ?? ""),
        });
      } catch {
        toast("Failed", {
          description: "Failed to load product.",
        });
      } finally {
        setFetching(false);
      }
    };

    fetchProduct();
  }, [id]);

  const updateForm = (key: keyof ProductFormValue, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const e: Errors = {};

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
    if (!id || !validate()) return;

    try {
      setLoading(true);

      await updateProduct(id, {
        title: form.title,
        description: form.description,
        category: form.category,
        price: Number(form.price),
        sku: form.sku,
        stock: Number(form.stock),
      });

      addPendingProduct({
        sku: form.sku,
        action: "update",
        snapshot: form,
        timestamp: Date.now(),
      });

      toast("Sync in progress", {
        description:
          "Your update has been submitted successfully. The list will sync shortly.",
      });

      navigate("/products", {
        state: {
          action: "update",
          productSku: form.sku,
        },
      });
    } catch {
      toast("Failed", {
        description: "Failed to update product.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/products")}
          >
            Product
          </span>{" "}
          › Edit Product
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <X size={16} /> Cancel
          </Button>

          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={onSubmit}
            disabled={loading}
          >
            <Save size={16} /> Save Changes
          </Button>
        </div>
      </div>

      <ProductForm value={form} errors={errors} onChange={updateForm} />
    </div>
  );
};

export default ProductEdit;
