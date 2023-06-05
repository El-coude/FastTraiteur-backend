-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "deliverymanId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "orderitems" ADD CONSTRAINT "orderitems_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "meals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
