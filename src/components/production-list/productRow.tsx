import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableRow, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Product } from "../../types/production-list/type";
import { deleteProduct } from "@/services/production-delete/product.api";
import { formatDate } from "@/utils/date";
import { addPendingProduct } from "@/utils/pendingProducts";
import { toast } from "sonner";

interface Props {
  readonly product: Product;
  readonly selected: boolean;
  readonly onToggle: () => void;
}

export function ProductRow({ product, selected, onToggle }: Props) {
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  const onEdit = () => {
    navigate(`edit-product/${product.id}`);
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await deleteProduct(product.id);

      addPendingProduct({
        sku: product.sku,
        action: "delete",
        snapshot: {
          title: product.title,
          description: "",
          category: product.category,
          price: String(product.price),
          sku: product.sku,
          stock: String(product.stock),
          discountPercentage: "",
        },
        timestamp: Date.now(),
      });

      setOpenDelete(false);

      setTimeout(() => {
        toast("Sync in progress", {
          description:
            "Your delete request has been submitted successfully. The list will be updated shortly.",
        });
      }, 0);
    } catch {
      toast("Failed", {
          description:
            "Failed to delete product.",
        });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TableRow className={selected ? "bg-blue-50" : ""}>
        <TableCell>
          <Checkbox
            checked={selected}
            onCheckedChange={onToggle}
            className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
          />
        </TableCell>

        <TableCell>
          <div className="flex items-center gap-3">
            <img
              src={product.thumbnail}
              alt="product"
              className="w-10 h-10 rounded-md object-cover"
            />
            <div className="font-medium">{product.title}</div>
          </div>
        </TableCell>

        <TableCell className="text-primary">{product.sku}</TableCell>
        <TableCell>{product.category}</TableCell>
        <TableCell>{product.stock}</TableCell>
        <TableCell>${product.price}</TableCell>
        <TableCell>{formatDate(product.meta.createdAt)}</TableCell>

        <TableCell className="text-right">
          <div className="flex justify-end gap-3 text-muted-foreground">
            <Pencil
              size={16}
              onClick={onEdit}
              className="cursor-pointer hover:text-foreground"
            />
            <Trash2
              size={16}
              onClick={() => setOpenDelete(true)}
              className="cursor-pointer hover:text-destructive"
            />
          </div>
        </TableCell>
      </TableRow>

      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete product?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The product will be permanently
              removed.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onDelete}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700"
            >
              {loading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
