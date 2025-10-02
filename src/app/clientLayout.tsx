"use client";

import { JSX, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/rooting/Navbar";

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps): JSX.Element {
  const pathname = usePathname();
  const hideNavbar = pathname.startsWith("/auth");

  return (
    <SessionProvider>
      <div className="flex flex-col h-screen">
        {!hideNavbar && <Navbar />}
        <main className="flex-1">{children}</main>
      </div>
    </SessionProvider>
  );
}
