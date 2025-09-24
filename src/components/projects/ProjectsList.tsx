"use client";

import { useEffect, JSX } from "react";
import ProjectCard from "./ProjectCard";
import { useApi } from "@/hooks/useApi";
import { useSkeletonLoader } from "@/hooks/useSkeletonLoader";

interface ProjectData {
  id: string;
  name: string;
  status: string;
  clientId: string;
}

export default function ProjectsList(): JSX.Element {
  const { data, loading, isSuccess, isError, request: getProjects } = useApi<ProjectData[]>();
  const skeletonLoader = useSkeletonLoader("50px", "60%");

  useEffect(() => {
    getProjects("/api/projects", "GET");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-xl font-bold mb-2 text-gray-800">Liste des projets</h3>
        {loading && skeletonLoader()}
        {!loading && isError && <p className="text-gray-800">Erreur lors du chargement des projets</p>}
        {!loading && isSuccess && data && data.length === 0 && (
          <p className="text-gray-800">Aucun projet pour le moment.</p>
        )}
        {!loading && isSuccess && data && data.length > 0 && (
          <ul className="space-y-1">
            {data.map((p) => (
              <ProjectCard project={p} key={p.id} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
