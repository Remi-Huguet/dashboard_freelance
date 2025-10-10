export const project = {
  "id": '1', 
  "name": 'Projet Alpha', 
  "status": 'En cours', 
  "clientId": '1' 
}

export const projects = [
    project,
    { 
      "id": '2', 
      "name": 'Projet Beta', 
      "status": 'En cours', 
      "clientId": '2' 
    }
]

export const newProject = {
  "name": 'Projet Ceta', 
  "status": 'Terminé', 
  "clientId": '3'
}

export const projects_after_post = [
  ...projects,
  {
    "id": "3",
    ...newProject
  }
]

export const updatedProject = {
  "name": 'Projet Alpha', 
  "status": 'Terminé', 
  "clientId": '3'
}

export const projects_after_put = [
  updatedProject,
  { 
    "id": '2', 
    "name": 'Projet Beta', 
    "status": 'En cours', 
    "clientId": '2' 
  }
]

export const projects_after_delete = [
  { 
    "id": '2', 
    "name": 'Projet Beta', 
    "status": 'En cours', 
    "clientId": '2' 
  }
]