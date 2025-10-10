"use client";

import { JSX, use, useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import ProjectItemEditable from "@/components/projects/ProjectItemEditable";
import LinkForm from "@/components/links/LinkForm";
import LinksListEditable from "@/components/links/LinksListEditable";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SettingsIcon from '@mui/icons-material/Settings';
import LoadingData from "@/components/global/LoadingData";

interface ProjectData {
  id: string;
  name: string;
  status: string;
  clientId: string;
}

interface ConfigProps {
  params: Promise<{ id: string }>;
}

export default function Config({ params }: ConfigProps): JSX.Element {
    const { id } = use(params);
    const { data, loading, isSuccess, isError, request: getProject } = useApi<ProjectData>();

    useEffect(() => {
        getProject(`/api/projects/${id}`, "GET");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <div className="h-full bg-gray-100 p-8">
            <div className="mt-8 p-6 flex flex-col gap-4">
                <button
                    id="back-to-project-button"
                    onClick={() => window.location.href = `/projects/${id}`}
                    className="self-start bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition align-center flex items-center gap-2"
                >
                    <NavigateBeforeIcon /> Retour au projet
                </button>
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2 mt-2 mb-2"><SettingsIcon fontSize="large" />Configuration</h1>
                <LoadingData loading={loading} isSuccess={isSuccess} isError={isError} data={data} 
                    errorMessage="Erreur lors du chargement du projet."
                    noDataMessage="Pas de projet." 
                    showSkeletonLoader={true} />
                {!loading && isSuccess && data && <ProjectItemEditable project={data} />}
                <h2 className="text-2xl font-bold text-gray-800  flex items-center gap-2 mb-2 mt-2"><AccountTreeIcon />Liens utiles</h2>
                <LinkForm idProject={id} />
                <LinksListEditable idProject={id} />
            </div>
        </div>
    );
}
