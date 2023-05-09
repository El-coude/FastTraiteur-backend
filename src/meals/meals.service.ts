import { Injectable, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { Config } from 'twilio/lib/twiml/VoiceResponse';

@Injectable()
export class MealsService {
  constructor(
    private prismaService: PrismaService,
    private configService: Config,
  ) {}

  async create(createMealDto: CreateMealDto) {
    try {
      const meal = await this.prismaService.meal.create({
        data: {
          name: createMealDto.name,
          price: createMealDto.price,
          description: createMealDto.description,
          categoryId: createMealDto.categoryId,
        },
      });

      const payload = meal;
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
