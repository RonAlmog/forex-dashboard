"use server";

//import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteSalesRep(id: string) {
  revalidatePath("/salesreps");
  return { data: id };
}
