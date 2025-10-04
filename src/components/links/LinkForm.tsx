"use client"

import { FormEvent, JSX, useState } from "react";
import { useApi } from "@/hooks/useApi";
import AddIcon from '@mui/icons-material/Add';

interface LinkFormData {
  name: string;
  url: string;
  projectId: string;
}

interface LinkFormProps {
  idProject: string;
}

export default function LinkForm({ idProject }: LinkFormProps): JSX.Element {
    const [formData, setFormData] = useState<LinkFormData>({
      name: "",
      url: "",
      projectId: idProject,
    });

    const [openForm, setOpenForm] = useState(false);
    const { request: postLink } = useApi();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        postLink("/api/links", "POST", formData, () => window.location.reload(), "Lien créé avec succès");
    };

    return (
        <div className="space-y-6">
            <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-white p-4 rounded shadow-md"
            >
                <div className="flex items-center gap-4">
                    <h3 className="text-xl font-bold text-gray-800">Ajouter un Lien</h3>
                    {!openForm &&
                      <button
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
                            type="text"
                            placeholder="Nom *"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full p-2 border rounded text-gray-800"
                            required
                        />
                        <input
                            type="url"
                            placeholder="URL *"
                            value={formData.url}
                            onChange={(e) =>
                              setFormData({ ...formData, url: e.target.value })
                            }
                            className="w-full p-2 border rounded text-gray-800"
                            required
                        />
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                          >
                            Créer
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({ name: "", url: "", projectId: idProject });
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
    )
}