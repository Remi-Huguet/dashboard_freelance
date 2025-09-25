"use client";

import { JSX } from "react";

interface BadgeProps {
    title: string;
    content: string;
}

export default function Badge({ title, content }: BadgeProps): JSX.Element {
    return (
        <div className="bg-gray-200 rounded-full px-4 py-2 text-gray-800 text-sm font-medium">
            <span className="font-bold ">{title}</span> : <span>{content}</span>
        </div>
    );
}
