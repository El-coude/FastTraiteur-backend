import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as turf from '@turf/turf';
import { Meal } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
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
          name: createMealDto.name?.toLowerCase(),
          price: createMealDto.price,
          description: createMealDto.description,
          restaurantId: createMealDto.restaurantId,
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
    const meals = await this.prismaService.meal.findMany({
      include: {
        images: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
    return meals;
  }

  async findOne(id: number) {
    return await this.prismaService.meal.findUnique({
      where: {
        id: id,
      },
    });
  }

  async remove(id: number) {
    await this.prismaService.categoriesOnMeals.deleteMany({
      where: {
        mealId: id,
      },
    });
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
        /*   ...updateMealDto, */
      },
    });

    return meal;
  }

  async filterMeals(
    distanceRange: number,
    minPrice: string,
    maxPrice: string,
    name: string,
    userId: string,
    categoryId: string,
  ) {
    try {
      const user = await this.prismaService.client.findUnique({
        where: {
          id: parseInt(userId),
        },
      });

      const userPosition = turf.point([
        user?.longtitud as number,
        user?.latitud as number,
      ]);

      const restaurants = await this.prismaService.restaurant.findMany();
      let response: Meal[] = [];
      for (let i = 0; i < restaurants?.length; i++) {
        const restaurantPosition = turf.point([
          restaurants[i]?.longtitud as number,
          restaurants[i]?.latitud as number,
        ]);
        if (turf.distance(userPosition, restaurantPosition) <= distanceRange) {
          let meals = await this.prismaService.meal.findMany({
            where: {
              name: {
                contains: name.toLowerCase(),
              },
              price: {
                gte: parseFloat(minPrice),
                lte: parseFloat(maxPrice),
              },
              restaurantId: restaurants[i]?.id,
              categories:
                categoryId !== 'all'
                  ? {
                      some: {
                        categoryId: parseInt(categoryId),
                      },
                    }
                  : {},
            },
            include: {
              restaurant: true,
              categories: true,
              images: true,
            },
          });
          response.push(...meals);
        }
      }

      return response;
    } catch (error) {
      console.log('Error while filtering meals: ', error);
      throw error;
    }
  }
}
