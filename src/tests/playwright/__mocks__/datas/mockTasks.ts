export const tasks_front = [
    { 
        "id": '1', 
        "title": 'Task Alpha', 
        "desc": 'Alpha desc', 
        "type": "Front-end",
        "done": false,
        "projectId": '1' 
    }
]

export const tasks_back = [
    { 
        "id": '2', 
        "title": 'Task Beta', 
        "desc": 'Beta desc', 
        "type": "Back-end",
        "done": false,
        "projectId": '1' 
    }
]

export const tasks_deploy = [
    { 
        "id": '3', 
        "title": 'Task Ceta', 
        "desc": 'Ceta desc', 
        "type": "Deploiement",
        "done": true,
        "projectId": '1' 
    }
]

export const tasks_doc = [
    { 
        "id": '4', 
        "title": 'Task Deta', 
        "desc": 'Deta desc', 
        "type": "Documentation",
        "done": true,
        "projectId": '1' 
    }
]

export const tasks = [
    { 
        "id": '1', 
        "title": 'Task Alpha', 
        "desc": 'Alpha desc', 
        "type": "Front-end",
        "done": false,
        "projectId": '1' 
    },
    { 
        "id": '2', 
        "title": 'Task Beta', 
        "desc": 'Beta desc', 
        "type": "Back-end",
        "done": false,
        "projectId": '1' 
    },
    { 
        "id": '3', 
        "title": 'Task Ceta', 
        "desc": 'Ceta desc', 
        "type": "Deploiement",
        "done": true,
        "projectId": '1' 
    },
    { 
        "id": '4', 
        "title": 'Task Deta', 
        "desc": 'Deta desc', 
        "type": "Documentation",
        "done": true,
        "projectId": '1' 
    }
]

export const new_task = { 
    "title": 'Nouvelle task', 
    "desc": 'Task desc', 
    "type": "Documentation",
    "done": false,
    "projectId": '1'  
}

export const tasks_after_post = [
    ...tasks,
    { 
        "id": 3, 
        ...new_task
    }
]

export const updated_task = { 
    "id": '1', 
    "title": 'Task SUIIIIIIII', 
    "desc": 'Alpha desc', 
    "type": "Back-end",
    "done": false,
    "projectId": '1' 
}

export const tasks_after_put = [
    { 
        "id": '1', 
        "title": 'Task SUIIIIIIII', 
        "desc": 'Alpha desc', 
        "type": "Back-end",
        "done": false,
        "projectId": '1'
    },
    { 
        "id": '2', 
        "title": 'Task Beta', 
        "desc": 'Beta desc', 
        "type": "Back-end",
        "done": false,
        "projectId": '1' 
    },
    { 
        "id": '3', 
        "title": 'Task Ceta', 
        "desc": 'Ceta desc', 
        "type": "Deploiement",
        "done": true,
        "projectId": '1' 
    },
    { 
        "id": '4', 
        "title": 'Task Deta', 
        "desc": 'Deta desc', 
        "type": "Documentation",
        "done": true,
        "projectId": '1' 
    }
]

export const tasks_after_delete = [
    { 
        "id": '2', 
        "title": 'Task Beta', 
        "desc": 'Beta desc', 
        "type": "Back-end",
        "done": false,
        "projectId": '1' 
    },
    { 
        "id": '3', 
        "title": 'Task Ceta', 
        "desc": 'Ceta desc', 
        "type": "Deploiement",
        "done": true,
        "projectId": '1' 
    },
    { 
        "id": '4', 
        "title": 'Task Deta', 
        "desc": 'Deta desc', 
        "type": "Documentation",
        "done": true,
        "projectId": '1' 
    }
]