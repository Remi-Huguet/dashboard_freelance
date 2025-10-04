"Use client";

import { JSX, useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import LoadingData from "../global/LoadingData";

interface ClientData {
    id: string;
    name: string;
    surname: string;
    email: string;
    company?: string;
}

interface ClientItemProps {
  clientId: string;
}

export default function ClientCard({ clientId }: ClientItemProps): JSX.Element {
    const { data, loading, isSuccess, isError, request: getClient } = useApi<ClientData>();

    useEffect(() => {
        getClient(`/api/clients/${clientId}`, "GET");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clientId]);

    return (
        <div className="p-4 border rounded bg-white shadow flex flex-col gap-2 w-full mt-4">
            <LoadingData loading={loading} isSuccess={isSuccess} isError={isError} data={data} 
                errorMessage="Erreur lors du chargement du client."
                noDataMessage="Pas de client." 
                showSkeletonLoader={true} />
            {!loading && isSuccess && data && (
                <>
                    <h2 className="text-xl font-bold text-gray-800">Client : {data.name} {data.surname}</h2>
                    <p className="text-gray-600">Email : {data.email}</p>
                    {data.company && <p className="text-gray-600">Entreprise : {data.company}</p>}
                </>
            )}
        </div>
    );
}