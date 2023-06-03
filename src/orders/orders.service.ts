import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStateDto } from './dto/update-order.dto';
import { ORDERSTATE } from '@prisma/client';
import { OrderGateway } from './order.gateway';
@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private orderGateway: OrderGateway,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    console.log('createOrderDto: ', createOrderDto);
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

      for (let i = 0; i < createOrderDto?.orderItems?.length; i++) {
        console.log(createOrderDto?.orderItems[i].quantity);
        const orderItem = await this.prisma.orderItem.create({
          data: {
            quantity: createOrderDto?.orderItems[i].quantity,
            mealId: createOrderDto?.orderItems[i].mealId,
            orderId: order?.id,
          },
        });
      }
      this.orderGateway.notifyOrderCreation();
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
