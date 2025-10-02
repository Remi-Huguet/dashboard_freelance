"use client";

import { JSX, useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import ProjectItemEditable from "@/components/projects/ProjectItemEditable";
import LinkForm from "@/components/links/LinkForm";
import LinksList from "@/components/links/LinksList";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

interface ProjectData {
  id: string;
  name: string;
  status: string;
  clientId: string;
}

interface ConfigProps {
  params: { id: string };
}

export default function Config({ params }: ConfigProps): JSX.Element {
    const { data, loading, isSuccess, isError, request: getProject } = useApi<ProjectData>();

    useEffect(() => {
        getProject(`/api/projects/${params.id}`, "GET");
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [params.id]);

    return (
        <div className="h-full bg-gray-100 p-8">
            <div className="mt-8 p-6 flex flex-col gap-6">
                <button
                    onClick={() => window.location.href = `/projects/${params.id}`}
                    className="self-start bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition align-center flex items-center gap-2"
                >
                    <NavigateBeforeIcon /> Retour au projet
                </button>
                <h1 className="text-3xl font-bold text-gray-800">Configuration</h1>
                {loading && <p>Chargement...</p>}
                {!loading && isError && <p className="text-red-500">Erreur lors du chargement du projet.</p>}
                {!loading && isSuccess && data && <ProjectItemEditable project={data} />}
                <LinkForm idProject={params.id} />
                <LinksList idProject={params.id} />
            </div>
        </div>
    );
}
