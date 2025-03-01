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
import { regionSchema } from "@/lib/schemas";
import RegionForm from "./region-form";
import { useOpenRegion } from "../hooks/use-open-region";
import { useGetRegion } from "../hooks/use-get-region";
import { useEditRegion } from "../hooks/use-edit-region";
import { useDeleteRegion } from "../hooks/use-delete-region";

type FormValues = z.input<typeof regionSchema>;

const EditRegionSheet = () => {
  const { isOpen, onClose, id } = useOpenRegion();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this region"
  );

  const regionQuery = useGetRegion(id!);

  const editMutation = useEditRegion();
  const deleteMutation = useDeleteRegion(id!);

  const isPending =
    regionQuery.isPending || deleteMutation.isPending || regionQuery.isLoading;

  const isLoading = regionQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const defaultValues = regionQuery.data
    ? {
        id: regionQuery.data.id,
        name: regionQuery.data.name,
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
            <SheetTitle>Edit Region</SheetTitle>
            <SheetDescription>Edit an existing region</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <RegionForm
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

export default EditRegionSheet;
