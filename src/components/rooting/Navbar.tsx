import LogoutButton from "@/components/auth/LogoutButton";
import { JSX } from "react";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import GroupIcon from '@mui/icons-material/Group';
import Link from "next/link";

export default function Navbar(): JSX.Element {
  return (
    <nav className="flex items-center justify-between bg-white p-4 shadow-md">
      <Link href="/dashboard" className="mr-4 text-blue-500 hover:underline">
        Dashboard Freelance
      </Link>
      <div className="flex-row gap-4 hidden md:flex">
        <Link href="/dashboard" className="mr-4 text-blue-500 hover:underline flex items-center gap-2">
          <SpaceDashboardIcon /> Dashboard
        </Link>
        <Link href="/projects" className="mr-4 text-blue-500 hover:underline flex items-center gap-2">
          <FolderOpenIcon /> Projets
        </Link>
        <Link href="/clients" className="mr-4 text-blue-500 hover:underline flex items-center gap-2">
          <GroupIcon /> Clients
        </Link>
      </div>
      <LogoutButton />
    </nav>
  );
}
