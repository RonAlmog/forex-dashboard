"use server";
import prisma from "@/lib/prisma";
import { convertMiliunitsToAmount } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function getTransactions() {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { createdAt: "desc" },
    });
    // return transactions;
    return transactions.map((tran) => ({
      ...tran,
      amount: convertMiliunitsToAmount(tran.amount),
    }));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
