"use client";

import { useEffect, JSX } from "react";
import { useApi } from "@/hooks/useApi";
import { useCircularLoader } from "@/hooks/useCircularLoader";

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

interface ProjectCardProps {
  project: ProjectData;
}

export default function ProjectCard({ project }: ProjectCardProps): JSX.Element {
    const { data, loading, isSuccess, isError, request } = useApi<ClientData>();
    const circularLoader = useCircularLoader();

    useEffect(() => {
        request(`/api/clients/${project.clientId}`, "GET");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [project.clientId]);

    return (
        <div>
            <li className="border-b py-1 text-gray-800 flex items-center gap-1">
                <p>{project.name} - {project.status} -</p>
                {loading && circularLoader()}
                {!loading && isError && "Error loading client"}
                {!loading && isSuccess && data && (
                    <p>
                        {data.name} {data.surname} ({data.company ? data.company : "Sans entreprise"})
                    </p>
                )}
                <button
                    onClick={() => window.location.href = `/projects/${project.id}`}
                    className="ml-2 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                    Voir
                </button>
            </li>
        </div>
    )
}