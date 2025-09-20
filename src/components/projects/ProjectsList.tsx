"use client";

import { useState, useEffect, JSX } from "react";
import ProjectCard from "./ProjectCard";

interface Project {
  id: string;
  name: string;
  status: string;
  clientId: string;
}

export default function ProjectsList(): JSX.Element {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data: Project[] = await res.json();
    setProjects(data);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-xl font-bold mb-2 text-gray-800">Liste des projets</h3>
        {projects.length === 0 ? (
          <p className="text-gray-800">Aucun projet pour le moment.</p>
        ) : (
          <ul className="space-y-1">
            {projects.map((p) => (
              <ProjectCard project={p} key={p.id} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
