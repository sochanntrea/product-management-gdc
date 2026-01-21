import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "@/components/layouts/AppLayout";
import ComingSoon from "@/features/coming-soon/pages/coming_soon";
import Products from "@/features/products";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/products" replace />} />

        <Route path="/products/*" element={<Products />} />
        <Route path="/dashboard/*" element={<ComingSoon />} />
        <Route path="/orders/*" element={<ComingSoon />} />
        <Route path="/customers/*" element={<ComingSoon />} />
        <Route path="/reports/*" element={<ComingSoon />} />

        <Route path="*" element={<ComingSoon />} />
      </Route>
    </Routes>
  );
}
