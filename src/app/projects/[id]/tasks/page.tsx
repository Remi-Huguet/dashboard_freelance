"use client";

import { JSX } from "react";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import TaskForm from "@/components/tasks/TaskForm";
import TasksListEditable from "@/components/tasks/TasksListEditable";
import ListAltIcon from '@mui/icons-material/ListAlt';

interface TasksProps {
  params: { id: string };
}

export default function Tasks({ params }: TasksProps): JSX.Element {
  return (
    <div className="h-full bg-gray-100 p-8">
        <div className="mt-8 p-6 flex flex-col gap-4">
            <button
                onClick={() => window.location.href = `/projects/${params.id}`}
                className="self-start bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition align-center flex items-center gap-2"
            >
                <NavigateBeforeIcon /> Retour au projet
            </button>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2 mt-2 mb-2"><ListAltIcon fontSize="large" />Tâches du projet</h1>
            <TaskForm idProject={params.id} />
            <TasksListEditable idProject={params.id} />
        </div>
    </div>
  );
}
