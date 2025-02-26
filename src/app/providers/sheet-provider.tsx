"use client";

import EditRegionSheet from "@/features/regions/components/edit-region-sheet";
import NewRegionSheet from "@/features/regions/components/new-region-sheet";
import EditTransactionSheet from "@/features/transactions/components/edit-transaction-sheet";
import NewTransactionSheet from "@/features/transactions/components/new-transaction-sheet";
import { useMountedState } from "react-use";

export const SheetProvider = () => {
  const isMounted = useMountedState();
  if (!isMounted) return null;

  return (
    <>
      <NewTransactionSheet />
      <EditTransactionSheet />
      <NewRegionSheet />
      <EditRegionSheet />
    </>
  );
};
