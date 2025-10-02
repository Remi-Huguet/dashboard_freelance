"use client";

import { useState, useEffect, FormEvent, JSX } from "react";
import { useApi } from "@/hooks/useApi";
import EditIcon from '@mui/icons-material/Edit';
import { useCircularLoader } from "@/hooks/useCircularLoader";
import DeleteProject from "./DeleteProject";

interface ProjectData {
  id: string;
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

interface ProjectItemEditableProps {
  project: ProjectData;
}

export default function ProjectItemEditable({ project }: ProjectItemEditableProps): JSX.Element {
    const [form, setForm] = useState<ProjectData>({
        id: project.id,
        name: project.name,
        status: project.status,
        clientId: project.clientId
    });
    const [editMode, setEditMode] = useState(false);
    const { request: putProject } = useApi<undefined>();
    const { data, loading, isSuccess, isError, request: getClients } = useApi<ClientData[]>();
    const circularLoader = useCircularLoader();

    useEffect(() => {
        getClients("/api/clients", "GET");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="bg-white p-4 rounded shadow-md">
            <li className="py-1 text-gray-800 flex flex-row gap-2 items-center">
                {editMode ? (
                    <form
                        onSubmit={(e: FormEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            putProject(`/api/projects/${project.id}`, "PUT", form, () => window.location.reload(), "Projet modifié avec succès");
                        }}
                        className="space-y-2"
                    >
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Nom du projet"
                            className="border p-2 w-full"
                            required
                        />
                        <select
                            value={form.status}
                            onChange={(e) => setForm({ ...form, status: e.target.value })}
                            className="border p-2 w-full"
                            required
                        >
                            <option value="Non commencé">Non commencé</option>
                            <option value="En cours">En cours</option>
                            <option value="Terminé">Terminé</option>
                        </select>
                        <select
                            value={form.clientId}
                            onChange={(e) =>
                                setForm({ ...form, clientId: e.target.value })
                            }
                            className="w-full p-2 border rounded text-gray-800"
                            required
                        >
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
                        <div className="flex gap-2">
                            <button type="submit" className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
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
                        <div className="text-gray-800 flex items-center gap-1">
                            <h2 className="text-lg font-semibold">Projet :</h2>
                            <p>{project.name} - {project.status} -</p>
                            {loading && circularLoader()}
                            {!loading && isError && "Error loading client"}
                            {!loading && isSuccess && data && (
                                <p>
                                    {data.find(client => client.id === project.clientId)?.name} {data.find(client => client.id === project.clientId)?.surname} ({data.find(client => client.id === project.clientId)?.company ? data.find(client => client.id === project.clientId)?.company : "Sans entreprise"})
                                </p>
                            )}
                        </div>
                        <button
                            onClick={() => setEditMode(true)}
                            className="ml-4 bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                        >
                            <EditIcon />
                        </button>
                        <DeleteProject projectId={project.id} />
                    </>
                )}
            </li>
        </div>
    )
}