"use client";

import { JSX, useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import { useSkeletonLoader } from "@/hooks/useSkeletonLoader";
import Badge from "@/components/global/Badge";
import ClientCard from "@/components/clients/ClientCard";
import ProjectLinks from "@/components/projects/ProjectLinks";
import SettingsIcon from '@mui/icons-material/Settings';

interface ProjectData {
  id: string;
  name: string;
  status: string;
  clientId: string;
}

interface ProjectProps {
  params: { id: string };
}

export default function Project({ params }: ProjectProps): JSX.Element {
  const { data, loading, isSuccess, isError, request: getProject } = useApi<ProjectData>();
  const skeletonLoader = useSkeletonLoader("300px", "80%");

  useEffect(() => {
    getProject(`/api/projects/${params.id}`, "GET");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return (
    <div className="h-full bg-gray-100 p-8 w-full flex flex-row justify-center">
      <div className="mt-8 p-6 flex flex-col gap-2 w-1/3 justify-start border-r border-black">
        {loading && skeletonLoader()}
        {!loading && isError && <p className="text-gray-800">Erreur lors du chargement du projet</p>}
        {!loading && isSuccess && data && (
          <>
            <div className="flex flex-row gap-4 items-center mb-4">
              <h1 className="text-3xl font-bold text-gray-800">Projet : {data.name}</h1>
              <button
                  onClick={() => window.location.href = `/projects/${params.id}/config`}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  <SettingsIcon />
              </button>
            </div>
            <div className="flex flex-row gap-4">
              <Badge title="Statut" content={data.status} />
            </div>
            <ClientCard clientId={data.clientId} />
            <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-2">Liens utiles</h2>
            <ProjectLinks idProject={params.id} />
          </>
        )}  
      </div>
      <div className="mt-8 p-6 flex flex-col gap-2 w-1/3 justify-start border-r border-black">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Rendez-vous</h1>
      </div>
      <div className="mt-8 p-6 flex flex-col gap-6 w-1/3 justify-start">
        <h1 className="text-3xl font-bold text-gray-800">Tâches du projet</h1>
      </div>
    </div>
  );
}
