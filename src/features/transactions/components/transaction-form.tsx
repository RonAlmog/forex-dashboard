"use client";
import { z } from "zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import Select from "@/components/select";
import DatePicker from "@/components/date-picker";
import { transactionSchema } from "@/lib/schemas";
import CurrencyInput from "@/components/currency-input";
import { convertAmountToMiliunits } from "@/lib/utils";
import Select from "@/components/select";

// const apiSchema = insertTransactionSchema.omit({ id: true });
type FormValues = z.input<typeof transactionSchema>;
type ApiFormValues = z.input<typeof transactionSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: ApiFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  salesReps: { value: string; label: string }[];
  onCreateSalesRep: (value: string) => void;
  regions: { value: string; label: string }[];
  onCreateRegion: (value: string) => void;
};

const TransactionForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
  salesReps,
  onCreateSalesRep,
  regions,
  onCreateRegion,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit({ ...values, amount: convertAmountToMiliunits(values.amount) });
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
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="customerName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Name</FormLabel>
              <FormControl>
                <Input placeholder="John doe" disabled={disabled} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="amount"
          control={form.control}
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <CurrencyInput value={value} onValueChange={onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="currency"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="USD, CAD, etc"
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="salesRepId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sales Rep</FormLabel>
              <FormControl>
                <Select
                  options={salesReps}
                  value={field.value}
                  onChange={field.onChange}
                  onCreate={onCreateSalesRep}
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="regionId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Region</FormLabel>
              <FormControl>
                <Select
                  options={regions}
                  value={field.value}
                  onChange={field.onChange}
                  onCreate={onCreateRegion}
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={disabled}>
          {id ? "Save changes" : "Create Transaction"}
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
            Delete Transaction
          </Button>
        )}
      </form>
    </Form>
  );
};

export default TransactionForm;
