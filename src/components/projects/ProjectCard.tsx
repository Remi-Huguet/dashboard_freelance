import { useState, useEffect, FormEvent, JSX } from "react";

interface ProjectData {
    id: string;
    name: string;
    status: string;
    clientId: string;
}

interface ProjectCardProps {
  project: ProjectData;
}

export default function ProjectCard({ project }: ProjectCardProps): JSX.Element {
    const [client, setClient] = useState(undefined);

    useEffect(() => {
        const fetchClient = async () => {
            const res = await fetch("/api/clients/" + project.clientId);
            const data = await res.json();
            setClient(data);
        };

        fetchClient();
    }, [project.clientId]);

    return (
        <div>
            <li className="border-b py-1 text-gray-800">
                {project.name} - {project.status} - {client ? `${client.name} ${client.surname}` : "Loading..."}
                <button
                    onClick={() => window.location.href = `/projects/${project.id}`}
                    className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                    Voir
                </button>
            </li>
        </div>
    )
}