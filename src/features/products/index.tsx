import { Routes, Route } from "react-router-dom";
import ProductPage  from "@/features/products/pages/list/ProductPage";
import ProductAddNew from "./pages/add/ProductAddNew";
import ProductEdit from "./pages/edit/ProductEdit";

const Products = () => {
  return (
    <div>
      <Routes>
        {/* /products */}
        <Route index element={<ProductPage />} />

        {/* /products/add-product */}
        <Route path="add-product" element={<ProductAddNew />} />

        {/* /products/edit-product/:id */}
        <Route path="edit-product/:id" element={<ProductEdit />} />
      </Routes>
    </div>
  );
};

export default Products;
