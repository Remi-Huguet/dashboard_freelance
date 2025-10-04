"use client";

import { JSX, use, useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import LoadingData from "@/components/global/LoadingData";
import Badge from "@/components/global/Badge";
import ClientCard from "@/components/clients/ClientCard";
import ProjectLinks from "@/components/projects/ProjectLinks";
import OngoingAppointmentList from "@/components/global/OngoingAppoitmentsList";
import SettingsIcon from '@mui/icons-material/Settings';
import { getWeekBoundsFromDate } from "@/utils/dateUtils";
import { taskTypes } from "@/utils/utils";
import SourceIcon from '@mui/icons-material/Source';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ProjectTasksGraph from "@/components/projects/ProjectTasksGraph";

interface ProjectData {
  id: string;
  name: string;
  status: string;
  clientId: string;
}

interface ProjectProps {
  params: Promise<{ id: string }>;
}

export default function Project({ params }: ProjectProps): JSX.Element {
  const { id } = use(params);
  const { data, loading, isSuccess, isError, request: getProject } = useApi<ProjectData>();

  useEffect(() => {
    getProject(`/api/projects/${id}`, "GET");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="h-full bg-gray-100 p-8 w-full flex flex-row justify-center">
      <div className="mt-8 p-6 flex flex-col gap-2 w-1/3 justify-start border-r border-black">
        <LoadingData loading={loading} isSuccess={isSuccess} isError={isError} data={data} 
            errorMessage="Erreur lors du chargement du projet."
            noDataMessage="Pas de projet." 
            showSkeletonLoader={true} skeletonLoaderHeight="100%" />
        {!loading && isSuccess && data && (
          <>
            <div className="flex flex-row gap-4 items-center mb-4">
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2"><SourceIcon fontSize="large" />Projet : {data.name}</h1>
              <button
                  onClick={() => window.location.href = `/projects/${id}/config`}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  <SettingsIcon />
              </button>
            </div>
            <div className="flex flex-row gap-4">
              <Badge title="Statut" content={data.status} />
            </div>
            <ClientCard clientId={data.clientId} />
            <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-4 flex items-center gap-2"><AccountTreeIcon />Liens utiles</h2>
            <ProjectLinks idProject={id} />
          </>
        )}  
      </div>
      <div className="mt-8 p-6 flex flex-col gap-2 w-1/3 justify-start border-r border-black">
        <div className="flex flex-row gap-4 items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2"><CalendarMonthIcon fontSize="large" /> Rendez-vous</h1>
          <button
              onClick={() => window.location.href = `/projects/${id}/appointments`}
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
              <SettingsIcon />
          </button>
        </div>
        <p className="text-3l text-gray-800 mb-4">{getWeekBoundsFromDate(new Date())}</p>
        <OngoingAppointmentList idProject={id} />
      </div>
      <div className="mt-8 p-6 flex flex-col gap-2 w-1/3 justify-start">
        <div className="flex flex-row gap-4 items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2"><ListAltIcon fontSize="large" /> Tâches du projet</h1>
          <button
              onClick={() => window.location.href = `/projects/${id}/tasks`}
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
              <SettingsIcon />
          </button>
        </div>
        <div className="flex flex-row flex-wrap gap-4">
          {taskTypes.map((taskType) =>
            <ProjectTasksGraph key={taskType} idProject={id} taskType={taskType} />
          )}
        </div>
      </div>
    </div>
  );
}
