import { z } from "zod";
// const optionalString = z.string().trim().optional().or(z.literal(""));
const goodString = z
  .string()
  .nonempty("Name is required")
  .min(2, "Must be at least 2 characters")
  .max(40, "Must be at most 40 characters");

export const transactionSchema = z.object({
  id: z.string(),
  date: z.coerce.date(),
  customerName: z
    .string()
    .nonempty("Name is required")
    .min(2, "Must be at least 2 characters")
    .max(40, "Must be at most 40 characters"),
  amount: z.coerce.number(),
  currency: goodString,
  convertedAmount: z.number(),
  salesRepId: goodString,
  regionId: goodString,
});
export type TransactionValues = z.infer<typeof transactionSchema>;

export const salesRepSchema = z.object({
  id: z.string(),
  name: goodString,
});
export type SalesRepValues = z.infer<typeof salesRepSchema>;

export const regionSchema = z.object({
  id: z.string(),
  name: goodString,
});
export type RegionValues = z.infer<typeof regionSchema>;
