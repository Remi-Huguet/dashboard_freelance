"use client";

import { JSX, use } from "react";
import AppointmentForm from "@/components/appointments/AppointmentForm";
import AppointmentsListEditable from "@/components/appointments/AppointmentsListEditable";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


interface AppointmentsProps {
  params: Promise<{ id: string }>;
}

export default function Appointments({ params }: AppointmentsProps): JSX.Element {
  const { id } = use(params);

  return (
    <div className="h-full bg-gray-100 p-8">
        <div className="mt-8 p-6 flex flex-col gap-4">
            <button
                onClick={() => window.location.href = `/projects/${id}`}
                className="self-start bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition align-center flex items-center gap-2"
            >
                <NavigateBeforeIcon /> Retour au projet
            </button>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2 mt-2 mb-2"><CalendarMonthIcon fontSize="large" />Rendez-vous</h1>
            <AppointmentForm idProject={id} />
            <AppointmentsListEditable idProject={id} />
        </div>
    </div>
  );
}
