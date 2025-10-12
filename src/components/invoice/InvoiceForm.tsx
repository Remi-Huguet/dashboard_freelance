"use client";

import { useState, FormEvent, JSX } from "react";
import { useApi } from "@/hooks/useApi";
import AddIcon from '@mui/icons-material/Add';
import { pricingTypes } from "@/utils/utils";

interface InvoiceFormData {
  dateStart: Date;
  dateEnd?: Date;
  pricingValue: number;
  pricingType: string;
  projectId: string;
}

interface InvoiceFormProps {
  idProject: string;
}

export default function InvoiceForm({ idProject }: InvoiceFormProps): JSX.Element {
  const [form, setForm] = useState<InvoiceFormData>({
    dateStart: new Date(),
    dateEnd: undefined,
    pricingValue: 0,
    pricingType: "",
    projectId: idProject,
  });

  const [openForm, setOpenForm] = useState(false);
  const { request: postInvoice } = useApi<undefined>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    postInvoice("/api/invoices", "POST", form, () => window.location.reload(), "Facture créé avec succès");
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-4 rounded shadow-md"
      >
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-bold text-gray-800">Ajouter une facture</h3>
          {!openForm &&
            <button
              id="create-invoice-form-button"
              type="button"
              onClick={() => setOpenForm(true)}
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
              <AddIcon />
            </button>
          }
        </div>
        {openForm && (
          <>
            <div className="w-full flex flex-col gap-1">
              <p className="text-gray-800">Date de début *</p>
              <input
                id="create-invoice-date-start-input"
                type="datetime-local"
                value={form.dateStart.toISOString().slice(0, 16)}
                onChange={(e) =>
                  setForm({ ...form, dateStart: new Date(e.target.value) })
                }
                className="w-full p-2 border rounded text-gray-800"
                required
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <p className="text-gray-800">Date de fin</p>
              <input
                id="create-invoice-date-end-input"
                type="datetime-local"
                value={form.dateEnd ? form.dateEnd.toISOString().slice(0, 16) : "Non défini"}
                onChange={(e) =>
                  setForm({ ...form, dateEnd: new Date(e.target.value) })
                }
                className="w-full p-2 border rounded text-gray-800"
              />
            </div>
            <div className="w-full flex flex-col gap-1">
                <p className="text-gray-800">Tarif</p>
                <div className="w-full flex flex-row gap-2">
                    <input
                        id="create-invoice-princing-value-input"
                        type="number"
                        placeholder="Tarif"
                        value={form.pricingValue}
                        onChange={(e) =>
                          setForm({ ...form, pricingValue: parseFloat(e.target.value) || 0 })
                        }
                        className="w-full p-2 border rounded text-gray-800"
                        required
                    />
                    <select
                        id="create-invoice-princing-type-select"
                        value={form.pricingType}
                        onChange={(e) =>
                            setForm({ ...form, pricingType: e.target.value })
                        }
                        className="w-full p-2 border rounded text-gray-800"
                        required
                    >
                        <option id={`create-invoice-null-option`} value="" disabled>
                            Sélectionner un type de tarif *
                        </option>
                        {pricingTypes.map((princingType) => 
                            <option id={`create-invoice-${princingType}-option`} key={princingType} value={princingType}>{princingType}</option>)
                        }
                    </select>
                </div>
            </div>
            <div className="flex gap-2">
              <button
                id="create-invoice-submit-button"
                type="submit"
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
              >
                Créer
              </button>
              <button
                id="create-invoice-cancel-button"
                type="button"
                onClick={() => {
                  setForm({ dateStart: new Date(), dateEnd: new Date(), pricingValue: 0, pricingType: "", projectId: idProject });
                  setOpenForm(false);
                }}
                className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
              >
                Annuler
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
