"use server";

import prisma from "@/lib/prisma";

export async function getRegions() {
  try {
    const regions = await prisma.region.findMany({
      orderBy: { name: "desc" },
    });

    return regions;
  } catch (error) {
    console.error("Error fetching regions:", error);
    throw new Error("Failed to fetch regions");
  }
}
