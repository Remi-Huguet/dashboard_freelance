"use client";

import { JSX, useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import { useSkeletonLoader } from "@/hooks/useSkeletonLoader";
import Badge from "@/components/global/Badge";
import ClientCard from "@/components/clients/ClientCard";

interface ProjectData {
  id: string;
  name: string;
  status: string;
  clientId: string;
}

export default function Project({ params }: { params: { id: string } }): JSX.Element {
  const { data, loading, isSuccess, isError, request: getProject } = useApi<ProjectData>();
  const skeletonLoader = useSkeletonLoader("100px", "50%");

  useEffect(() => {
    getProject(`/api/projects/${params.id}`, "GET");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mt-8 p-6 flex flex-col gap-6">
        {loading && skeletonLoader()}
        {!loading && isError && <p className="text-gray-800">Erreur lors du chargement du projet</p>}
        {!loading && isSuccess && data && (
          <>
            <h1 className="text-3xl font-bold text-gray-800">Projet {data.name}</h1>
            <div className="flex flex-row gap-4">
              <Badge title="Statut" content={data.status} />
            </div>
            <ClientCard clientId={data.clientId} />
          </>
        )}  
      </div>
    </div>
  );
}
