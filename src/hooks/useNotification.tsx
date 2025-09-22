"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export enum NotificationType {
    INFO = "blue",
    SUCCESS = "green",
    WARNING = "orange",
    ERROR = "red",
}

type NotificationContextType = {
  notify: (message: string, type: NotificationType) => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<NotificationType | null>(null);

  const notify = (msg: string, type: NotificationType) => {
    setMessage(msg);
    setType(type);
    setTimeout(() => setMessage(null), 4000);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {message && (
        <div className={`fixed top-4 right-4 p-4 rounded shadow-lg bg-${type}-500 text-white`}>
          {message}
        </div>
      )}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotification must be used inside NotificationProvider");
  return ctx.notify;
}
