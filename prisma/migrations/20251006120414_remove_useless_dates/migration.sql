/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Client" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "public"."Project" DROP COLUMN "createdAt";
