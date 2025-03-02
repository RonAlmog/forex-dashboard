import { Metadata } from "next";
import SalesRepsClient from "./salesreps-client";

export const metadata: Metadata = {
  title: "Sales Reps",
};
export default function SalesReps() {
  return <SalesRepsClient />;
}
