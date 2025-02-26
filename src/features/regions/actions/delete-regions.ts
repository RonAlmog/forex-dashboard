"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteRegions(ids: string[]) {
  await prisma.region.deleteMany({
    where: { id: { in: ids } },
  });
  revalidatePath("/regions");
  return { data: ids };
}
