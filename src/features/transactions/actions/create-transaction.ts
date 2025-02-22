"use server";

import { TransactionValues } from "@/lib/schemas";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTransaction(values: TransactionValues) {
  await prisma.transaction.create({
    data: {
      customerName: values.customerName,
      date: values.date,
      amount: values.amount,
      convertedAmount: values.convertedAmount,
      currency: values.currency,
      salesRep: values.salesRep,
      region: values.region!,
    },
  });
  revalidatePath("/");
  return { data: "ok" };
}
