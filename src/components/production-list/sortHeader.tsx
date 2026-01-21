import { ChevronDown, ChevronUp } from "lucide-react";
import { SortKey, SortOrder } from "./useProductSort";

interface Props {
  readonly label: string;
  readonly sortKey: SortKey;
  readonly activeKey: SortKey | "";
  readonly order: SortOrder;
  readonly onSort: (key: SortKey) => void;
}

export function SortHeader({
  label,
  sortKey,
  activeKey,
  order,
  onSort,
}: Props) {
  const isActive = activeKey === sortKey;

  const sortIcon = !isActive ? (
    <ChevronDown size={14} className="text-muted-foreground opacity-40" />
  ) : order === "asc" ? (
    <ChevronUp size={14} className="text-blue-600" />
  ) : (
    <ChevronDown size={14} className="text-blue-600" />
  );

  return (
    <button
      type="button"
      onClick={() => onSort(sortKey)}
      aria-pressed={isActive}
      className="flex items-center gap-1 cursor-pointer select-none bg-transparent p-0 border-0"
    >
      {label}
      {sortIcon}
    </button>
  );
}
