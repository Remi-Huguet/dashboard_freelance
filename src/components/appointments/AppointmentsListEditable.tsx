"use client";

import { useEffect, JSX } from "react";
import AppointmentItemEditable from "./AppointmentItemEditable";
import { useApi } from "@/hooks/useApi";
import { useSkeletonLoader } from "@/hooks/useSkeletonLoader";

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
  const skeletonLoader = useSkeletonLoader("50px", "60%");

  useEffect(() => {
    getAppointments(`/api/projects/${idProject}/appointments`, "GET");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-xl font-bold mb-2 text-gray-800">Liste des rendez-vous</h3>
        {loading && skeletonLoader()}
        {!loading && isError && <p className="text-red-500">Erreur lors du chargement des rendez-vous.</p>}
        {!loading && isSuccess && data &&
          <>
            {data.length === 0 ? (
              <p className="text-gray-800">Aucun rendez-vous pour le moment.</p>
            ) : (
              <ul className="space-y-1">
                {data.map((a) => (
                    <AppointmentItemEditable key={a} appointment={a} />
                ))}
              </ul>
            )}
          </>
        }
      </div>
    </div>
  );
}
