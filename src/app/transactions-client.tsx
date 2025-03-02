"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Loader2, Plus } from "lucide-react";

import { DataTable } from "@/components/data-table";
import Card1 from "@/features/transactions/components/card1";
import Card2 from "@/features/transactions/components/card2";
import Card3 from "@/features/transactions/components/card3";
import Card4 from "@/features/transactions/components/card4";
import { columns } from "@/features/transactions/components/columns";
import { useGetTransactions } from "@/features/transactions/hooks/use-get-transactions";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useDeleteTransactions } from "@/features/transactions/hooks/use-delete-transactions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};
export default function TransactionsClient() {
  const newTransaction = useNewTransaction();
  const { data: transactions, isLoading } = useGetTransactions();
  const deleteTransactions = useDeleteTransactions();
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card1 />
        <Card2 />
        <Card3 />
        <Card4 />
      </div>
      <div className="w-full pb-10">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg: justify-between">
            <CardTitle className="text-xl line-clamp-1">
              Transactions History
            </CardTitle>
            <div className="flex flex-col lg:flex-row items-center gap-x-2 gap-y-2">
              <Button
                size="sm"
                className="w-full lg:w-auto"
                onClick={newTransaction.onOpen}
              >
                <Plus className="size-4 mr-2" />
                Add New
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading || !transactions ? (
              <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                  <CardContent>
                    <div className="h-[500px] w-full flex items-center justify-center">
                      <Loader2 className="size-8 text-slate-300 animate-spin" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={transactions}
                filterKey="customerName"
                onDelete={(row) => {
                  const ids = row.map((r) => r.original.id);
                  deleteTransactions.mutate({ ids });
                  return null;
                }}
                disabled={false}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
