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
    <div className="space-y-6">
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-xl font-bold mb-2 text-gray-800">Liste des clients</h3>
        <LoadingData loading={loading} isSuccess={isSuccess} isError={isError} data={data} 
          errorMessage="Erreur lors du chargement des clients."
          noDataMessage="Pas de client." 
          showSkeletonLoader={true} />
        {!loading && isSuccess && data && data.length > 0 &&
          <ul className="space-y-1">
            {data.map((c) => (
              <ClientItemEditable client={c} key={c.id} />
            ))}
          </ul>
        }
      </div>
    </div>
  );
}
