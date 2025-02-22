import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { transactionSchema } from "@/lib/schemas";
import { z } from "zod";

import TransactionForm from "./transaction-form";
import { Loader2 } from "lucide-react";
import { useNewTransaction } from "@/hooks/use-new-transaction";
import { useCreateTransaction } from "@/hooks/use-create-transaction";

type FormValues = z.input<typeof transactionSchema>;

const NewTransactionSheet = () => {
  const { isOpen, onOpen, onClose } = useNewTransaction();
  const createMutation = useCreateTransaction();

  const isPending = createMutation.isPending;

  const isLoading = false; //  categoryQuery.isLoading || accountQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    console.log({ values });
    createMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>Create a new transaction</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset=0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <TransactionForm
            onSubmit={onSubmit}
            disabled={isPending}
            defaultValues={{
              id: "",
              date: new Date(),
              customerName: "",
              amount: 0,
              currency: "",
              convertedAmount: 0,
              salesRep: "",
              region: "",
            }}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default NewTransactionSheet;
