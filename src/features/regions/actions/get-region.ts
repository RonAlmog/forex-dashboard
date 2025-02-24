"use server";

import prisma from "@/lib/prisma";

export async function getRegion(id: string) {
  try {
    const region = await prisma.region.findFirst({
      where: { id },
    });
    if (!region) throw new Error("region not found");
    return region;
  } catch (error) {
    console.error("Error fetching region:", error);
    throw new Error("Failed to fetch region");
  }
}
