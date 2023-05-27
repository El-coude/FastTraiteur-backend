-- AlterTable
ALTER TABLE "meals" ADD COLUMN     "restaurantId" INTEGER NOT NULL DEFAULT 2;

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mealimages" ADD CONSTRAINT "mealimages_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "meals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
