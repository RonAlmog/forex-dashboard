"use server";

import { SalesRepValues } from "@/lib/schemas";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function editSalesRep(values: SalesRepValues) {
  await prisma.salesRep.update({
    data: {
      name: values.name,
    },
    where: {
      id: values.id,
    },
  });
  revalidatePath("/salesreps");
  return { data: "ok" };
}
