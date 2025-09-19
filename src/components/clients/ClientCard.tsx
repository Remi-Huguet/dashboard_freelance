import { useState, FormEvent, JSX } from "react";

interface ClientData {
    id: string;
    name: string;
    surname: string;
    email: string;
    company?: string;
}

interface ClientCardProps {
  client: ClientData;
}

export default function ClientCard({ client }: ClientCardProps): JSX.Element {
    const [form, setForm] = useState<ClientData>({
        id: client.id,
        name: client.name,
        surname: client.surname,
        email: client.email,
        company: client.company,
    });
    const [editMode, setEditMode] = useState(false);

    const deleteClient = async () => {
        const res = await fetch(`/api/clients/${client.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
            window.location.reload();
        }
    }

    return (
        <div>
            <li className="border-b py-1 text-gray-800">
                {editMode ? (
                    <form
                        onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                            e.preventDefault();
                             const res = await fetch(`/api/clients/${client.id}`, {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(form),
                            });
                            if (res.ok) {
                                window.location.reload();
                            }
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
                            value={form.surname}
                            onChange={(e) => setForm({ ...form, surname: e.target.value })}
                            className="w-full p-2 border rounded text-gray-800"
                            placeholder="Prénom"
                            required
                        />
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full p-2 border rounded text-gray-800"
                            placeholder="Email"
                            required
                        />
                        <input
                            type="text"
                            value={form.company}
                            onChange={(e) => setForm({ ...form, company: e.target.value })}
                            className="w-full p-2 border rounded text-gray-800"
                            placeholder="Entreprise"
                        />
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                            >
                                Sauvegarder
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
                        {client.name} {client.surname} - {client.email} - {client.company && `(${client.company})`}
                        <button
                            onClick={() => setEditMode(true)}
                            className="ml-4 bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                        >
                            Éditer
                        </button>
                        <button
                            onClick={deleteClient}
                            className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                            Supprimer
                        </button>
                    </>
                )}
            </li>
        </div>
    )
}