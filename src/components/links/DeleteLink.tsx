"use client";

import { JSX } from "react";
import { useApi } from "@/hooks/useApi";
import ConfirmationModal from "../global/ConfirmationModal";

interface DeleteLinkProps {
  linkId: string;
}

export default function DeleteLink({ linkId }: DeleteLinkProps): JSX.Element {
    const { request: deleteLink } = useApi<undefined>();

    const handleDeleteLink = async () => {
        deleteLink(`/api/links/${linkId}`, "DELETE", "Lien supprimé avec succès", () => window.location.reload());
    }

    return (
        <ConfirmationModal
            name="Supprimer"
            color="red"
            title="Confirmer la suppression du lien"
            confirmText="Supprimer"
            cancelText="Annuler"
            onConfirm={handleDeleteLink}
            onCancel={() => {}}
        />
    )
}
