"use client";

import { JSX } from "react";
import LinkIcon from "@mui/icons-material/Link"; // Icône MUI

interface LinkData {
  name: string;
  url: string;
}

interface LinkItemProps {
  link: LinkData;
}

export default function LinkItem({ link }: LinkItemProps): JSX.Element {
  return (
    <div className="flex items-center justify-between bg-white shadow-sm rounded-lg p-3 border border-gray-200">
      <div className="flex items-center gap-3">
        <LinkIcon className="text-gray-800 w-5 h-5" />
        <p className="font-medium text-gray-800">{link.name}</p>
      </div>
      <a
        id={`link-to-${link.url}`}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 font-medium hover:underline break-all"
      >
        {link.url}
      </a>
    </div>
  );
}
