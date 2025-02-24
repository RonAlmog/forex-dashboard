"use server";

//import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteRegion(id: string) {
  revalidatePath("/regions");
  return { data: id };
}
