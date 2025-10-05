"use client";

import { useEffect, JSX } from "react";
import TaskItemEditable from "./TaskItemEditable";
import { useApi } from "@/hooks/useApi";
import LoadingData from "../global/LoadingData";

interface TaskData {
  id: string;
  title: string;
  desc: string;
  type: string;
  done: boolean;
  projectId: string;
}

interface TasksListEditableProps {
  idProject: string;
}

export default function TasksListEditable({ idProject }: TasksListEditableProps): JSX.Element {
  const { data, loading, isSuccess, isError, request: getTasks } = useApi<TaskData[]>();

  useEffect(() => {
    getTasks(`/api/projects/${idProject}/tasks`, "GET");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-md flex flex-col gap-2">
      <h3 className="text-xl font-bold text-gray-800 mb-2">Liste des tâches</h3>
      <div className="flex flex-row">
        <p className="text-gray-800 w-1/5 font-bold">Titre</p>
        <p className="text-gray-800 w-1/5 font-bold">Description</p>
        <p className="text-gray-800 w-1/5 font-bold">Type</p>
        <p className="text-gray-800 w-1/5 font-bold">Statut</p>
      </div>
      <LoadingData loading={loading} isSuccess={isSuccess} isError={isError} data={data} 
        errorMessage="Erreur lors du chargement des tâches."
        noDataMessage="Pas de tâche." 
        showSkeletonLoader={true} />
      {!loading && isSuccess && data && data.length > 0 && (
        <ul className="flex flex-col gap-2">
          {data.map((t) => (
            <TaskItemEditable task={t} key={t.id} />
          ))}
        </ul>
      )}
    </div>
  );
}
