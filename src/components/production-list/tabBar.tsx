import { cn } from "@/lib/utils";
import { ProductTab } from "../../types/production-list/type";

const TABS: { label: string; value: ProductTab }[] = [
  { label: "All Product", value: "all" },
  { label: "Published", value: "published" },
  { label: "Low Stock", value: "low_stock" },
  { label: "Draft", value: "draft" },
];

type Props = {
  readonly activeTab: ProductTab;
  readonly onChange: (tab: ProductTab) => void;
};

export function TabBar({ activeTab, onChange }: Props) {
  return (
    <div className="inline-flex rounded-lg bg-muted p-1 border border-gray-300">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            "px-4 py-1.5 text-sm font-medium rounded-md transition",
            activeTab === tab.value
              ? "bg-blue-100 text-blue-500 shadow"
              : "text-muted-foreground hover:text-foreground text-gray-500",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
