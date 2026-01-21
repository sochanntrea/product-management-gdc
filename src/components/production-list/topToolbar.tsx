import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function TopToolbar() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center">
      <div className="relative w-[75%]">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search order..." className="pl-9" />
      </div>
      <div className="flex gap-3">
        <Button
          variant="ghost"
          className="gap-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200"
        >
          <Download size={16} />
          Export
        </Button>
        <Button
          onClick={() => navigate("/products/add-product")}
          className="gap-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          <Plus size={16} />
          Add Product
        </Button>
      </div>
    </div>
  );
}
