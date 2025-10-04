"use client";

import { useEffect, JSX } from "react";
import TaskItemEditable from "./TaskItemEditable";
import { useApi } from "@/hooks/useApi";
import { useSkeletonLoader } from "@/hooks/useSkeletonLoader";

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
  const skeletonLoader = useSkeletonLoader("50px", "60%");

  useEffect(() => {
    getTasks(`/api/projects/${idProject}/tasks`, "GET");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-xl font-bold mb-2 text-gray-800">Liste des tâches</h3>
        {loading && skeletonLoader()}
        {!loading && isError && <p className="text-gray-800">Erreur lors du chargement des tâches</p>}
        {!loading && isSuccess && data && data.length === 0 && (
          <p className="text-gray-800">Aucune tâche pour le moment.</p>
        )}
        {!loading && isSuccess && data && data.length > 0 && (
          <ul className="space-y-1">
            {data.map((t) => (
              <TaskItemEditable task={t} key={t.id} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
