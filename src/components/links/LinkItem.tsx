"use client"

import { JSX } from "react";

interface LinkData {
    name: string;
    url: string;
}

interface LinkItemProps {
  link: LinkData;
}

export default function LinkItem({ link }: LinkItemProps): JSX.Element {
  return (
    <div className="p-1 px-0 flex flex-row gap-2 mb-4">
        <p className="text-gray-800 mb-2">{link.name} :</p>
        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline break-all">
            {link.url}
        </a>
    </div>
  )
}