export const jours = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
];

export const mois = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
];

export const beautifulDateTime = (date: Date) => {
    const dayName = jours[date.getDay()];
    const dayNumber = String(date.getDate());
    const monthName = mois[date.getMonth()];
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${dayName} ${dayNumber} ${monthName} à ${hours}:${minutes}`;
}

export const getWeekBoundsFromDate = (date: Date) => {
    const day = date.getDay();

    const diffToMonday = (day === 0 ? -6 : 1) - day;
    const start = new Date(date);
    start.setDate(date.getDate() + diffToMonday);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    const dayStartName = jours[start.getDay()];
    const dayStartNumber = String(start.getDate());
    const monthStartName = mois[start.getMonth()];
    const dayEndName = jours[end.getDay()];
    const dayEndNumber = String(end.getDate());
    const monthEndName = mois[end.getMonth()];

    return `Du ${dayStartName} ${dayStartNumber} ${monthStartName === monthEndName ? '' : monthStartName} au ${dayEndName} ${dayEndNumber} ${monthEndName}`;
}