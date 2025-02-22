import { z } from "zod";
const optionalString = z.string().trim().optional().or(z.literal(""));

export const transactionSchema = z.object({
  id: z.string(),
  date: z.coerce.date(),
  customerName: z
    .string()
    .nonempty("Name is required")
    .min(2, "Must be at least 2 characters")
    .max(20, "Must be at most 20 characters"),
  amount: z.coerce.number(),
  currency: optionalString,
  convertedAmount: z.number().optional(),
  salesRep: optionalString,
  region: optionalString,
});

export type TransactionValues = z.infer<typeof transactionSchema>;
