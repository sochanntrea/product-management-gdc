import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "@/components/layouts/AppLayout";
import ProductPage from "@/features/products/pages/list/ProductPage";
import ComingSoon from "@/features/coming-soon/pages/coming_soon";
import ProductAddNew from "@/features/products/pages/add/ProductAddNew";
import ProductEdit from "@/features/products/pages/edit/ProductEdit";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/products" replace />} />

        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/add-product" element={<ProductAddNew />} />
        <Route path="/products/edit-product/:id" element={<ProductEdit />} />
        <Route path="/dashboard" element={<ComingSoon />} />
        <Route path="/orders" element={<ComingSoon />} />
        <Route path="/customers" element={<ComingSoon />} />
        <Route path="/reports" element={<ComingSoon />} />

        <Route path="*" element={<ComingSoon />} />
      </Route>
    </Routes>
  );
}
