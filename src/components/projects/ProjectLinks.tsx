"use client";

import { JSX, useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import { useSkeletonLoader } from "@/hooks/useSkeletonLoader";
import LinkItem from "../links/LinkItem";

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
    const skeletonLoader = useSkeletonLoader("100px", "70%");

    useEffect(() => {
        getLinks(`/api/projects/${idProject}/links`, "GET");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idProject]);

    return (
        <>
            {loading && skeletonLoader()}
            {!loading && isError && <p className="text-gray-800">Erreur lors du chargement des liens</p>}
            {!loading && isSuccess && data && data.length > 0 &&
                <>
                    {data.map((link) => (
                        <LinkItem key={link.id} link={link} />
                    ))}
                </>
            }
            {!loading && isSuccess && data && data.length === 0 &&
                <p className="text-gray-800">Aucun lien associé.</p>
            }
        </>
    )
}