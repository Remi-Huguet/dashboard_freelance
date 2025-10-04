"use client";

import { JSX } from "react";
import { useApi } from "@/hooks/useApi";
import ConfirmationModal from "../global/ConfirmationModal";

interface DeleteTaskProps {
  taskId: string;
}

export default function DeleteTask({ taskId }: DeleteTaskProps): JSX.Element {
    const { request: deleteTask } = useApi<undefined>();

    const handleDeleteTask = async () => {
        deleteTask(`/api/tasks/${taskId}`, "DELETE", "Tâche supprimée avec succès", () => window.location.reload());
    }

    return (
        <ConfirmationModal
            name="Supprimer"
            color="red"
            title="Confirmer la suppression de la tâche"
            confirmText="Supprimer"
            cancelText="Annuler"
            onConfirm={handleDeleteTask}
            onCancel={() => {}}
        />
    )
}
