"use client";

import { useState, useEffect, JSX } from "react";
import ClientCard from "./ClientCard";

interface Client {
  id: string;
  name: string;
  surname: string;
  email: string;
  company?: string;
}

export default function ClientsList(): JSX.Element {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const res = await fetch("/api/clients");
    const data: Client[] = await res.json();
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
              <ClientCard client={c} key={c.id} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
