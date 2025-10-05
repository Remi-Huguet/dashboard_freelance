"use client";

import { useEffect, JSX } from "react";
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

  useEffect(() => {
    getClients("/api/clients", "GET");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-md flex flex-col gap-2">
      <h3 className="text-xl font-bold text-gray-800 mb-2">Liste des clients</h3>
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
      {!loading && isSuccess && data && data.length > 0 &&
        <ul className="flex flex-col gap-2">
          {data.map((c) => (
            <ClientItemEditable client={c} key={c.id} />
          ))}
        </ul>
      }
    </div>
  );
}
