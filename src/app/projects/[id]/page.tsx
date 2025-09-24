import { JSX } from "react";

export default function Project({ params }: { params: { id: string } }): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mt-8 p-6 flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-gray-800">Projet {params.id}</h1>
        <p>Détails du projet à venir...</p>
      </div>
    </div>
  );
}
