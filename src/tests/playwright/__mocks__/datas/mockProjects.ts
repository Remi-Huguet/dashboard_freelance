export const projects = [
    {
      "id": '1', 
      "name": 'Projet Alpha', 
      "status": 'En cours', 
      "clientId": '1' 
    },
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