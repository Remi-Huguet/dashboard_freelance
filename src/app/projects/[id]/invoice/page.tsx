"use client";

import { JSX, use, useEffect } from "react";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useApi } from "@/hooks/useApi";
import LoadingData from "@/components/global/LoadingData";
import InvoiceForm from "@/components/invoice/InvoiceForm";
import InvoiceItemEditable from "@/components/invoice/InvoiceItemEditable";

interface InvoiceData {
  id: string;
  dateStart: Date;
  dateEnd: Date;
  pricingValue: number;
  pricingType: string;
  projectId: string;
}

interface InvoiceProps {
  params: Promise<{ id: string }>;
}

export default function Invoice({ params }: InvoiceProps): JSX.Element {
  const { id } = use(params);
  const { data, loading, isSuccess, isError, request: getInvoice } = useApi<InvoiceData>();

  useEffect(() => {
      getInvoice(`/api/projects/${id}/invoice`, "GET");
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="h-full bg-gray-100 p-8">
        <div className="mt-8 p-6 flex flex-col gap-4">
            <button
                onClick={() => window.location.href = `/projects/${id}`}
                className="self-start bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition align-center flex items-center gap-2"
            >
                <NavigateBeforeIcon /> Retour au projet
            </button>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2 mt-2 mb-2"><ReceiptIcon fontSize="large" />Facturation</h1>
            <LoadingData loading={loading} isSuccess={isSuccess} isError={isError} data={data} 
              errorMessage="Erreur lors du chargement de la facture."
              noDataMessage="" 
              showSkeletonLoader={true} />
            {!loading && isSuccess && data && 
              <InvoiceItemEditable invoice={data} />
            }
            {!loading && isSuccess && !data && 
              <InvoiceForm idProject={id} />
            }
        </div>
    </div>
  );
}
