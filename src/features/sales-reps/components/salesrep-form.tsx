"use client";

import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { salesRepSchema, SalesRepValues } from "@/lib/schemas";

type Props = {
  id?: string;
  defaultValues?: SalesRepValues;
  onSubmit: (values: SalesRepValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

const SalesRepForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: Props) => {
  const form = useForm<SalesRepValues>({
    resolver: zodResolver(salesRepSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: SalesRepValues) => {
    onSubmit(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled={disabled} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={disabled}>
          {id ? "Save changes" : "Create Sales Rep"}
        </Button>
        {!!id && (
          <Button
            type="button"
            disabled={disabled}
            onClick={handleDelete}
            className="w-full"
            variant="outline"
          >
            <Trash className="size-4 mr-2" />
            Delete Sales Rep
          </Button>
        )}
      </form>
    </Form>
  );
};

export default SalesRepForm;
