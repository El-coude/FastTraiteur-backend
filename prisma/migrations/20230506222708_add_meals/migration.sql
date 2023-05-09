-- CreateTable
CREATE TABLE "meals" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "categoryId" INTEGER,

    CONSTRAINT "meals_pkey" PRIMARY KEY ("id")
);
