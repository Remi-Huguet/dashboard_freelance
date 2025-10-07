"use client";

import { useState, FormEvent, JSX } from "react";
import { useApi } from "@/hooks/useApi";
import EditIcon from '@mui/icons-material/Edit';
import { pricingTypes } from "@/utils/utils";
import { beautifulDateTime } from "@/utils/dateUtils";

interface InvoiceData {
  id: string;
  dateStart: Date;
  dateEnd?: Date;
  pricingValue: number;
  pricingType: string;
  projectId: string;
}

interface InvoiceItemEditableProps {
  invoice: InvoiceData;
}

export default function InvoiceItemEditable({ invoice }: InvoiceItemEditableProps): JSX.Element {
    const [form, setForm] = useState<InvoiceData>({
        id: invoice.id,
        dateStart: invoice.dateStart,
        dateEnd: invoice.dateEnd,
        pricingValue: invoice.pricingValue,
        pricingType: invoice.pricingType,
        projectId: invoice.projectId,
    });
    const [editMode, setEditMode] = useState(false);
    const { request: putInvoice } = useApi<undefined>();

    return (
        <div className="bg-white p-4 rounded shadow-md flex flex-col gap-4">
            <h3 className="text-xl font-bold text-gray-800">Données de facturation</h3>
            <div className="flex flex-row">
              <p className="text-gray-800 w-1/5 font-bold">Date de début</p>
              <p className="text-gray-800 w-1/5 font-bold">Date de fin</p>
              <p className="text-gray-800 w-1/5 font-bold">Tarif</p>
              <p className="text-gray-800 w-1/5 font-bold">Type de tarif</p>
            </div>
            <div>
                {editMode ? (
                    <form
                        onSubmit={(e: FormEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            putInvoice(`/api/invoices/${invoice.id}`, "PUT", form, () => window.location.reload(), "Facture modifié avec succès");
                        }}
                        className="w-full flex flex-row items-center"
                    >
                        <div className="w-1/5">
                            <input
                                type="datetime-local"
                                value={new Date(form.dateStart).toISOString().slice(0, 16)}
                                onChange={(e) =>
                                  setForm({ ...form, dateStart: new Date(e.target.value) })
                                }
                                className="p-2 border rounded text-gray-800 w-9/10"
                                required
                            />
                        </div>
                        <div className="w-1/5">
                            <input
                                type="datetime-local"
                                value={form.dateEnd ? new Date(form.dateEnd).toISOString().slice(0, 16) : "Non défini"}
                                onChange={(e) =>
                                  setForm({ ...form, dateEnd: new Date(e.target.value) })
                                }
                                className="p-2 border rounded text-gray-800 w-9/10"
                            />
                        </div>
                        <div className="w-1/5">
                            <input
                                type="number"
                                placeholder="Tarif"
                                value={form.pricingValue}
                                onChange={(e) =>
                                  setForm({ ...form, pricingValue: parseFloat(e.target.value) || 0 })
                                }
                                className="p-2 border rounded text-gray-800 w-9/10"
                                required
                            />
                        </div>
                        <div className="w-1/5">
                        <select
                            value={form.pricingType}
                            onChange={(e) =>
                                setForm({ ...form, pricingType: e.target.value })
                            }
                            className="p-2 border rounded text-gray-800 w-9/10"
                            required
                        >
                            <option value="" disabled>
                                Sélectionner un type de tarif *
                            </option>
                            {pricingTypes.map((princingType) => 
                                <option key={princingType} value={princingType}>{princingType}</option>)
                            }
                        </select>
                        </div>
                        <div className="flex gap-2 ml-auto">
                            <button type="submit" className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
                                Modifier
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditMode(false)}
                                className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                            >
                                Annuler
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="w-full flex flex-row items-center">
                        <p className="text-gray-800 w-1/5">{beautifulDateTime(new Date(invoice.dateStart))}</p>
                        <p className="text-gray-800 w-1/5">{invoice.dateEnd ? beautifulDateTime(new Date(invoice.dateEnd)) : "Non définit"}</p>
                        <p className="text-gray-800 w-1/5">{invoice.pricingValue}</p>
                        <p className="text-gray-800 w-1/5">{invoice.pricingType}</p>
                        <div className="flex flex-row gap-2 ml-auto">
                            <button
                                onClick={() => setEditMode(true)}
                                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                            >
                                <EditIcon />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}