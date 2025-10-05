"use client";

import { useEffect, JSX } from "react";
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

  useEffect(() => {
    getAppointments(`/api/projects/${idProject}/appointments`, "GET");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-md flex flex-col gap-2">
      <h3 className="text-xl font-bold text-gray-800 mb-2">Liste des rendez-vous</h3>
      <div className="flex flex-row">
        <p className="text-gray-800 w-1/5 font-bold">Titre</p>
        <p className="text-gray-800 w-1/5 font-bold">Date</p>
      </div>
      <LoadingData loading={loading} isSuccess={isSuccess} isError={isError} data={data} 
        errorMessage="Erreur lors du chargement des rendez-vous."
        noDataMessage="Pas de rendez-vous." 
        showSkeletonLoader={true} />
      {!loading && isSuccess && data && data.length > 0 &&
        <ul className="flex flex-col gap-2">
          {data.map((a) => (
              <AppointmentItemEditable key={a} appointment={a} />
          ))}
        </ul>
      }
    </div>
  );
}
