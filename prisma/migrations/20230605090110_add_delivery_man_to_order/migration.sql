-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_deliverymanId_fkey";

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "deliverymanId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_deliverymanId_fkey" FOREIGN KEY ("deliverymanId") REFERENCES "deliverymans"("id") ON DELETE SET NULL ON UPDATE CASCADE;
