"use client";

import { useEffect, JSX } from "react";
import LinkItemEditable from "./LinkItemEditable";
import { useApi } from "@/hooks/useApi";
import { useSkeletonLoader } from "@/hooks/useSkeletonLoader";

interface LinkData {
  id: string;
  name: string;
  url: string;
  projectId: string;
}

interface LinksListProps {
  idProject: string;
}

export default function LinksList({ idProject }: LinksListProps): JSX.Element {
  const { data, loading, isSuccess, isError, request: getLinks } = useApi<LinkData[]>();
  const skeletonLoader = useSkeletonLoader("50px", "60%");

  useEffect(() => {
    getLinks(`/api/projects/${idProject}/links`, "GET");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-xl font-bold mb-2 text-gray-800">Liste des liens</h3>
        {loading && skeletonLoader()}
        {!loading && isError && <p className="text-gray-800">Erreur lors du chargement des liens</p>}
        {!loading && isSuccess && data && data.length === 0 && (
          <p className="text-gray-800">Aucun lien pour le moment.</p>
        )}
        {!loading && isSuccess && data && data.length > 0 && (
          <ul className="space-y-1">
            {data.map((l) => (
              <LinkItemEditable link={l} key={l.id} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
