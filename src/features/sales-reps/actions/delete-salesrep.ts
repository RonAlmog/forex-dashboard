"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteSalesRep(id: string) {
  await prisma.salesRep.delete({
    where: { id },
  });
  revalidatePath("/salesreps");
  return { data: id };
}
