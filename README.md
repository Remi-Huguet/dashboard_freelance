# Dashboard Freelance 
A web app to manage my freelance projects, in Next.Js using TypeScript and Prisma.

# Description  
This project is a platform where users can:  
- Connect with google 
- Create project, tasks and usefull tools to have a better organization

# Run the project in local mode

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
PLAYWRIGHT_TEST_URL=http://localhost:3000
```

## Setup the database
Start your postgresql server
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
- Improve the invoice management
- Automatization system linked with github
- Better interface for the tasks management
- Use the OAuth Google connexion for something