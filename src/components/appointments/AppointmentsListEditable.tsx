"use client";

import { useEffect, JSX, useState } from "react";
import AppointmentItemEditable from "./AppointmentItemEditable";
import { useApi } from "@/hooks/useApi";
import LoadingData from "../global/LoadingData";

interface AppointmentData {
  id: string;
  title: string;
  date: Date;
  projectId: string;
}

interface AppointmentsListEditableProps {
  idProject: string;
}

export default function AppointmentsListEditable({ idProject }: AppointmentsListEditableProps): JSX.Element {
  const { data, loading, isSuccess, isError, request: getAppointments } = useApi<AppointmentData[]>();
  const [appointmentsList, setAppointmentsList] = useState<AppointmentData[]>([]);
  const [appointmentsListFiltered, setAppointmentsListFiltered] = useState<AppointmentData[]>([]);
  const [filterValue, setFilterValue] = useState("À venir");

  useEffect(() => {
    getAppointments(`/api/projects/${idProject}/appointments`, "GET");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      setAppointmentsList(data);
    }
  }, [data]);

  useEffect(() => {
    switch (filterValue) {
        case "À venir":
          setAppointmentsListFiltered(appointmentsList.filter((appointment) => 
            new Date(appointment.date) >= new Date()
          ))
          return;
        case "Passés":
          setAppointmentsListFiltered(appointmentsList.filter((appointment) => 
            new Date(appointment.date) <= new Date()
          ))
          return;
        case "Tous":
          setAppointmentsListFiltered(appointmentsList)
          return;
        default:
          return;
    }
  }, [appointmentsList, filterValue]);

  return (
    <div className="bg-white p-4 rounded shadow-md flex flex-col gap-4">
      <h3 className="text-xl font-bold text-gray-800">Liste des rendez-vous</h3>
      <div className="flex flex-row gap-2">
        <select
            id="filter-appointments-by-date-select"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="p-2 border rounded text-gray-600 w-1/4"
        >
            <option id="filter-appointments-date-tous-option" value="Tous">Tous les rendez-vous</option>
            <option id="filter-appointments-date-passes-option" value="Passés">Rendez-vous passés</option>
            <option id="filter-appointments-date-a-venir-option" value="À venir">Rendez-vous à venir</option>
        </select>
      </div>
      <div className="flex flex-row">
        <p className="text-gray-800 w-1/5 font-bold">Titre</p>
        <p className="text-gray-800 w-1/5 font-bold">Date</p>
      </div>
      <LoadingData loading={loading} isSuccess={isSuccess} isError={isError} data={data} 
        errorMessage="Erreur lors du chargement des rendez-vous."
        noDataMessage="Pas de rendez-vous." 
        showSkeletonLoader={true} />
      <ul className="flex flex-col gap-2">
        {appointmentsListFiltered.map((a) => (
            <AppointmentItemEditable key={a.id} appointment={a} />
        ))}
      </ul>
    </div>
  );
}
