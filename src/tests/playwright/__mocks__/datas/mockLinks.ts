export const links = [
    { 
        "id": '1', 
        "name": 'Link Alpha', 
        "url": 'https://link-alpha.com', 
        "projectId": '1' 
    },
    { 
        "id": '2', 
        "name": 'Link Beta', 
        "url": 'https://link-beta.com', 
        "projectId": '1' 
    }
]

export const new_link = { 
    "name": 'Nouveau link', 
    "url": 'https://link-nouveau.com', 
    "projectId": '1' 
}

export const links_after_post = [
    ...links,
    { 
        "id": 3, 
        ...new_link
    }
]

export const updated_link = { 
    "id": '1', 
    "name": 'Link SUIII', 
    "url": 'https://link-alpha.com', 
    "projectId": '1' 
}

export const links_after_put = [
    { 
        "id": '1', 
        "name": 'Link SUIII', 
        "url": 'https://link-alpha.com', 
        "projectId": '1' 
    },
    { 
        "id": '2', 
        "name": 'Link Beta', 
        "url": 'https://link-beta.com', 
        "projectId": '1' 
    }
]

export const links_after_delete = [
    { 
        "id": '2', 
        "name": 'Link Beta', 
        "url": 'https://link-beta.com', 
        "projectId": '1' 
    }
]