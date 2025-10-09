"use client";

import { useEffect, JSX } from "react";
import { useApi } from "@/hooks/useApi";
import LoadingData from "../global/LoadingData";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SourceIcon from '@mui/icons-material/Source';

interface ProjectData {
    id: string;
    name: string;
    status: string;
    clientId: string;
}

interface ClientData {
    id: string;
    name: string;
    surname: string;
    email: string;
    company?: string;
}

interface ProjectItemProps {
  project: ProjectData;
}

export default function ProjectItem({ project }: ProjectItemProps): JSX.Element {
    const { data, loading, isSuccess, isError, request: getClient } = useApi<ClientData>();

    useEffect(() => {
        getClient(`/api/clients/${project.clientId}`, "GET");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [project.clientId]);

    return (
        <div className="flex items-center justify-between bg-white shadow-sm rounded-lg p-3 border border-gray-200">
            <div className="flex items-center gap-2">
                <SourceIcon className="text-gray-800 w-5 h-5" />
                <p className="font-medium text-gray-800">{project.name} - {project.status} -</p>
                <LoadingData loading={loading} isSuccess={isSuccess} isError={isError} data={data} 
                    errorMessage="Erreur lors du chargement du client."
                    noDataMessage="Pas de client." 
                    showSkeletonLoader={false} />
                {!loading && isSuccess && data && (
                    <p className="font-medium text-gray-800">
                        {data.name} {data.surname} ({data.company ? data.company : "Sans entreprise"})
                    </p>
                )}
            </div>
            <button
                id={`project-link-button`}
                onClick={() => window.location.href = `/projects/${project.id}`}
                className="ml-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
                <NavigateNextIcon />
            </button>
        </div>
    )
}