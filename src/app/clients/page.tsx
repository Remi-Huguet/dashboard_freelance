import ClientForm from "@/components/clients/ClientForm";
import ClientsListEditable from "@/components/clients/ClientsListEditable";
import { JSX } from "react";

export default function Clients(): JSX.Element {
  return (
    <div className="h-full bg-gray-100 p-8">
      <div className="mt-8 p-6 flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-gray-800">Clients</h1>
        <ClientForm />
        <ClientsListEditable />
      </div>
    </div>
  );
}
