/*
  Warnings:

  - You are about to drop the column `hashedRt` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `hashedRt` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the `livery_persons` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "admins" DROP COLUMN "hashedRt";

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "hashedRt",
ALTER COLUMN "phone" DROP DEFAULT;

-- DropTable
DROP TABLE "livery_persons";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "deliverymans" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "hash" TEXT,

    CONSTRAINT "deliverymans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "managers" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,

    CONSTRAINT "managers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "deliverymans_phone_key" ON "deliverymans"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "deliverymans_email_key" ON "deliverymans"("email");

-- CreateIndex
CREATE UNIQUE INDEX "managers_email_key" ON "managers"("email");
