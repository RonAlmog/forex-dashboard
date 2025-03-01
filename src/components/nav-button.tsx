import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  href: string;
  isActive?: boolean;
};

const NavButton = ({ label, href, isActive }: Props) => {
  return (
    <Button
      asChild
      size="sm"
      variant="outline"
      className={cn(
        "w-full lg:w-auto justify-between font-normal hover:bg-slate-300 hover:text-gray-700 border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-gray-700 transition",
        isActive ? "bg-slate-300 text-gray-900 font-semibold" : "bg-slate-100"
      )}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default NavButton;
