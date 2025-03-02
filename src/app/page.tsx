import { Metadata } from "next";
import TransactionsClient from "./transactions-client";

export const metadata: Metadata = {
  title: "Home",
};
export default function Home() {
  return <TransactionsClient />;
}
