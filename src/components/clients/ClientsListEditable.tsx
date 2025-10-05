"use client";

import { useEffect, JSX, useState } from "react";
import ClientItemEditable from "./ClientItemEditable";
import { useApi } from "@/hooks/useApi";
import LoadingData from "../global/LoadingData";

interface ClientData {
  id: string;
  name: string;
  surname: string;
  email: string;
  company?: string;
}

export default function ClientsListEditable(): JSX.Element {
  const { data, loading, isSuccess, isError, request: getClients } = useApi<ClientData[]>();
  const [clientsList, setClientsList] = useState<ClientData[]>([]);
  const [clientsListFiltered, setClientsListFiltered] = useState<ClientData[]>([]);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    getClients("/api/clients", "GET");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      setClientsList(data);
    }
  }, [data]);

  useEffect(() => {
    setClientsListFiltered(clientsList.filter((client) => 
      client.name.includes(filterValue) || client.surname.includes(filterValue)
    ))
  }, [clientsList, filterValue]);

  return (
    <div className="bg-white p-4 rounded shadow-md flex flex-col gap-4">
      <h3 className="text-xl font-bold text-gray-800 ">Liste des clients</h3>
      <div className="flex flex-row gap-2">
        <input
            type="text"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="p-2 border rounded text-gray-600 w-1/4"
            placeholder="Filtrer par nom ou prénom"
        />
      </div>
      <div className="flex flex-row">
        <p className="text-gray-800 w-1/5 font-bold">Nom</p>
        <p className="text-gray-800 w-1/5 font-bold">Prénom</p>
        <p className="text-gray-800 w-1/5 font-bold">Mail</p>
        <p className="text-gray-800 w-1/5 font-bold">Entreprise</p>
      </div>
      <LoadingData loading={loading} isSuccess={isSuccess} isError={isError} data={data} 
        errorMessage="Erreur lors du chargement des clients."
        noDataMessage="Pas de client." 
        showSkeletonLoader={true} />
      <ul className="flex flex-col gap-2">
        {clientsListFiltered.map((c) => (
          <ClientItemEditable client={c} key={c.id} />
        ))}
      </ul>
    </div>
  );
}
