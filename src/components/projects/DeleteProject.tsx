"use client";

import { JSX } from "react";
import { useApi } from "@/hooks/useApi";
import ConfirmationModal from "../global/ConfirmationModal";

interface DeleteProjectProps {
  projectId: string;
}

export default function DeleteProject({ projectId }: DeleteProjectProps): JSX.Element {
    const { request: deleteProject } = useApi<undefined>();

    const handleDeleteProject = async () => {
        deleteProject(`/api/projects/${projectId}`, "DELETE", "Projet supprimé avec succès", () => window.location.href = `/projects`);
    }

    return (
        <ConfirmationModal
            name="Supprimer"
            color="red"
            title="Confirmer la suppression du projet"
            confirmText="Supprimer"
            cancelText="Annuler"
            onConfirm={handleDeleteProject}
            onCancel={() => {}}
        />
    )
}
