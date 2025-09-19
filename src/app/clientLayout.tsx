"use client";

import { JSX, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps): JSX.Element {
  const pathname = usePathname();
  const hideNavbar = pathname.startsWith("/auth");

  return (
    <SessionProvider>
      {!hideNavbar && <Navbar />}
      {children}
    </SessionProvider>
  );
}
