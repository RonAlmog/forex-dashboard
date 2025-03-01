"use server";

import { TransactionValues } from "@/lib/schemas";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function editTransaction(values: TransactionValues) {
  console.log("hello action", values);
  await prisma.transaction.update({
    data: {
      customerName: values.customerName,
      date: values.date,
      amount: values.amount,
      convertedAmount: values.convertedAmount,
      currency: values.currency,
      salesRepId: values.salesRepId,
      regionId: values.regionId,
    },
    where: {
      id: values.id,
    },
  });
  revalidatePath("/resumes");
  return { data: "ok" };
}
