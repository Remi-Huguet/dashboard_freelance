export const appointments = [
    { 
        "id": '1', 
        "title": 'Rdv Alpha', 
        "date": new Date(Date.now() + 60000).toISOString(), 
        "projectId": '1' 
    },
    { 
        "id": '2', 
        "title": 'Rdv Beta', 
        "date": new Date(Date.now() + 60000).toISOString(), 
        "projectId": '1' 
    }
]

export const new_appointment = { 
    "title": 'Nouvel event', 
    "date": new Date(Date.now() + 60000).toISOString(),
    "projectId": '1' 
}

export const appointments_after_post = [
    ...appointments,
    { 
        "id": 3, 
        ...new_appointment
    }
]

export const updated_appointment = { 
    "id": '1', 
    "title": 'Rdv SUIII', 
    "date": new Date(Date.now() + 60000).toISOString(), 
    "projectId": '1' 
}

export const appointments_after_put = [
    { 
        "id": '1', 
        "title": 'Rdv SUIII', 
        "date": new Date(Date.now() + 60000).toISOString(), 
        "projectId": '1' 
    },
    { 
        "id": '2', 
        "title": 'Rdv Beta', 
        "date": new Date(Date.now() + 60000).toISOString(), 
        "projectId": '1' 
    }
]

export const appointments_after_delete = [
    { 
        "id": '2', 
        "title": 'Rdv Beta', 
        "date": new Date(Date.now() + 60000).toISOString(), 
        "projectId": '1' 
    }
]