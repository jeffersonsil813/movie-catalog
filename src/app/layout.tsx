import Logo from "@/components/logo";
import QueryProvider from "@/components/providers/queryProvider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Catamaran, Geist } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const catamaran = Catamaran({
  subsets: ["latin"],
  variable: "--font-catamaran",
});

export const metadata: Metadata = {
  title: "Movie Catalog",
  description: "A movie catalog app built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        catamaran.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body
        className="min-h-full flex flex-col p-5 gap-5"
        suppressHydrationWarning
      >
        <QueryProvider>
          <Suspense fallback={<div>Carregando...</div>}>
            <Logo />
            {children}
          </Suspense>
        </QueryProvider>
      </body>
    </html>
  );
}
