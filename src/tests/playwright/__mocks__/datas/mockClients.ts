export const client = {
  "id": "1",
  "name": "Alice",
  "surname": "Doe",
  "email": "alice@example.com",
  "company": null
}

export const clients = [
  {
    "id": "1",
    "name": "Alice",
    "surname": "Doe",
    "email": "alice@example.com",
    "company": null
  },
  {
    "id": "2",
    "name": "Bob",
    "surname": "Smith",
    "email": "bob@example.com",
    "company": "company"
  }
]

export const newClient = {
    "name": "Dupont",
    "surname": "Jean",
    "email": "jean.dupont@example.com",
    "company": "TestCorp"
}

export const clients_after_post = [
  ...clients,
  {
    "id": "3",
    ...newClient
  }
]

export const updatedClient = {
    "id": "1",
    "name": "Alice",
    "surname": "Doe",
    "email": "alicedoe@example.com",
    "company": "AliD Company"
}

export const clients_after_put = [
  {
    "id": "1",
    "name": "Alice",
    "surname": "Doe",
    "email": "alicedoe@example.com",
    "company": "AliD Company"
  },
  {
    "id": "2",
    "name": "Bob",
    "surname": "Smith",
    "email": "bob@example.com",
    "company": "company"
  }
]

export const clients_after_delete = [
  {
    "id": "2",
    "name": "Bob",
    "surname": "Smith",
    "email": "bob@example.com",
    "company": "company"
  }
]