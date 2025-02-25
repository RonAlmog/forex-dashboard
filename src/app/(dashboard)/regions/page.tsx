"use client";

import { useGetRegions } from "@/features/regions/hooks/use-get-regions";
import { useNewRegion } from "@/features/regions/hooks/use-new-region";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { columns } from "@/features/regions/components/columns";

export default function Home() {
  const newRegion = useNewRegion();
  const { data: regions, error, isLoading } = useGetRegions();

  return (
    <main>
      <div className="pb-10">
        <Card className="border-none drop-shadow-sm mt-1">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg: justify-between">
            <CardTitle className="text-xl line-clamp-1">
              Sales Regions
            </CardTitle>
            <div className="flex flex-col lg:flex-row items-center gap-x-2 gap-y-2">
              <Button
                size="sm"
                className="w-full lg:w-auto"
                onClick={newRegion.onOpen}
              >
                <Plus className="size-4 mr-2" />
                Add New
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-10 w-full flex items-center justify-center">
                <Loader2 className="size-8 text-slate-300 animate-spin" />
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={regions}
                filterKey="name"
                onDelete={(row) => {
                  const ids = row.map((r) => r.original.id);

                  // deleteTransactions.mutate({ ids });
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
