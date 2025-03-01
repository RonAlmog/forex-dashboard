"use client";
import { usePathname } from "next/navigation";
import NavButton from "./nav-button";

const routes = [
  {
    href: "/",
    label: "Transactions",
  },
  {
    href: "/regions",
    label: "Regions",
  },
  {
    href: "/salesreps",
    label: "Sales Reps",
  },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-x-2 w-full">
      {routes.map((route) => (
        <NavButton
          key={route.href}
          href={route.href}
          label={route.label}
          isActive={pathname === route.href}
        />
      ))}
    </nav>
  );

  // return (
  //   <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
  //     <Link
  //       href="/"
  //       className="flex items-center gap-2 text-lg font-semibold md:text-base"
  //     >
  //       <Package2 className="h-6 w-6" />
  //       <span className="sr-only">MyBank Inc</span>
  //     </Link>
  //     <Link
  //       href="/transactions"
  //       className="text-foreground transition-colors hover:text-foreground"
  //     >
  //       Transactions
  //     </Link>
  //     <Link
  //       href="/regions"
  //       className="text-muted-foreground transition-colors hover:text-foreground"
  //     >
  //       Regions
  //     </Link>
  //     <Link
  //       href="/salesreps"
  //       className="w-20 text-muted-foreground transition-colors hover:text-foreground"
  //     >
  //       Sales Reps
  //     </Link>
  //   </nav>
  // );
}
