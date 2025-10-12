"use client";

import { useState, FormEvent, JSX } from "react";
import DeleteClient from "./DeleteClient";
import { useApi } from "@/hooks/useApi";
import EditIcon from '@mui/icons-material/Edit';

interface ClientData {
    id: string;
    name: string;
    surname: string;
    email: string;
    company?: string;
}

interface ClientItemEditableProps {
  client: ClientData;
}

export default function ClientItemEditable({ client }: ClientItemEditableProps): JSX.Element {
    const [form, setForm] = useState<ClientData>({
        id: client.id,
        name: client.name,
        surname: client.surname,
        email: client.email,
        company: client.company,
    });
    const [editMode, setEditMode] = useState(false);
    const { request: putClient } = useApi<undefined>();

    return (
        <li>
            {editMode ? (
                <form
                    onSubmit={(e: FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                        putClient(`/api/clients/${client.id}`, "PUT", form, () => window.location.reload(), "Client modifié avec succès");
                    }}
                    className="w-full flex flex-row items-center"
                >
                    <div className="w-1/5">
                        <input
                            id="edit-client-nom-input"
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="p-2 border rounded text-gray-600 w-9/10"
                            placeholder="Nom"
                            required
                        />
                    </div>
                    <div className="w-1/5">
                        <input
                            id="edit-client-prenom-input"
                            type="text"
                            value={form.surname}
                            onChange={(e) => setForm({ ...form, surname: e.target.value })}
                            className="p-2 border rounded text-gray-600 w-9/10"
                            placeholder="Prénom"
                            required
                        />
                    </div>
                    <div className="w-1/5">
                        <input
                            id="edit-client-email-input"
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="p-2 border rounded text-gray-600 w-9/10"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="w-1/5">
                        <input
                            id="edit-client-company-input"
                            type="text"
                            value={form.company}
                            onChange={(e) => setForm({ ...form, company: e.target.value })}
                            className="p-2 border rounded text-gray-600 w-9/10"
                            placeholder="Entreprise"
                        />
                    </div>                        
                    <div className="flex gap-2 ml-auto">
                        <button
                            id="update-client-submit-button"
                            type="submit"
                            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                        >
                            Modifier
                        </button>
                        <button
                            id="update-client-cancel-button"
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
                    <p className="text-gray-800 w-1/5">{client.name}</p>
                    <p className="text-gray-800 w-1/5">{client.surname}</p>
                    <p className="text-gray-800 w-1/5">{client.email}</p>
                    <p className="text-gray-800 w-1/5">{client.company && client.company}</p>
                    <div className="flex flex-row gap-2 ml-auto">
                        <button
                            id="update-client-form-button"
                            onClick={() => setEditMode(true)}
                            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                        >
                            <EditIcon />
                        </button>
                        <DeleteClient clientId={client.id} />
                    </div>
                </div>
            )}
        </li>
    )
}