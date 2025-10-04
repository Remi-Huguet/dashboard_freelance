"use client";

import { useEffect, JSX } from "react";
import ProjectItem from "../projects/ProjectItem";
import { useApi } from "@/hooks/useApi";
import LoadingData from "./LoadingData";

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

  useEffect(() => {
    getProjects(`/api/projects${inProgress && inProgress ? "?inProgress=true" : ""}`, "GET");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <LoadingData loading={loading} isSuccess={isSuccess} isError={isError} data={data} 
          errorMessage="Erreur lors du chargement des projets."
          noDataMessage="Aucun projet." 
          showSkeletonLoader={true} />
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
