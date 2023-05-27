import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({ errorFormat: 'pretty' });

const loadMeals = async () => {
  const mealsInput: Prisma.MealCreateManyInput[] = [
    {
      name: 'pizza',
      description: 'pizza',
      price: '100',
      restaurantId: 1,
    },
    {
      name: 'tacos',
      description: 'tacos',
      price: '40',
      restaurantId: 1,
    },
    {
      name: 'sandwitch',
      description: 'sandwitch',
      price: '60',
      restaurantId: 3,
    },
  ];

  await prisma.meal.createMany({
    data: mealsInput,
  });
};

const loadCategories = async () => {
  const categoriesInput: Prisma.CategoryCreateManyInput[] = [
    {
      name: 'category 1',
    },
    {
      name: 'category 2',
    },
  ];

  await prisma.category.createMany({
    data: categoriesInput,
  });
};

const main = async () => {
  await loadMeals();
  await loadCategories();
};

main().then();
