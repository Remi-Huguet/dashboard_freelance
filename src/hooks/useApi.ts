"use client";

import { useState } from "react";
import { useNotification, NotificationType } from "@/hooks/useNotification";

interface ApiState<T> {
    data?: T;
    isSuccess: boolean;
    isError: boolean;
    loading: boolean;
    error?: string;
}

interface ApiError {
  error: string;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export function useApi<T = unknown>() {
    const [state, setState] = useState<ApiState<T>>({
        isSuccess: false,
        isError: false,
        loading: false,
    });
    const notify = useNotification();

    async function request(
        url: string,
        method: HttpMethod = "GET",
        body?: unknown,
        afterFetch?: () => void,
        successMessage?: string
    ): Promise<ApiState<T>> {
        setState({ isSuccess: false, isError: false, loading: true });

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: body ? JSON.stringify(body) : undefined,
            });

            const data = (await res.json()) as T | ApiError;

            if (!res.ok) {
                const errorMessage = (data as ApiError).error || "Une erreur est survenue";
                const newState: ApiState<T> = {
                    isSuccess: false,
                    isError: true,
                    loading: false,
                    error: errorMessage,
                };
                setState(newState);
                notify(errorMessage, NotificationType.ERROR);
                return newState;
            }

            const newState: ApiState<T> = {
                data: data as T,
                isSuccess: true,
                isError: false,
                loading: false,
            };
            setState(newState);
            if (successMessage) {
                notify(successMessage, NotificationType.SUCCESS);
            }
            if (afterFetch) {
                afterFetch();
            }
            return newState;
        } catch (err) {
            const newState: ApiState<T> = {
                isSuccess: false,
                isError: true,
                loading: false,
                error: (err instanceof Error) ? err.message : "Une erreur est survenue",
            };
            setState(newState);
            notify((err instanceof Error) ? err.message : "Une erreur est survenue", NotificationType.ERROR);
            return newState;
        }
    }
    return { ...state, request};
}
