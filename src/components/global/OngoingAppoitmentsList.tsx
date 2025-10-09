"use client";

import { JSX, useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import AppointmentItem from "../appointments/AppointmentItem";
import LoadingData from "./LoadingData";

interface AppointmentData {
  id: string;
  title: string;
  date: Date;
  projectId: string;
}

interface OngoingAppointmentListProps {
  idProject: string;
}

export default function OngoingAppointmentList({ idProject }: OngoingAppointmentListProps): JSX.Element {
    const { data, loading, isSuccess, isError, request: getAppointments } = useApi<AppointmentData[]>();
    const [appointmentsList, setAppointmentsList] = useState<AppointmentData[]>([]);

    useEffect(() => {
        getAppointments(`/api/${idProject ? `projects/${idProject}/` : ""}appointments?currentWeek=true`, "GET");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idProject]);

    useEffect(() => {
      if (data) {
        setAppointmentsList(data);
      }
    }, [data]);

    return (
        <div className="space-y-6">
            <LoadingData loading={loading} isSuccess={isSuccess} isError={isError} data={data} 
                errorMessage="Erreur lors du chargement des rendez-vous."
                noDataMessage="Aucun rendez-vous." 
                showSkeletonLoader={true} />
            <ul className="space-y-1">
                {appointmentsList.map((app) => (
                    <AppointmentItem key={app.id} appointment={app} />
                ))}
            </ul>
        </div>
    )
}