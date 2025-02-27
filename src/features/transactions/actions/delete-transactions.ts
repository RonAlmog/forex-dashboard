"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteTransactions(ids: string[]) {
  await prisma.transaction.deleteMany({
    where: { id: { in: ids } },
  });
  revalidatePath("/transactions");
  return { data: ids };
}
