"use client";

import { useState, FormEvent, JSX } from "react";
import DeleteTask from "./DeleteTask";
import { useApi } from "@/hooks/useApi";
import EditIcon from '@mui/icons-material/Edit';
import { taskTypes } from "@/utils/utils";

interface TaskData {
    id: string;
    title: string;
    desc: string;
    type: string;
    done: boolean;
    projectId: string;
}

interface TaskItemEditableProps {
  task: TaskData;
}

export default function TaskItemEditable({ task }: TaskItemEditableProps): JSX.Element {
    const [form, setForm] = useState<TaskData>({
        id: task.id,
        title: task.title,
        desc: task.desc,
        type: task.type,
        done: task.done,
        projectId: task.projectId
    });
    const [editMode, setEditMode] = useState(false);
    const { request: putTask } = useApi<undefined>();

    return (
        <div>
            <li className="border-b py-1 text-gray-800 flex flex-row gap-2 items-center">
                {editMode ? (
                    <form
                        onSubmit={(e: FormEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            putTask(`/api/tasks/${task.id}`, "PUT", form, () => window.location.reload(), "Tâche modifiée avec succès");
                        }}
                        className="space-y-2"
                    >
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full p-2 border rounded text-gray-800"
                            placeholder="Titre"
                            required
                        />
                        <input
                            type="text"
                            value={form.desc}
                            onChange={(e) => setForm({ ...form, desc: e.target.value })}
                            className="w-full p-2 border rounded text-gray-800"
                            placeholder="Description"
                        />
                        <select
                            value={form.type}
                            onChange={(e) =>
                                setForm({ ...form, type: e.target.value })
                            }
                            className="w-full p-2 border rounded text-gray-800"
                            required
                        >
                            <option value="" disabled>
                                Sélectionner un type *
                            </option>
                            {taskTypes.map((type) => 
                                <option key={type} value={type}>{type}</option>)
                            }
                        </select>
                        <label className="flex items-center gap-2">
                            <span className="text-gray-800">Terminé</span>
                            <input
                                type="checkbox"
                                checked={form.done}
                                onChange={(e) => setForm({ ...form, done: e.target.checked })}
                                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                            />
                        </label>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                            >
                                Modifier
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditMode(false)}
                                className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                            >
                                Annuler
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        {task.title} - {task.desc} - {task.type} - {task.done ? "Terminé" : "En cours"}
                        <button
                            onClick={() => setEditMode(true)}
                            className="ml-4 bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                        >
                            <EditIcon />
                        </button>
                        <DeleteTask taskId={task.id} />
                    </>
                )}
            </li>
        </div>
    )
}