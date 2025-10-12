"use client";

import { JSX, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';

interface ConfirmationModalProps {
    name: string;
    color?: string;
    title?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmationModal({
    name,
    color = "blue",
    title = "Confirmation",
    confirmText = "Confirmer",
    cancelText = "Annuler",
    onConfirm,
    onCancel,
}: ConfirmationModalProps): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);

    const getConfirmationIndicator = () => {
        switch (name) {
            case "Supprimer":
                return <DeleteIcon />;
            case "Déconnexion":
                return <LogoutIcon />;
            default:
                return <>{name}</>;
        }
    }

    return (
        <>
            <button
                id={`${name}-button`}
                onClick={() => setIsOpen(true)}
                className={`bg-${color}-500 text-white px-2 py-1 rounded hover:bg-${color}-600`}
            >
                {getConfirmationIndicator()}
            </button>
            {isOpen &&
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96 space-y-4 text-center">
                        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                id={`${name}-cancel-button`}
                                onClick={() => {onCancel(); setIsOpen(false);}}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                            >
                                {cancelText}
                            </button>
                            <button
                                id={`${name}-confirm-button`}
                                onClick={() => {onConfirm(); setIsOpen(false);}}
                                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                            >
                                {confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}