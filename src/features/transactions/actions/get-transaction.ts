"use server";

import prisma from "@/lib/prisma";

export async function getTransaction(id: string) {
  try {
    console.log("id in action:", id);
    const transaction = await prisma.transaction.findFirst({
      where: { id },
    });
    if (!transaction) throw new Error("Transaction not found");
    return transaction;
  } catch (error) {
    console.error("Error fetching transaction:", error);
    throw new Error("Failed to fetch transaction");
  }
}
