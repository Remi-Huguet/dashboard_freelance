"use appointment";

import { useState, FormEvent, JSX } from "react";
import DeleteAppointment from "./DeleteAppointment";
import { useApi } from "@/hooks/useApi";
import EditIcon from '@mui/icons-material/Edit';
import { beautifulDateTime } from "@/utils/dateUtils";

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
        <li>
            {editMode ? (
                <form
                    onSubmit={(e: FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                        putAppointment(`/api/appointments/${appointment.id}`, "PUT", form, () => window.location.reload(), "Rendez-vous modifié avec succès");
                    }}
                    className="w-full flex flex-row items-center"
                >
                    <div className="w-1/5">
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="p-2 border rounded text-gray-600 w-9/10"
                            placeholder="Titre"
                            required
                        />
                    </div>
                    <div className="w-1/5">
                        <input
                            type="datetime-local"
                            value={form.date.toISOString().slice(0, 16)}
                            onChange={(e) =>
                              setForm({ ...form, date: new Date(e.target.value) })
                            }
                            className="p-2 border rounded text-gray-600 w-9/10"
                            required
                        />
                    </div>
                    <div className="flex gap-2 ml-auto">
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
                <div className="w-full flex flex-row items-center">
                    <p className="text-gray-800 w-1/5">{appointment.title}</p>
                    <p className="text-gray-800 w-1/5">{beautifulDateTime(new Date(appointment.date))}</p>
                    <div className="flex flex-row gap-2 ml-auto">
                        <button
                            onClick={() => setEditMode(true)}
                            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                        >
                            <EditIcon />
                        </button>
                        <DeleteAppointment appointmentId={appointment.id} />
                    </div>
                </div>
            )}
        </li>
    )
}