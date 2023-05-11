import { Injectable, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    try {
      const restaurant = await this.prisma.restaurant.create({
        data: {
          name: createRestaurantDto?.name,
          city: createRestaurantDto?.city,
          address: createRestaurantDto.address,
        },
      });

      const payload = restaurant;
      return {
        success: true,
        ...payload,
      };
    } catch (error) {
      console.log('Error while creating a restaurant: ', error);
      throw new ForbiddenException(['failed to create restaurant']);
    }
  }

  async findAll() {
    const res = await this.prisma.restaurant.findMany({
      include: {
        manager: true,
      },
    });

    return res;
  }

  async findOne(id: number) {
    return await this.prisma.restaurant.findUnique({
      where: {
        id: id,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.restaurant.delete({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    const restaurant = await this.prisma.restaurant.update({
      where: {
        id: id,
      },
      data: {
        ...updateRestaurantDto,
      },
    });

    return restaurant;
  }
}
