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

interface Appointment {
    title: string | null,
    date: Date,
    projectId: string
}

export const appointmentWIthDateToIso = (appointment: Appointment) => {
    return {
        ...appointment,
        date: appointment.date.toISOString()
    }
}