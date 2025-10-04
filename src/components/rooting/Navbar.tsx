import LogoutButton from "@/components/auth/LogoutButton";
import { JSX } from "react";
import SourceIcon from '@mui/icons-material/Source';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import GroupIcon from '@mui/icons-material/Group';

export default function Navbar(): JSX.Element {
  return (
    <nav className="flex items-center justify-between bg-white p-4 shadow-md">
      <a href="/dashboard" className="mr-4 text-blue-500 hover:underline">
        Dashboard Freelance
      </a>
      <div className="flex-row gap-4 hidden md:flex">
        <a href="/dashboard" className="mr-4 text-blue-500 hover:underline flex items-center gap-2">
          <SpaceDashboardIcon /> Dashboard
        </a>
        <a href="/projects" className="mr-4 text-blue-500 hover:underline flex items-center gap-2">
          <SourceIcon /> Projets
        </a>
        <a href="/clients" className="mr-4 text-blue-500 hover:underline flex items-center gap-2">
          <GroupIcon /> Clients
        </a>
      </div>
      <LogoutButton />
    </nav>
  );
}
