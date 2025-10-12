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
        <li>
            {editMode ? (
                <form
                    onSubmit={(e: FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                        putTask(`/api/tasks/${task.id}`, "PUT", form, () => window.location.reload(), "Tâche modifiée avec succès");
                    }}
                    className="w-full flex flex-row items-center"
                >
                    <div className="w-1/5">
                        <input
                            id="edit-task-title-input"
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="p-2 border rounded text-gray-600 w-9/10"
                            placeholder="Titre"
                            required
                        />
                    </div>
                    <div className="w-1/5">
                        <input
                            id="edit-task-description-input"
                            type="text"
                            value={form.desc}
                            onChange={(e) => setForm({ ...form, desc: e.target.value })}
                            className="p-2 border rounded text-gray-600 w-9/10"
                            placeholder="Description"
                        />
                    </div>
                    <div className="w-1/5">
                        <select
                            id="edit-task-type-select"
                            value={form.type}
                            onChange={(e) =>
                                setForm({ ...form, type: e.target.value })
                            }
                            className="p-2 border rounded text-gray-600 w-9/10"
                            required
                        >
                            <option id={`create-task-type-null-option`} value="" disabled>
                                Sélectionner un type *
                            </option>
                            {taskTypes.map((type) => 
                                <option id={`create-task-type-${type}-option`} key={type} value={type}>{type}</option>)
                            }
                        </select>
                    </div>
                    <div className="w-1/5">
                        <label className="p-2 border rounded text-gray-600 w-9/10 flex flex-row gap-2 items-center">
                            <span className="text-gray-800">Terminé</span>
                            <input
                                id="edit-task-done-input"
                                type="checkbox"
                                checked={form.done}
                                onChange={(e) => setForm({ ...form, done: e.target.checked })}
                                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                            />
                        </label>
                    </div>
                    <div className="flex gap-2">
                        <button
                            id="edit-task-submit-button"
                            type="submit"
                            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                        >
                            Modifier
                        </button>
                        <button
                            id="edit-task-cancel-button"
                            type="button"
                            onClick={() => setEditMode(false)}
                            className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                        >
                            Annuler
                        </button>
                    </div>
                </form>
            ) : (
                <div className="w-full flex flex-row items-center">
                    <p className="text-gray-800 w-1/5">{task.title}</p>
                    <p className="text-gray-800 w-1/5">{task.desc}</p>
                    <p className="text-gray-800 w-1/5">{task.type}</p>
                    <p className="text-gray-800 w-1/5">{task.done ? "Terminé" : "En cours"}</p>
                    <div className="flex flex-row gap-2 ml-auto">
                        <button
                            id="edit-task-button"
                            onClick={() => setEditMode(true)}
                            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                        >
                            <EditIcon />
                        </button>
                        <DeleteTask taskId={task.id} />
                    </div>
                </div>
            )}
        </li>
    )
}