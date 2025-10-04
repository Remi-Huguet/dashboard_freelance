"use client";

import { JSX } from "react";
import AppointmentForm from "@/components/appointments/AppointmentForm";
import AppointmentsListEditable from "@/components/appointments/AppointmentsListEditable";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

interface AppointmentsProps {
  params: { id: string };
}

export default function Appointments({ params }: AppointmentsProps): JSX.Element {
  return (
    <div className="h-full bg-gray-100 p-8">
        <div className="mt-8 p-6 flex flex-col gap-6">
            <button
                onClick={() => window.location.href = `/projects/${params.id}`}
                className="self-start bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition align-center flex items-center gap-2"
            >
                <NavigateBeforeIcon /> Retour au projet
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Rendez-vous</h1>
            <AppointmentForm idProject={params.id} />
            <AppointmentsListEditable idProject={params.id} />
        </div>
    </div>
  );
}
