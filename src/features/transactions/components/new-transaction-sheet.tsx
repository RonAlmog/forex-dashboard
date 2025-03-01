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
import { useNewTransaction } from "../hooks/use-new-transaction";
import { useCreateTransaction } from "../hooks/use-create-transaction";
import { useGetSalesReps } from "@/features/sales-reps/hooks/use-get-salesreps";
import { useGetRegions } from "@/features/regions/hooks/use-get-regions";
import { useCreateSalesRep } from "@/features/sales-reps/hooks/use-create-salesrep";
import { useCreateRegion } from "@/features/regions/hooks/use-create-region";

type FormValues = z.input<typeof transactionSchema>;

const NewTransactionSheet = () => {
  const { isOpen, onClose } = useNewTransaction();
  const createMutation = useCreateTransaction();
  const isPending = createMutation.isPending;

  // sales reps
  const salesRepsQuery = useGetSalesReps();
  const salesReps = salesRepsQuery.data?.map((salesRep) => ({
    value: salesRep.id,
    label: salesRep.name,
  }));
  const salesRepMutation = useCreateSalesRep();
  console.log({ salesReps });

  // regions
  const regionsQuery = useGetRegions();
  const regions = regionsQuery.data?.map((region) => ({
    value: region.id,
    label: region.name,
  }));
  const regionMutation = useCreateRegion();
  console.log({ regions });
  const isLoading = regionsQuery.isLoading || salesRepsQuery.isLoading;

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
            salesReps={salesReps ?? []}
            onCreateSalesRep={(name: string) =>
              salesRepMutation.mutate({ id: "", name })
            }
            regions={regions ?? []}
            onCreateRegion={(name: string) =>
              regionMutation.mutate({ id: "", name })
            }
            defaultValues={{
              id: "",
              date: new Date(),
              customerName: "",
              amount: 0,
              currency: "",
              convertedAmount: 0,
              salesRepId: "",
              regionId: "",
            }}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default NewTransactionSheet;
