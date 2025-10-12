"use client";

import { useState, FormEvent, JSX } from "react";
import { useApi } from "@/hooks/useApi";
import AddIcon from '@mui/icons-material/Add';

interface ClientFormData {
  name: string;
  surname: string;
  email: string;
  company: string;
}

export default function ClientForm(): JSX.Element {
  const [form, setForm] = useState<ClientFormData>({
    name: "",
    surname: "",
    email: "",
    company: "",
  });

  const [openForm, setOpenForm] = useState(false);
  const { request: postClient } = useApi<undefined>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    postClient("/api/clients", "POST", form, () => window.location.reload(), "Client créé avec succès");
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-4 rounded shadow-md"
      >
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-bold text-gray-800">Ajouter un client</h3>
          {!openForm &&
            <button
              id="open-client-form-button"
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
              id="create-client-nom-input"
              type="text"
              placeholder="Nom *"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full p-2 border rounded text-gray-800"
              required
            />
            <input
              id="create-client-prenom-input"
              type="text"
              placeholder="Prénom *"
              value={form.surname}
              onChange={(e) =>
                setForm({ ...form, surname: e.target.value })
              }
              className="w-full p-2 border rounded text-gray-800"
              required
            />
            <input
              id="create-client-email-input"
              type="email"
              placeholder="Email *"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full p-2 border rounded text-gray-800"
              required
            />
            <input
              id="create-client-company-input"
              type="text"
              placeholder="Entreprise"
              value={form.company}
              onChange={(e) =>
                setForm({ ...form, company: e.target.value })
              }
              className="w-full p-2 border rounded text-gray-800"
            />
            <div className="flex gap-2">
              <button
                id="open-client-submit-button"
                type="submit"
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
              >
                Créer
              </button>
              <button
                id="open-client-cancel-button"
                type="button"
                onClick={() => {
                  setForm({ name: "", surname: "", email: "", company: "" });
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
