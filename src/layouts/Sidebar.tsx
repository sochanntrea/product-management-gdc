import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
} from "lucide-react";

const menu = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    label: "Product Management",
    icon: Package,
    path: "/products",
  },
  {
    label: "Order Management",
    icon: ShoppingCart,
    path: "/orders",
  },
  {
    label: "Customer Management",
    icon: Users,
    path: "/customers",
  },
  {
    label: "Reports",
    icon: BarChart3,
    path: "/reports",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-blue-600 text-white flex flex-col">
      <div className="h-16 flex items-center px-6 font-bold text-lg">
        ● Logo
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition
                 ${
                   isActive
                     ? "bg-white/20 font-medium"
                     : "hover:bg-white/10"
                 }`
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
