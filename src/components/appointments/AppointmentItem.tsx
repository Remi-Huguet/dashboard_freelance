"use client"

import { JSX } from "react";
import { beautifulDateTime } from "@/utils/dateUtils";

interface AppointmentData {
    title: string;
    date: Date;
}

interface AppointmentItemProps {
  appointment: AppointmentData;
}

export default function LinkItem({ appointment }: AppointmentItemProps): JSX.Element {
  return (
    <div className="p-1 px-0 flex flex-row gap-2 mb-4">
        <p className="text-gray-800 mb-2">{appointment.title} : {beautifulDateTime(new Date(appointment.date))}</p>
    </div>
  )
}