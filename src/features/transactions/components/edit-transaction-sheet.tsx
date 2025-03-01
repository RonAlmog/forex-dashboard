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

import TransactionForm from "./transaction-form";
import { transactionSchema } from "@/lib/schemas";
import { useOpenTransaction } from "../hooks/use-open-transaction";
import { useGetTransaction } from "../hooks/use-get-transaction";
import { useEditTransaction } from "../hooks/use-edit-transaction";
import { useDeleteTransaction } from "../hooks/use-delete-transaction";
import { useCreateRegion } from "@/features/regions/hooks/use-create-region";
import { useCreateSalesRep } from "@/features/sales-reps/hooks/use-create-salesrep";
import { useGetRegions } from "@/features/regions/hooks/use-get-regions";
import { useGetSalesReps } from "@/features/sales-reps/hooks/use-get-salesreps";

type FormValues = z.input<typeof transactionSchema>;

const EditTransactionSheet = () => {
  const { isOpen, onClose, id } = useOpenTransaction();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this transaction"
  );

  const transactionQuery = useGetTransaction(id!);
  const editMutation = useEditTransaction();
  const deleteMutation = useDeleteTransaction(id!);

  // sales reps
  const salesRepsQuery = useGetSalesReps();
  const salesReps = salesRepsQuery.data?.map((salesRep) => ({
    value: salesRep.id,
    label: salesRep.name,
  }));
  const salesRepMutation = useCreateSalesRep();

  // regions
  const regionsQuery = useGetRegions();
  const regions = regionsQuery.data?.map((region) => ({
    value: region.id,
    label: region.name,
  }));
  const regionMutation = useCreateRegion();

  const isLoading =
    regionsQuery.isLoading ||
    salesRepsQuery.isLoading ||
    transactionQuery.isLoading;

  const isPending =
    transactionQuery.isPending ||
    deleteMutation.isPending ||
    transactionQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const defaultValues = transactionQuery.data
    ? {
        id: transactionQuery.data.id,
        date: transactionQuery.data.date
          ? new Date(transactionQuery.data.date)
          : new Date(),
        customerName: transactionQuery.data.customerName,
        amount: transactionQuery.data.amount,
        currency: transactionQuery.data.currency,
        convertedAmount: transactionQuery.data.convertedAmount,
        salesRepId: transactionQuery.data.salesRepId,
        regionId: transactionQuery.data.regionId,
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
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>Edit an existing transaction</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <TransactionForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              onDelete={onDelete}
              salesReps={salesReps ?? []}
              onCreateSalesRep={(name: string) =>
                salesRepMutation.mutate({ id: "", name })
              }
              regions={regions ?? []}
              onCreateRegion={(name: string) =>
                regionMutation.mutate({ id: "", name })
              }
              defaultValues={defaultValues}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditTransactionSheet;
