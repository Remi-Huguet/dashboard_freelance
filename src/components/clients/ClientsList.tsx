"use client";

import { useEffect, JSX } from "react";
import ClientCard from "./ClientCard";
import { useApi } from "@/hooks/useApi";
import { useSkeletonLoader } from "@/hooks/useSkeletonLoader";

interface ClientData {
  id: string;
  name: string;
  surname: string;
  email: string;
  company?: string;
}

export default function ClientsList(): JSX.Element {
  const { data, loading, isSuccess, isError, request } = useApi<ClientData[]>();
  const skeletonLoader = useSkeletonLoader("50px", "60%");

  useEffect(() => {
    request("/api/clients", "GET");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-xl font-bold mb-2 text-gray-800">Liste des clients</h3>
        {loading && skeletonLoader()}
        {!loading && isError && <p className="text-red-500">Erreur lors du chargement des clients.</p>}
        {!loading && isSuccess && data &&
          <>
            {data.length === 0 ? (
              <p className="text-gray-800">Aucun client pour le moment.</p>
            ) : (
              <ul className="space-y-1">
                {data.map((c) => (
                  <ClientCard client={c} key={c.id} />
                ))}
              </ul>
            )}
          </>
        }
      </div>
    </div>
  );
}
