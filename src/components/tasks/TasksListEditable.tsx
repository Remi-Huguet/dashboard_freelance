"use client";

import { useEffect, JSX, useState } from "react";
import TaskItemEditable from "./TaskItemEditable";
import { useApi } from "@/hooks/useApi";
import LoadingData from "../global/LoadingData";
import { taskTypes } from "@/utils/utils";

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
  const [tasksList, setTasksList] = useState<TaskData[]>([]);
  const [tasksListFiltered, setTasksListFiltered] = useState<TaskData[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [filterTypeValue, setFilterTypeValue] = useState("");

  useEffect(() => {
    getTasks(`/api/projects/${idProject}/tasks`, "GET");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      setTasksList(data);
    }
  }, [data]);

  useEffect(() => {
    setTasksListFiltered(tasksList.filter((task) => 
      (task.title.includes(filterValue) || task.desc.includes(filterValue)) &&
      (task.type.includes(filterTypeValue))
    ))
  }, [tasksList, filterValue, filterTypeValue]);

  return (
    <div className="bg-white p-4 rounded shadow-md flex flex-col gap-4">
      <h3 className="text-xl font-bold text-gray-800">Liste des tâches</h3>
      <div className="flex flex-row gap-2">
        <input
          id="filter-tasks-name-input"
          type="text"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="p-2 border rounded text-gray-600 w-1/4"
          placeholder="Filtrer par titre ou description"
        />
        <select
          id="filter-tasks-status-select"
          value={filterTypeValue}
          onChange={(e) =>
              setFilterTypeValue(e.target.value)
          }
          className="p-2 border rounded text-gray-600 w-1/4"
        >
          <option id={`fikter-tasks-type-null-option`} value="">
              Tous les types
          </option>
          {taskTypes.map((type) => 
              <option id={`fikter-tasks-type-${type}-option`} key={type} value={type}>{type}</option>)
          }
        </select>
      </div>
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
      <ul className="flex flex-col gap-2">
        {tasksListFiltered.map((t) => (
          <TaskItemEditable task={t} key={t.id} />
        ))}
      </ul>
    </div>
  );
}
