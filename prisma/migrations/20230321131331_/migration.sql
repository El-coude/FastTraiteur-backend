/*
  Warnings:

  - You are about to drop the column `address` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `clients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "address",
DROP COLUMN "city",
ALTER COLUMN "phone" SET DEFAULT E'000-000-0000';

-- CreateTable
CREATE TABLE "admins" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "hashedRt" TEXT,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "livery_persons" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "phone" TEXT NOT NULL DEFAULT E'000-000-0000',
    "name" TEXT NOT NULL,
    "email" TEXT,
    "hash" TEXT NOT NULL,
    "hashedRt" TEXT,

    CONSTRAINT "livery_persons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "livery_persons_phone_key" ON "livery_persons"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "livery_persons_email_key" ON "livery_persons"("email");
