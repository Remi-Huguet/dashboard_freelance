"Use client";

import { JSX, useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import LoadingData from "../global/LoadingData";
import PersonIcon from '@mui/icons-material/Person';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useNotification, NotificationType } from "@/hooks/useNotification";

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
    const notify = useNotification();

    useEffect(() => {
        getClient(`/api/clients/${clientId}`, "GET");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clientId]);

    const handleCopy = async () => {
        if (!loading && isSuccess && data) {
            try {
                await navigator.clipboard.writeText(data.email);
                notify(`${data.email} copié dans le presse-papier.`, NotificationType.INFO);
            } catch (err) {
                notify(err as string, NotificationType.ERROR);
            }
        }
    }

    return (
        <div className="p-4 border rounded bg-white shadow flex flex-col gap-2 w-full">
            <LoadingData loading={loading} isSuccess={isSuccess} isError={isError} data={data} 
                errorMessage="Erreur lors du chargement du client."
                noDataMessage="Pas de client." 
                showSkeletonLoader={true} />
            {!loading && isSuccess && data && (
                <>
                    <h2 className="text-xl font-bold text-gray-800 flex flex-row gap-2 items-center"><PersonIcon />Client : {data.name} {data.surname}</h2>
                    <div className="flex flex-row gap-2 items-center">
                        <p className="text-gray-600">Email : {data.email}</p>
                        <button
                            onClick={handleCopy}
                            className="text-gray-600 hover:text-gray-500">
                            <ContentCopyIcon />
                        </button>
                    </div>
                    {data.company && <p className="text-gray-600">Entreprise : {data.company}</p>}
                </>
            )}
        </div>
    );
}