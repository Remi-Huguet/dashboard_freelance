"use client";

import { JSX } from "react";
import { signOut } from "next-auth/react";

export default function LogoutButton(): JSX.Element {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/auth" })}
      className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
    >
      Logout
    </button>
  );
}
