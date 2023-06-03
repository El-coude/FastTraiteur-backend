-- CreateEnum
CREATE TYPE "ORDERSTATE" AS ENUM ('DELIVERED', 'PENDING', 'FINISHED');

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL,
    "note" TEXT NOT NULL,
    "state" "ORDERSTATE" NOT NULL DEFAULT 'PENDING',
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "scheduledAt" TEXT NOT NULL,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
