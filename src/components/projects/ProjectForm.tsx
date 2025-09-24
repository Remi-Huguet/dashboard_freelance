"use client";

import { useState, FormEvent, JSX, useEffect } from "react";
import { useApi } from "@/hooks/useApi";

interface ProjectFormData {
  name: string;
  status: string;
  clientId: string;
}

interface ClientData {
  id: string;
  name: string;
  surname: string;
  email: string;
  company?: string;
}

export default function ProjectForm(): JSX.Element {
    const [formData, setFormData] = useState<ProjectFormData>({
        name: "",
        status: "",
        clientId: "",
    });
    
    const [openForm, setOpenForm] = useState(false);
    const { data, loading, isSuccess, isError, request: getClients } = useApi<ClientData[]>();
    const { request: postProject } = useApi();
    
      useEffect(() => {
        getClients("/api/clients", "GET");
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        postProject("/api/projects", "POST", formData, () => window.location.reload(), "Projet créé avec succès");
    };

    return (
        <div className="space-y-6">
            <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-white p-4 rounded shadow-md"
            >
                <div className="flex items-center gap-4">
                    <h3 className="text-xl font-bold text-gray-800">Ajouter un Projet</h3>
                    <button
                        type="button"
                        onClick={() => {
                            if (openForm) {
                              setFormData({ name: "", status: "", clientId: "" });
                            }
                            setOpenForm(!openForm);
                        }}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                        {openForm ? "Fermer" : "Nouveau Projet"}
                    </button>
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
                        <select
                            value={formData.status}
                            onChange={(e) =>
                                setFormData({ ...formData, status: e.target.value })
                            }
                            className="w-full p-2 border rounded text-gray-800"
                            required
                        >
                            <option value="" disabled>
                                Sélectionner un statut *
                            </option>
                            <option value="Non commencé">Non commencé</option>
                            <option value="En cours">En cours</option>
                            <option value="Terminé">Terminé</option>
                        </select>
                        <select
                            value={formData.clientId}
                            onChange={(e) =>
                                setFormData({ ...formData, clientId: e.target.value })
                            }
                            className="w-full p-2 border rounded text-gray-800"
                            required
                        >
                            <option value="" disabled>
                                Sélectionner un client *
                            </option>
                            {loading && <option>Loading...</option>}
                            {!loading && isError && <option>Error loading clients</option>}
                            {!loading && isSuccess && data && data.length === 0 && (
                                <option>No clients available</option>
                            )}
                            {!loading && isSuccess && data && data.length > 0 && (
                                <>
                                    {data.map((client: ClientData) => (
                                        <option key={client.id} value={client.id}>
                                            {client.name} {client.surname}
                                        </option>
                                    ))}
                                </>
                            )}
                        </select>
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                        >
                          Créer
                        </button>
                    </>
                )}
            </form>
        </div>
    )
}
