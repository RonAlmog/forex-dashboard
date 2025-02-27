"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteSalesReps(ids: string[]) {
  await prisma.salesRep.deleteMany({
    where: { id: { in: ids } },
  });
  revalidatePath("/salesreps");
  return { data: ids };
}
