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
            <li className="border-b py-1 text-gray-800 flex flex-row gap-2 items-center">
                {editMode ? (
                    <form
                        onSubmit={(e: FormEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            putLink(`/api/links/${link.id}`, "PUT", form, () => window.location.reload(), "Lien modifié avec succès");
                        }}
                        className="space-y-2"
                    >
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full p-2 border rounded text-gray-800"
                            placeholder="Nom"
                            required
                        />
                        <input
                            type="text"
                            value={form.url}
                            onChange={(e) => setForm({ ...form, url: e.target.value })}
                            className="w-full p-2 border rounded text-gray-800"
                            placeholder="URL"
                            required
                        />
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
                    <>
                        {link.name} - {link.url}
                        <button
                            onClick={() => setEditMode(true)}
                            className="ml-4 bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                        >
                            <EditIcon />
                        </button>
                        <DeleteLink linkId={link.id} />
                    </>
                )}
            </li>
        </div>
    )
}