"use client";

import { useEffect, JSX, useState } from "react";
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
  const [linksList, setLinksList] = useState<LinkData[]>([]);
  const [linksListFiltered, setLinksListFiltered] = useState<LinkData[]>([]);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    getLinks(`/api/projects/${idProject}/links`, "GET");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      setLinksList(data);
    }
  }, [data]);

  useEffect(() => {
    setLinksListFiltered(linksList.filter((link) => 
      link.name.includes(filterValue)
    ))
  }, [linksList, filterValue]);

  return (
    <div className="bg-white p-4 rounded shadow-md flex flex-col gap-4">
      <h3 className="text-xl font-bold text-gray-800">Liste des liens</h3>
      <div className="flex flex-row gap-2">
        <input
          id="filter-links-by-name-input"
          type="text"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="p-2 border rounded text-gray-600 w-1/4"
          placeholder="Filtrer par nom"
        />
      </div>
      <div className="flex flex-row">
        <p className="text-gray-800 w-1/5 font-bold">Nom</p>
        <p className="text-gray-800 w-1/5 font-bold">Lien</p>
      </div>
      <LoadingData loading={loading} isSuccess={isSuccess} isError={isError} data={data} 
        errorMessage="Erreur lors du chargement des liens."
        noDataMessage="Pas de liens." 
        showSkeletonLoader={true} />
      <ul className="flex flex-col gap-2">
        {linksListFiltered.map((l) => (
          <LinkItemEditable link={l} key={l.id} />
        ))}
      </ul>
    </div>
  );
}
