"use client";

import { JSX } from "react";
import { beautifulDateTime } from "@/utils/dateUtils";
import EventIcon from "@mui/icons-material/Event"; // Icône calendrier

interface AppointmentData {
  title: string;
  date: Date;
}

interface AppointmentItemProps {
  appointment: AppointmentData;
}

export default function AppointmentItem({ appointment }: AppointmentItemProps): JSX.Element {
  return (
    <div className="flex items-center justify-between bg-white shadow-sm rounded-lg p-3 border border-gray-200">
      <div className="flex items-center gap-3">
        <EventIcon className="text-gray-800 w-5 h-5" />
        <span className="font-medium text-gray-800">{appointment.title}</span>
      </div>
      <span className="text-gray-600 text-sm">
        {beautifulDateTime(new Date(appointment.date))}
      </span>
    </div>
  );
}
