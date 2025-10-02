"use appointment";

import { JSX } from "react";
import { useApi } from "@/hooks/useApi";
import ConfirmationModal from "../global/ConfirmationModal";

interface DeleteAppointmentProps {
  appointmentId: string;
}

export default function DeleteAppointment({ appointmentId }: DeleteAppointmentProps): JSX.Element {
    const { request: deleteAppointment } = useApi<undefined>();

    const handleDeleteAppointment = async () => {
        deleteAppointment(`/api/appointments/${appointmentId}`, "DELETE", "Rendez-vous supprimé avec succès", () => window.location.reload());
    }

    return (
        <ConfirmationModal
            name="Supprimer"
            color="red"
            title="Confirmer la suppression du rendez-vous"
            confirmText="Supprimer"
            cancelText="Annuler"
            onConfirm={handleDeleteAppointment}
            onCancel={() => {}}
        />
    )
}
