"use client";

import { useState, useEffect } from "react";

export default function ClientsList() {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        const res = await fetch("/api/clients");
        const data = await res.json();
        setClients(data);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-4 rounded shadow-md">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Liste des clients</h3>
                    {clients.length === 0 ? (
                        <p className="text-gray-800">Aucun client pour le moment.</p>
                    ) : (
                        <ul className="space-y-1">
                            {clients.map((c) => (
                                <li key={c.id} className="border-b py-1 text-gray-800">
                                    {c.name} {c.surname} - {c.email} {c.company && `(${c.company})`}
                                </li>
                    ))}
                  </ul>
                )}
            </div>
        </div>
    );
}