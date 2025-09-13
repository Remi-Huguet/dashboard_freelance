"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const hideNavbar = pathname.startsWith("/auth");

  return (  
    <SessionProvider>
      {!hideNavbar && <Navbar />}
      {children}
    </SessionProvider>
  );
}