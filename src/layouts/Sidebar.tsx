import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
} from "lucide-react";

const menu = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Product Management", icon: Package, path: "/products" },
  { label: "Order Management", icon: ShoppingCart, path: "/orders" },
  { label: "Customer Management", icon: Users, path: "/customers" },
  { label: "Reports", icon: BarChart3, path: "/reports" },
];

export default function Sidebar() {
  return (
    <aside
      className="
        bg-blue-600 text-white flex flex-col
        w-16 lg:w-64
        transition-all duration-300
      "
    >
      <div className="h-16 flex items-center justify-center lg:justify-start px-4 font-bold text-lg">
        <span className="lg:hidden">●</span>
        <span className="hidden lg:block">● Logo</span>
      </div>

      <nav className="flex-1 px-2 space-y-1">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `
                group relative flex items-center
                gap-3 px-3 py-2 rounded-lg text-sm
                transition
                ${isActive ? "bg-white/20 font-medium" : "hover:bg-white/10"}
              `
              }
            >
              <Icon size={18} />

              <span className="hidden lg:inline">{item.label}</span>

              <span
                className="
                  pointer-events-none
                  absolute left-full ml-2
                  whitespace-nowrap
                  rounded bg-black px-2 py-1 text-xs text-white
                  opacity-0 translate-x-1
                  group-hover:opacity-100 group-hover:translate-x-0
                  transition
                  lg:hidden
                "
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
