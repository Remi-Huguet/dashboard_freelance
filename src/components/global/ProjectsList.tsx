"use client";

import { useEffect, JSX, useState } from "react";
import ProjectItem from "../projects/ProjectItem";
import { useApi } from "@/hooks/useApi";
import LoadingData from "./LoadingData";
import { projectStatus } from "@/utils/utils";

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
  const [projectsList, setProjectsList] = useState<ProjectData[]>([]);
  const [projectsListFiltered, setProjectsListFiltered] = useState<ProjectData[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [filterStatusValue, setFilterStatusValue] = useState("");

  useEffect(() => {
    getProjects(`/api/projects${inProgress && inProgress ? "?inProgress=true" : ""}`, "GET");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      setProjectsList(data);
    }
  }, [data]);

  useEffect(() => {
    setProjectsListFiltered(projectsList.filter((project) => 
      project.name.includes(filterValue) && project.status.includes(filterStatusValue)
    ))
  }, [projectsList, filterValue, filterStatusValue]);

  return (
    <div className="space-y-6">
      {!inProgress && 
        <div className="flex flex-row gap-2">
          <input
            id="filter-projects-by-name-input"
            type="text"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="p-2 border rounded text-gray-600 w-1/4"
            placeholder="Filtrer par nom"
          />
          <select
              id="filter-projects-by-status-select"
              value={filterStatusValue}
              onChange={(e) =>
                  setFilterStatusValue(e.target.value)
              }
              className="p-2 border rounded text-gray-600 w-1/4"
          >
              <option id={`filter-projects-status-null-option`} value="">Tous les status</option>
              {projectStatus.map((statut) =>
                <option id={`filter-projects-status-${statut}-option`} key={statut} value={statut}>{statut}</option>
              )}
          </select>
        </div>
      }
      <LoadingData loading={loading} isSuccess={isSuccess} isError={isError} data={data} 
        errorMessage="Erreur lors du chargement des projets."
        noDataMessage="Aucun projet." 
        showSkeletonLoader={true} />
      <ul className="space-y-1">
        {projectsListFiltered.map((p) => (
          <ProjectItem project={p} key={p.id} />
        ))}
      </ul>
    </div>
  );
}
