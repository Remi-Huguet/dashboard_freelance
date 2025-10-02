"use appointment";

import { useState, FormEvent, JSX } from "react";
import DeleteAppointment from "./DeleteAppointment";
import { useApi } from "@/hooks/useApi";
import EditIcon from '@mui/icons-material/Edit';

interface AppointmentData {
    id: string;
    title: string;
    date: Date;
    projectId: string;
}

interface AppointmentItemEditableProps {
  appointment: AppointmentData;
}

export default function AppointmentItemEditable({ appointment }: AppointmentItemEditableProps): JSX.Element {
    const [form, setForm] = useState<AppointmentData>({
        id: appointment.id,
        title: appointment.title,
        date: new Date(appointment.date),
        projectId: appointment.projectId
    });
    const [editMode, setEditMode] = useState(false);
    const { request: putAppointment } = useApi<undefined>();

    return (
        <div>
            <li className="border-b py-1 text-gray-800 flex flex-row gap-2 items-center">
                {editMode ? (
                    <form
                        onSubmit={(e: FormEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            putAppointment(`/api/appointments/${appointment.id}`, "PUT", form, () => window.location.reload(), "Rendez-vous modifié avec succès");
                        }}
                        className="space-y-2"
                    >
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full p-2 border rounded text-gray-800"
                            placeholder="Titre"
                            required
                        />
                        <input
                            type="datetime-local"
                            value={form.date.toISOString().slice(0, 16)}
                            onChange={(e) =>
                              setForm({ ...form, date: new Date(e.target.value) })
                            }
                            className="w-full p-2 border rounded text-gray-800"
                            required
                        />
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                            >
                                Modifier
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditMode(false)}
                                className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                            >
                                Annuler
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        {appointment.title} {appointment.date}
                        <button
                            onClick={() => setEditMode(true)}
                            className="ml-4 bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                        >
                            <EditIcon />
                        </button>
                        <DeleteAppointment appointmentId={appointment.id} />
                    </>
                )}
            </li>
        </div>
    )
}