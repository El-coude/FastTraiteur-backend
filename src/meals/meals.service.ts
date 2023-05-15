import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { CreateMealImageDto } from './dto/create-image.dto';
import { saveImage } from '../utils/aws';

@Injectable()
export class MealsService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {}

  async create(createMealDto: CreateMealDto) {
    try {
      const meal = await this.prismaService.meal.create({
        data: {
          name: createMealDto.name,
          price: createMealDto.price,
          description: createMealDto.description,
        },
      });

      let payload = meal;
      let imagesUrl: Array<string> = [];
      if (createMealDto?.images?.length > 0) {
        for (let i = 0; i < createMealDto?.images?.length; i++) {
          const imageUrl = (await saveImage(
            createMealDto?.images[0],
            payload?.id,
          )) as string;
          imagesUrl.push(imageUrl);
          await this.prismaService.mealImage.create({
            data: {
              url: imageUrl,
              mealId: payload?.id,
            },
          });
        }
      }
      payload['images'] = imagesUrl;
      if (createMealDto?.categoryIds?.length > 0) {
        for (let i = 0; i < createMealDto?.categoryIds?.length; i++) {
          const instance = await this.prismaService.categoriesOnMeals.create({
            data: {
              mealId: payload?.id,
              categoryId: createMealDto.categoryIds[i],
            },
          });
        }
      }
      return {
        success: true,
        ...payload,
      };
    } catch (error) {
      console.log('Error while creating meal: ', error);
      throw error;
    }
  }

  async findAll() {
    return await this.prismaService.meal.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.meal.findUnique({
      where: {
        id: id,
      },
    });
  }

  async remove(id: number) {
    return await this.prismaService.meal.delete({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateMealDto: UpdateMealDto) {
    const meal = await this.prismaService.meal.update({
      where: {
        id: id,
      },
      data: {
        ...updateMealDto,
      },
    });

    return meal;
  }
}
