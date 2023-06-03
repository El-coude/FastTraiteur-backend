import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStateDto } from './dto/update-order.dto';
import { ORDERSTATE } from '@prisma/client';
import { MessageGateway } from './order.gateway';
@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
    createOrderItemDto: CreateOrderItemDto,
  ) {
    try {
      const order = await this.prisma.order.create({
        data: {
          price: createOrderDto?.price,
          longitude: createOrderDto?.longitude,
          latitud: createOrderDto?.latitud,
          address: createOrderDto?.address,
          clientId: createOrderDto?.clientId,
        },
      });

      const orderItem = await this.prisma.orderItem.create({
        data: {
          quantity: createOrderItemDto?.quantity,
          mealId: createOrderItemDto?.mealId,
          orderId: order?.id,
        },
      });

      return order;
    } catch (error) {
      console.log('Error while creating order: ', error);
      throw error;
    }
  }

  async updateOrderState(orderState: UpdateOrderStateDto, id: number) {
    try {
      const order = await this.prisma.order.update({
        where: {
          id: id,
        },
        data: {
          state: orderState?.state as ORDERSTATE,
        },
      });

      return order;
    } catch (error) {
      console.log('Error while updating order state: ', error);
      throw error;
    }
  }
}
