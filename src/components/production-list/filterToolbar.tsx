import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, SlidersHorizontal } from "lucide-react";

export function FilterToolbar() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-60">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search product..."
          className="
            h-10 pl-9
            rounded-lg
            border-border
            focus-visible:ring-1
            focus-visible:ring-blue-500
          "
        />
      </div>
      <Button
        variant="outline"
        className="
          h-10 gap-2
          rounded-lg
          border-border
          text-muted-foreground
          hover:text-foreground
        "
      >
        <Calendar size={16} />
        Select Date
      </Button>
      <Button
        variant="outline"
        className="
          h-10 gap-2
          rounded-lg
          border-border
          text-muted-foreground
          hover:text-foreground
        "
      >
        <SlidersHorizontal size={16} />
        Filters
      </Button>
    </div>
  );
}
