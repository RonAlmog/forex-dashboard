"use server";

import { RegionValues } from "@/lib/schemas";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createRegion(values: RegionValues) {
  await prisma.region.create({
    data: {
      name: values.name,
    },
  });
  revalidatePath("/regions");
  return { data: "ok" };
}
