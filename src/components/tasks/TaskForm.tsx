"use client";

import { useState, FormEvent, JSX } from "react";
import { useApi } from "@/hooks/useApi";
import AddIcon from '@mui/icons-material/Add';
import { taskTypes } from "@/utils/utils";

interface TaskFormData {
  title: string;
  desc: string;
  type: string;
  done: boolean;
  projectId: string;
}

interface TaskFormProps {
  idProject: string;
}

export default function TaskForm({ idProject }: TaskFormProps): JSX.Element {
  const [form, setForm] = useState<TaskFormData>({
    title: "",
    desc: "",
    type: "",
    done: false,
    projectId: idProject
  });

  const [openForm, setOpenForm] = useState(false);
  const { request: postTask } = useApi<undefined>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    postTask("/api/tasks", "POST", form, () => window.location.reload(), "Tâche créé avec succès");
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-4 rounded shadow-md"
      >
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-bold text-gray-800">Ajouter une tâche</h3>
          {!openForm &&
            <button
              id="create-task-button"
              type="button"
              onClick={() => setOpenForm(true)}
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
              <AddIcon />
            </button>
          }
        </div>
        {openForm && (
          <>
            <input
              id="create-task-title-input"
              type="text"
              placeholder="Titre *"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="w-full p-2 border rounded text-gray-800"
              required
            />
            <input
              id="create-task-description-input"
              type="text"
              placeholder="Description"
              value={form.desc}
              onChange={(e) =>
                setForm({ ...form, desc: e.target.value })
              }
              className="w-full p-2 border rounded text-gray-800"
            />
            <select
              id="create-task-type-select"
              value={form.type}
              onChange={(e) =>
                  setForm({ ...form, type: e.target.value })
              }
              className="w-full p-2 border rounded text-gray-800"
              required
            >
              <option id={`create-task-type-null-option`} value="" disabled>
                  Sélectionner un type *
              </option>
              {taskTypes.map((type) => 
                  <option id={`create-task-type-${type}-option`} key={type} value={type}>{type}</option>)
              }
            </select>
            <div className="flex gap-2">
              <button
                id="create-task-submit-button"
                type="submit"
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
              >
                Créer
              </button>
              <button
                id="create-task-cancel-button"
                type="button"
                onClick={() => {
                  setForm({ title: "", desc: "", type: "", done: false, projectId: idProject });
                  setOpenForm(false);
                }}
                className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
              >
                Annuler
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
