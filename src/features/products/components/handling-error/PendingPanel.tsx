import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  getPendingProducts,
  clearPendingProducts,
  PENDING_EVENT,
} from "@/features/products/components/handling-error/pendingProducts";
import { exportPendingProductsCsv } from "@/features/products/components/handling-error/exportPendingCsv";

export function PendingPanel() {
  const [pending, setPending] = useState(getPendingProducts());

  useEffect(() => {
    const update = () => setPending(getPendingProducts());

    window.addEventListener(PENDING_EVENT, update);
    return () => window.removeEventListener(PENDING_EVENT, update);
  }, []);

  if (pending.length === 0) return null;

  return (
    <div className="border border-yellow-400 bg-yellow-50 p-4 rounded space-y-2">
      <div className="font-semibold text-yellow-700">
        ⚠ Pending Product Changes ({pending.length})
      </div>

      <p className="text-sm text-yellow-700">
        These items are not yet confirmed by the backend.
      </p>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => {
            exportPendingProductsCsv(pending);
            clearPendingProducts();
            setPending([]);
          }}
        >
          Export CSV
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            clearPendingProducts();
            setPending([]);
          }}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}
