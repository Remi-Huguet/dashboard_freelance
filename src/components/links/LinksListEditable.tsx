"use client";

import { useEffect, JSX } from "react";
import LinkItemEditable from "./LinkItemEditable";
import { useApi } from "@/hooks/useApi";
import LoadingData from "../global/LoadingData";

interface LinkData {
  id: string;
  name: string;
  url: string;
  projectId: string;
}

interface LinksListEditableProps {
  idProject: string;
}

export default function LinksListEditable({ idProject }: LinksListEditableProps): JSX.Element {
  const { data, loading, isSuccess, isError, request: getLinks } = useApi<LinkData[]>();

  useEffect(() => {
    getLinks(`/api/projects/${idProject}/links`, "GET");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-md flex flex-col gap-2">
      <h3 className="text-xl font-bold text-gray-800 mb-2">Liste des liens</h3>
      <div className="flex flex-row">
        <p className="text-gray-800 w-1/5 font-bold">Nom</p>
        <p className="text-gray-800 w-1/5 font-bold">Lien</p>
      </div>
      <LoadingData loading={loading} isSuccess={isSuccess} isError={isError} data={data} 
        errorMessage="Erreur lors du chargement des liens."
        noDataMessage="Pas de liens." 
        showSkeletonLoader={true} />
      {!loading && isSuccess && data && data.length > 0 && (
        <ul className="flex flex-col gap-2">
          {data.map((l) => (
            <LinkItemEditable link={l} key={l.id} />
          ))}
        </ul>
      )}
    </div>
  );
}
