"use client";

import { useEffect, JSX } from "react";
import ProjectItem from "../projects/ProjectItem";
import { useApi } from "@/hooks/useApi";
import { useSkeletonLoader } from "@/hooks/useSkeletonLoader";

interface ProjectData {
  id: string;
  name: string;
  status: string;
  clientId: string;
}

interface ProjectsListProps {
  inProgress?: boolean;
}

export default function ProjectsList({ inProgress }: ProjectsListProps): JSX.Element {
  const { data, loading, isSuccess, isError, request: getProjects } = useApi<ProjectData[]>();
  const skeletonLoader = useSkeletonLoader("70px", "90%");

  useEffect(() => {
    getProjects(`/api/projects${inProgress && inProgress ? "?inProgress=true" : ""}`, "GET");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <div>
        {loading && skeletonLoader()}
        {!loading && isError && <p className="text-gray-800">Erreur lors du chargement des projets</p>}
        {!loading && isSuccess && data && data.length === 0 && (
          <p className="text-gray-800">Aucun projet pour le moment.</p>
        )}
        {!loading && isSuccess && data && data.length > 0 && (
          <ul className="space-y-1">
            {data.map((p) => (
              <ProjectItem project={p} key={p.id} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
