"use server";

import prisma from "@/lib/prisma";

export async function getSalesRep(id: string) {
  try {
    const salesrep = await prisma.salesRep.findFirst({
      where: { id },
    });
    if (!salesrep) throw new Error("salesrep not found");
    return salesrep;
  } catch (error) {
    console.error("Error fetching salesrep:", error);
    throw new Error("Failed to fetch salesrep");
  }
}
