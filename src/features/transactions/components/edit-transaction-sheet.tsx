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
import { useOpenTransaction } from "@/hooks/use-open-transaction";
import { useDeleteTransaction } from "@/hooks/use-delete-transaction";
import { useGetTransaction } from "@/hooks/use-get-transaction";
import { useEditTransaction } from "@/hooks/use-edit-transaction";

type FormValues = z.input<typeof transactionSchema>;

const EditTransactionSheet = () => {
  const { isOpen, onOpen, onClose, id } = useOpenTransaction();
  console.log({ id });
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this transaction"
  );

  const transactionQuery = useGetTransaction(id!);

  const editMutation = useEditTransaction();
  const deleteMutation = useDeleteTransaction();

  const isPending =
    transactionQuery.isPending ||
    deleteMutation.isPending ||
    transactionQuery.isLoading;

  const isLoading = transactionQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const d = transactionQuery.data;
  console.log(JSON.stringify(d));

  const defaultValues = transactionQuery.data
    ? {
        id: transactionQuery.data.id,
        date: transactionQuery.data.date
          ? new Date(transactionQuery.data.date)
          : new Date(),
        customerName: transactionQuery.data.customerName,
        amount: transactionQuery.data.amount.toString(),
        currency: transactionQuery.data.currency,
        convertedAmount: transactionQuery.data.convertedAmount,
        salesRep: transactionQuery.data.salesRep,
        region: transactionQuery.data.region,
      }
    : {
        date: new Date(),
        customerName: "",
        amount: "",
        currency: "",
        convertedAmount: "",
        salesRep: "",
        region: "",
      };

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
              defaultValues={defaultValues}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditTransactionSheet;
