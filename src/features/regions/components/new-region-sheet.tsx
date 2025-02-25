import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { z } from "zod";
import { Loader2 } from "lucide-react";
import RegionForm from "./region-form";
import { useNewRegion } from "../hooks/use-new-region";
import { useCreateRegion } from "../hooks/use-create-region";
import { regionSchema } from "@/lib/schemas";

type FormValues = z.input<typeof regionSchema>;

const NewRegionSheet = () => {
  const { isOpen, onOpen, onClose } = useNewRegion();
  const createMutation = useCreateRegion();

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
          <SheetTitle>New Region</SheetTitle>
          <SheetDescription>Create a new region</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset=0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <RegionForm
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

export default NewRegionSheet;
