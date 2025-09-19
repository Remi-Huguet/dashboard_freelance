// app/clients/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import ClientForm from "@/components/clients/ClientForm";
import ClientsList from "@/components/clients/ClientsList";
import { JSX } from "react";

export default async function Clients(): Promise<JSX.Element> {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mt-8 p-6 flex flex-col gap-6">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Welcome to the client list !
        </h2>
        <ClientForm />
        <ClientsList />
      </div>
    </div>
  );
}
