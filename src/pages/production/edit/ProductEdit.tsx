import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Save } from "lucide-react";
import {
    getProductById,
    updateProduct,
    } from "@/services/production-edit/product.api";
import {
    ProductForm,
    ProductFormValue,
    } from "@/components/production-add-new/ProductForm";


const INITIAL_FORM: ProductFormValue = {
  title: "",
  description: "",
  category: "",
  price: "",
  sku: "",
  stock: "",
};

const ProductEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] =
    useState<ProductFormValue>(INITIAL_FORM);
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
        });
      } catch (err) {
        alert("Failed to load product");
      } finally {
        setFetching(false);
      }
    };

    fetchProduct();
  }, [id]);

  const updateForm = (
    key: keyof ProductFormValue,
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async () => {
    if (!id) return;

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

      alert("Product updated successfully");
      navigate("/product");
    } catch (err) {
      alert("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div>Loading...</div>;
  }

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
            <Save size={16} />
            Save Changes
          </Button>
        </div>
      </div>

      <ProductForm
        value={form}
        onChange={updateForm}
      />
    </div>
  );
};

export default ProductEdit;
