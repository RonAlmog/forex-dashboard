"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { DataTable } from "@/components/data-table";

import { useGetSalesReps } from "@/features/sales-reps/hooks/use-get-salesreps";
import { useNewSalesRep } from "@/features/sales-reps/hooks/use-new-salesrep";
import { columns } from "@/features/sales-reps/components/columns";
import { useDeleteSalesReps } from "@/features/sales-reps/hooks/use-delete-salesreps";

export default function SalesRepsClient() {
  const newSalesRep = useNewSalesRep();
  const { data: salesReps, isLoading } = useGetSalesReps();
  const deleteSalesReps = useDeleteSalesReps();

  return (
    <main>
      <div className="pb-10">
        <Card className="border-none drop-shadow-sm mt-1">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg: justify-between">
            <CardTitle className="text-xl line-clamp-1">Sales Reps</CardTitle>
            <div className="flex flex-col lg:flex-row items-center gap-x-2 gap-y-2">
              <Button
                size="sm"
                className="w-full lg:w-auto"
                onClick={newSalesRep.onOpen}
              >
                <Plus className="size-4 mr-2" />
                Add New
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading || !salesReps ? (
              <div className="h-10 w-full flex items-center justify-center">
                <Loader2 className="size-8 text-slate-300 animate-spin" />
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={salesReps}
                filterKey="name"
                onDelete={(row) => {
                  const ids = row.map((r) => r.original.id);
                  deleteSalesReps.mutate({ ids });
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
