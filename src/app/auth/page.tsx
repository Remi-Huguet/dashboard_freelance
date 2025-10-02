"use client";

import { signIn } from "next-auth/react";
import { JSX } from "react";

export default function Auth(): JSX.Element {
  return (
    <div className="flex h-full items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-md w-96 space-y-4 text-center">
        <h1 className="text-2xl font-semibold text-gray-800">Connectez-vous</h1>
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          Se connecter avec Google
        </button>
      </div>
    </div>
  );
}
