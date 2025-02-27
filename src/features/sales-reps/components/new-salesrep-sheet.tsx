import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { z } from "zod";
import { Loader2 } from "lucide-react";
import SalesRepForm from "./salesrep-form";
import { useNewSalesRep } from "../hooks/use-new-salesrep";
import { useCreateSalesRep } from "../hooks/use-create-salesrep";
import { salesRepSchema } from "@/lib/schemas";

type FormValues = z.input<typeof salesRepSchema>;

const NewSalesRepSheet = () => {
  const { isOpen, onClose } = useNewSalesRep();
  const createMutation = useCreateSalesRep();

  const isPending = createMutation.isPending;
  const isLoading = false;

  const onSubmit = (values: FormValues) => {
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
          <SheetTitle>New Sales Representative</SheetTitle>
          <SheetDescription>Create a new sales representative</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset=0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <SalesRepForm
            onSubmit={onSubmit}
            disabled={isPending}
            defaultValues={{
              id: "",
              name: "",
            }}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default NewSalesRepSheet;
