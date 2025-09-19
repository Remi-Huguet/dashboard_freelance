import LogoutButton from "@/components/LogoutButton";
import { JSX } from "react";

export default function Navbar(): JSX.Element {
  return (
    <nav className="flex items-center justify-between bg-white p-4 shadow-md">
      <a href="/dashboard" className="mr-4 text-blue-500 hover:underline">
        Dashboard Freelance
      </a>
      <div className="flex-row gap-4 hidden md:flex">
        <a href="/dashboard" className="mr-4 text-blue-500 hover:underline">
          Home
        </a>
        <a href="/projects" className="mr-4 text-blue-500 hover:underline">
          Projets
        </a>
        <a href="/clients" className="mr-4 text-blue-500 hover:underline">
          Clients
        </a>
      </div>
      <LogoutButton />
    </nav>
  );
}
