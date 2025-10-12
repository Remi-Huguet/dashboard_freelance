export const invoice = {
    "id": "1",
    "dateStart": new Date(Date.now() + 60000).toISOString(),
    "dateEnd": new Date(Date.now() + 60000).toISOString(),
    "pricingValue": 350,
    "pricingType": "Par jour",
    "projectId": "1",
}

export const newInvoice = {
    "dateStart": new Date(Date.now() + 60000).toISOString(),
    "dateEnd": undefined,
    "pricingValue": 450,
    "pricingType": "Par jour",
    "projectId": "1",
}

export const updatedInvoice = {
    "id": "1",
    "dateStart": new Date(Date.now() + 60000).toISOString(),
    "dateEnd": new Date(Date.now() + 60000).toISOString(),
    "pricingValue": 5000,
    "pricingType": "Pour la mission",
    "projectId": "1",
}