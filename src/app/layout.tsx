import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "./providers/query-provider";
import { SheetProvider } from "./providers/sheet-provider";
import { Toaster } from "@/components/ui/toaster";
import UserMenu from "@/components/user-menu";
import TopNav from "@/components/top-nav";
import SearchForm from "@/components/search-form";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <SheetProvider />
            <Toaster />
            <TopNav />

            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
              <SearchForm />
              <UserMenu />
            </div>
          </header>
          <div className="flex min-h-screen max-w-[1500px] mx-auto flex-col">
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
