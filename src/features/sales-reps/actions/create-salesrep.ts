"use server";

import { SalesRepValues } from "@/lib/schemas";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createSalesRep(values: SalesRepValues) {
  await prisma.salesRep.create({
    data: {
      name: values.name,
    },
  });
  revalidatePath("/salesreps");
  return { data: "ok" };
}
