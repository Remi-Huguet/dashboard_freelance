"use client";

import { JSX, useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import LinkItem from "../links/LinkItem";
import LoadingData from "../global/LoadingData";

interface LinkData {
  id: string;
  name: string;
  url: string;
  projectId: string;
}

interface ProjectLinksProps {
  idProject: string;
}

export default function ProjectLinks({ idProject }: ProjectLinksProps): JSX.Element {
    const { data, loading, isSuccess, isError, request: getLinks } = useApi<LinkData[]>();
    const [linksList, setLinksList] = useState<LinkData[]>([]);

    useEffect(() => {
        getLinks(`/api/projects/${idProject}/links`, "GET");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idProject]);

    useEffect(() => {
      if (data) {
        setLinksList(data);
      }
    }, [data]);

    return (
        <>
            <LoadingData loading={loading} isSuccess={isSuccess} isError={isError} data={data} 
                errorMessage="Erreur lors du chargement des liens."
                noDataMessage="Pas de liens." 
                showSkeletonLoader={true} />
            <ul className="flex flex-col gap-2">
                {linksList.map((link) => (
                    <LinkItem key={link.id} link={link} />
                ))}
            </ul>
        </>
    )
}