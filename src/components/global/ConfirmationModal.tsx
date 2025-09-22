"use client";

import { JSX, useState } from "react";

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

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className={`ml-2 bg-${color}-500 text-white px-2 py-1 rounded hover:bg-${color}-600`}
            >
                {name}
            </button>
            {isOpen &&
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96 space-y-4 text-center">
                        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                onClick={() => {onCancel(); setIsOpen(false);}}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                            >
                                {cancelText}
                            </button>
                            <button
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