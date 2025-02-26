"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteRegion(id: string) {
  await prisma.region.delete({
    where: { id },
  });
  revalidatePath("/regions");
  return { data: id };
}
