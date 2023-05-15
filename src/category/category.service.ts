import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.prismaService.category.create({
        data: {
          name: createCategoryDto?.name,
        },
      });

      if (createCategoryDto?.mealsIds?.length > 0) {
        for (let i = 0; i < createCategoryDto?.mealsIds?.length; i++) {
          const instance = await this.prismaService.categoriesOnMeals.create({
            data: {
              categoryId: category?.id,
              mealId: createCategoryDto?.mealsIds[i],
            },
          });
        }
      }

      const payload = category;
      return {
        success: true,
        ...payload,
      };
    } catch (error) {
      console.log('Error while creating a category: ', error);
      throw error;
    }
  }

  async findAll() {
    return await this.prismaService.category.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.category.findUnique({
      where: {
        id: id,
      },
    });
  }

  async remove(id: number) {
    return await this.prismaService.category.delete({
      where: {
        id: id,
      },
    });
  }
}
