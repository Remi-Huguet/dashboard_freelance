"use client";

import { useState, FormEvent, JSX } from "react";
import DeleteLink from "./DeleteLink";
import { useApi } from "@/hooks/useApi";
import EditIcon from '@mui/icons-material/Edit';

interface LinkData {
    id: string;
    name: string;
    url: string;
    projectId: string;
}

interface LinkItemEditableProps {
  link: LinkData;
}

export default function LinkItemEditable({ link }: LinkItemEditableProps): JSX.Element {
    const [form, setForm] = useState<LinkData>({
        id: link.id,
        name: link.name,
        url: link.url,
        projectId: link.projectId
    });
    const [editMode, setEditMode] = useState(false);
    const { request: putLink } = useApi<undefined>();

    return (
        <div>
            <li>
                {editMode ? (
                    <form
                        onSubmit={(e: FormEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            putLink(`/api/links/${link.id}`, "PUT", form, () => window.location.reload(), "Lien modifié avec succès");
                        }}
                        className="w-full flex flex-row items-center"
                    >
                        <div className="w-1/5">
                            <input
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
                                type="text"
                                value={form.url}
                                onChange={(e) => setForm({ ...form, url: e.target.value })}
                                className="p-2 border rounded text-gray-600 w-9/10"
                                placeholder="URL"
                                required
                            />
                        </div>
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
                    <div className="w-full flex flex-row items-center">
                        <p className="text-gray-800 w-1/5">{link.name}</p>
                        <p className="text-gray-800 w-1/5">{link.url}</p>
                        <div className="flex flex-row gap-2 ml-auto">
                            <button
                                onClick={() => setEditMode(true)}
                                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                            >
                                <EditIcon />
                            </button>
                            <DeleteLink linkId={link.id} />
                        </div>
                    </div>
                )}
            </li>
        </div>
    )
}