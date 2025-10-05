"use client";

import { useState, useEffect, FormEvent, JSX } from "react";
import { useApi } from "@/hooks/useApi";
import EditIcon from '@mui/icons-material/Edit';
import DeleteProject from "./DeleteProject";
import { projectStatus } from "@/utils/utils";
import LoadingData from "../global/LoadingData";

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

    useEffect(() => {
        getClients("/api/clients", "GET");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="bg-white p-4 rounded shadow-md flex flex-col gap-4">
            <h3 className="text-xl font-bold text-gray-800">Projet</h3>
            <div className="flex flex-row">
              <p className="text-gray-800 w-1/5 font-bold">Nom</p>
              <p className="text-gray-800 w-1/5 font-bold">Statut</p>
              <p className="text-gray-800 w-1/5 font-bold">Client</p>
            </div>
            <div>
                {editMode ? (
                    <form
                        onSubmit={(e: FormEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            putProject(`/api/projects/${project.id}`, "PUT", form, () => window.location.reload(), "Projet modifié avec succès");
                        }}
                        className="w-full flex flex-row items-center"
                    >
                        <div className="w-1/5">
                            <input
                                type="text"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder="Nom du projet"
                                className="p-2 border rounded text-gray-600 w-9/10"
                                required
                            />
                        </div>
                        <div className="w-1/5">
                            <select
                                value={form.status}
                                onChange={(e) => setForm({ ...form, status: e.target.value })}
                                className="p-2 border rounded text-gray-600 w-9/10"
                                required
                            >
                                {projectStatus.map((status) => 
                                    <option key={status} value={status}>{status}</option>)
                                }
                            </select>
                        </div>
                        <div className="w-1/5">
                            <select
                                value={form.clientId}
                                onChange={(e) =>
                                    setForm({ ...form, clientId: e.target.value })
                                }
                                className="p-2 border rounded text-gray-600 w-9/10"
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
                        </div>
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
                    <div className="w-full flex flex-row items-center">
                        <p className="text-gray-800 w-1/5">{project.name}</p>
                        <p className="text-gray-800 w-1/5">{project.status}</p>
                        <div className="text-gray-800 w-1/5 flex flex-row gap-2">
                            <LoadingData loading={loading} isSuccess={isSuccess} isError={isError} data={data} 
                                errorMessage="Erreur lors du chargement du client."
                                noDataMessage="Pas de client." 
                                showSkeletonLoader={false} />
                            {!loading && isSuccess && data && (
                                <>
                                    {data.find(client => client.id === project.clientId)?.name} {data.find(client => client.id === project.clientId)?.surname}
                                </>
                            )}
                        </div>
                        <div className="flex flex-row gap-2 ml-auto">
                            <button
                                onClick={() => setEditMode(true)}
                                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                            >
                                <EditIcon />
                            </button>
                            <DeleteProject projectId={project.id} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}