import { JSX } from "react";
import ProjectForm from "@/components/projects/ProjectForm";
import ProjectsList from "@/components/global/ProjectsList";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

export default function Projects(): JSX.Element {
  return (
    <div className="h-full bg-gray-100 p-8">
      <div className="mt-8 p-6 flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2 mb-2"><FolderOpenIcon fontSize="large" />Projets</h1>
        <ProjectForm/>
        <h3 className="text-xl font-bold text-gray-800 mb-2 mt-2">Liste des projets</h3>
        <ProjectsList />
      </div>
    </div>
  );
}
