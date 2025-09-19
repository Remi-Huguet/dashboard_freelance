import { PrismaClient } from "@prisma/client";

let prisma;

if (!global.prisma) {
  prisma = new PrismaClient();
}

global.prisma = prisma;

export default prisma;
