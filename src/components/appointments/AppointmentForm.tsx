"use client";

import { useState, FormEvent, JSX } from "react";
import { useApi } from "@/hooks/useApi";
import AddIcon from '@mui/icons-material/Add';

interface AppointmentFormData {
  title: string;
  date: Date;
  projectId: string;
}

interface AppointmentFormProps {
  idProject: string;
}

export default function AppointmentForm({ idProject }: AppointmentFormProps): JSX.Element {
  const [form, setForm] = useState<AppointmentFormData>({
    title: "",
    date: new Date(),
    projectId: idProject,
  });

  const [openForm, setOpenForm] = useState(false);
  const { request: postAppointment } = useApi<undefined>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    postAppointment("/api/appointments", "POST", form, () => window.location.reload(), "Rendez-vous créé avec succès");
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-4 rounded shadow-md"
      >
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-bold text-gray-800">Ajouter un rendez-vous</h3>
          {!openForm &&
            <button
              id="create-appointment-form-button"
              type="button"
              onClick={() => {setOpenForm(true); console.log("CLICKED");}}
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
              <AddIcon />
            </button>
          }
        </div>
        {openForm && (
          <>
            <input
              type="text"
              placeholder="Titre *"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="w-full p-2 border rounded text-gray-800"
              required
            />
            <div className="w-full flex flex-col gap-1">
              <p className="text-gray-800">Date du rendez-vous</p>
              <input
                  type="datetime-local"
                  value={form.date.toISOString().slice(0, 16)}
                  onChange={(e) =>
                    setForm({ ...form, date: new Date(e.target.value) })
                  }
                  className="w-full p-2 border rounded text-gray-800"
                  required
              />
            </div>
            <div className="flex gap-2">
              <button
                id="create-appointment-submit-button"
                type="submit"
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
              >
                Créer
              </button>
              <button
                type="button"
                onClick={() => {
                  setForm({ title: "", date: new Date(), projectId: idProject });
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
