"use server";

import { RegionValues } from "@/lib/schemas";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function editRegion(values: RegionValues) {
  await prisma.region.update({
    data: {
      name: values.name,
    },
    where: {
      id: values.id,
    },
  });
  revalidatePath("/regions");
  return { data: "ok" };
}
