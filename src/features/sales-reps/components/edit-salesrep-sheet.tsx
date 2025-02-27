import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";
import { salesRepSchema } from "@/lib/schemas";
import SalesRepForm from "./salesrep-form";
import { useOpenSalesRep } from "../hooks/use-open-salesrep";
import { useGetSalesRep } from "../hooks/use-get-salesrep";
import { useEditSalesRep } from "../hooks/use-edit-salesrep";
import { useDeleteSalesRep } from "../hooks/use-delete-salesrep";

type FormValues = z.input<typeof salesRepSchema>;

const EditSalesRepSheet = () => {
  const { isOpen, onClose, id } = useOpenSalesRep();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this sales representative"
  );

  const salesRepQuery = useGetSalesRep(id!);
  const editMutation = useEditSalesRep();
  const deleteMutation = useDeleteSalesRep(id!);

  const isPending =
    salesRepQuery.isPending ||
    deleteMutation.isPending ||
    salesRepQuery.isLoading;

  const isLoading = salesRepQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const defaultValues = salesRepQuery.data
    ? {
        id: salesRepQuery.data.id,
        name: salesRepQuery.data.name,
      }
    : undefined;

  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Sales Representative</SheetTitle>
            <SheetDescription>
              Edit an existing sales representative
            </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <SalesRepForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              onDelete={onDelete}
              defaultValues={defaultValues}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditSalesRepSheet;
