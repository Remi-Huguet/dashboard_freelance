import { getServerSession } from "next-auth/next";
import { JSX } from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { getWeekBoundsFromDate } from "@/utils/dateUtils";
import ProjectsList from "@/components/global/ProjectsList";
import OngoingAppointmentList from "@/components/global/OngoingAppoitmentsList";
import Badge from "@/components/global/Badge";

export default async function Dashboard(): Promise<JSX.Element> {
  const session = await getServerSession();

  return (
    <div className="h-full bg-gray-100 p-8">
      <div className="h-full p-6 flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-gray-800">
          Bienvenue sur votre Dashboard, {session?.user?.name ?? "User"} !
        </h2>
        <div className="h-full w-full flex flex-row justify-center">
          <div className="mt-8 p-6 flex flex-col gap-4 w-1/2 justify-start border-r border-black">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2 mb-2"><FolderOpenIcon fontSize="large" /> Projets</h1>
            <Badge title="Statut" content="En cours" />
            <ProjectsList inProgress={true} />
          </div>
          <div className="mt-8 p-6 flex flex-col gap-4 w-1/2 justify-start">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2 mb-2"><CalendarMonthIcon fontSize="large" /> Rendez-vous</h1>
            <Badge title="Période" content={getWeekBoundsFromDate(new Date())} />
            <OngoingAppointmentList idProject="" />
          </div>
        </div>
      </div>
    </div>
  );
}