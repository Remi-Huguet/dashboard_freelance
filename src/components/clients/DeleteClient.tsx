"use client";

import { JSX } from "react";
import { useApi } from "@/hooks/useApi";
import ConfirmationModal from "../global/ConfirmationModal";

interface DeleteClientProps {
  clientId: string;
}

export default function DeleteClient({ clientId }: DeleteClientProps): JSX.Element {
    const { request: deleteClient } = useApi<undefined>();

    const handleDeleteClient = async () => {
        deleteClient(`/api/clients/${clientId}`, "DELETE", "Client supprimé avec succès", () => window.location.reload());
    }

    return (
        <ConfirmationModal
            name="Supprimer"
            color="red"
            title="Confirmer la suppression du client"
            confirmText="Supprimer"
            cancelText="Annuler"
            onConfirm={handleDeleteClient}
            onCancel={() => {}}
        />
    )
}
