import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import ProductPage from "@/pages/production/list/ProductPage";
import ComingSoon from "@/pages/coming-soon/coming_soon";
import ProductAddNew from "@/pages/production/add/ProductAddNew";
import ProductEdit from "@/pages/production/edit/ProductEdit";

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
