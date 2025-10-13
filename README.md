# Dashboard Freelance 
A web app to manage my freelance projects, in Next.Js using TypeScript and Prisma.

# Description  
This project is a platform where users can:  
- Connect with google 
- Create clients and manage them
- Create projects and asign client to them
- Create tasks, appoitments, save usefull links and set invoice settings of a project

# Run the project

## Version
Node.js >= 18, npm >= 9, PostgreSQL 14+

## Install Dependencies
```bash
sudo apt update
sudo apt install nodejs npm
npm install
```

## Create a .env that contains
```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=aB3cD4eF5gH6iJ7kL8mN9oP0qR1sT2uV3wXyZ4aB5cD6eF7gH
GOOGLE_AUTH_CLIENT_ID=871629257032-h6u3ddp9rf8q2qv16q0huokvt7ajqqar.apps.googleusercontent.com
GOOGLE_AUTH_CLIENT_SECRET=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
DATABASE_URL="postgresql://postgres:root@localhost:5432/mydb?schema=public"
PLAYWRIGHT_ENABLE_TEST_LOGIN=true
PLAYWRIGHT_TEST_URL=http://localhost:3001
```

## Setup the database
!! Start your postgresql server !!
```bash
npx prisma generate
npx prisma migrate dev
```

## Run
```bash
npm run dev
```

## URL
http://localhost:3000

## Run the tests
```bash
npm run test:jest
npm run test:jest:coverage
npm run test:playwright
npm run test:playwright:ui
```

# Future features / improvements
Maybe I won't continue working on this project, but here are some ideas to improve the project :
- Improve the invoice management
- Automatization system linked with github
- Better interface for the tasks management
- Use the OAuth Google connexion for something

# Branches
There are 3 branches
- dev : Where I develop the app
- prod : Got changes when a version or a hotfix is maked, evrything here is stable and completely tested
- main : contain the same code of the prod

# Commit convention
I used a basic commit convention to write them :
- Commits start with [ADD] [FIX] [RM] to indicate what it contains
- Then it describes in general what changes where made