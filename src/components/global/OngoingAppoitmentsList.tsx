"use client";

import { JSX, useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import { useSkeletonLoader } from "@/hooks/useSkeletonLoader";
import AppointmentItem from "../appointments/AppointmentItem";

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
    const skeletonLoader = useSkeletonLoader("100px", "70%");

    useEffect(() => {
        getAppointments(`/api/${idProject ? `projects/${idProject}` : ""}/appointments?currentWeek=true`, "GET");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idProject]);

    return (
        <>
            {loading && skeletonLoader()}
            {!loading && isError && <p className="text-gray-800">Erreur lors du chargement des rendez-vous</p>}
            {!loading && isSuccess && data && data.length > 0 &&
                <>
                    {data.map((app) => (
                        <AppointmentItem key={app.id} appointment={app} />
                    ))}
                </>
            }
            {!loading && isSuccess && data && data.length === 0 &&
                <p className="text-gray-800">Aucun rendez-vous associé.</p>
            }
        </>
    )
}