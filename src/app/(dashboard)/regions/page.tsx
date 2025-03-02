import { Metadata } from "next";
import RegionsClient from "./regions-client";

export const metadata: Metadata = {
  title: "Regions",
};

export default function Regions() {
  return <RegionsClient />;
}
