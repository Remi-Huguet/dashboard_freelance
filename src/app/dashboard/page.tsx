import { getServerSession } from "next-auth/next";
import { JSX } from "react";

export default async function Dashboard(): Promise<JSX.Element> {
  const session = await getServerSession();

  return (
    <div className="h-full bg-gray-100 p-8">
      <div className="mt-8 p-6">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Bienvenue sur votre Dashboard, {session?.user?.name ?? "User"}!
        </h2>
      </div>
    </div>
  );
}