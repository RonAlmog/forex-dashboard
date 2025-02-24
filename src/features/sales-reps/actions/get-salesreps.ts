"use server";

import prisma from "@/lib/prisma";

export async function getSaleReps() {
  try {
    const reps = await prisma.salesRep.findMany({
      orderBy: { name: "desc" },
    });

    return reps;
  } catch (error) {
    console.error("Error fetching sales reps:", error);
    throw new Error("Failed to fetch sales reps");
  }
}
