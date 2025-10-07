interface Invoice {
    dateStart: Date, 
    dateEnd: Date, 
    pricingValue: number, 
    pricingType: string | null, 
    projectId: string
}

export const invoiceWithDatesToIso = (invoice: Invoice) => {
    return {
        ...invoice,
        dateStart: invoice.dateStart.toISOString(),
        dateEnd: invoice.dateEnd?.toISOString(),
    }
}