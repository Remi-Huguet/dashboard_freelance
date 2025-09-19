import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { JSX } from "react";

export default async function Dashboard(): Promise<JSX.Element> {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mt-8 p-6">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Welcome to your Dashboard, {session.user?.name ?? "User"}!
        </h2>
      </div>
    </div>
  );
}