"use server";

//import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteTransaction(id: string) {
  revalidatePath("/resumes");
  return { data: id };
}
