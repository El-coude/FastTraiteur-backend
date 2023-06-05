import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStateDto } from './dto/update-order.dto';
import { ORDERSTATE } from '@prisma/client';
import { OrderGateway } from './order.gateway';
import { DeliveryMan } from '@prisma/client';
import { Restaurant } from '@prisma/client';
import * as turf from '@turf/turf';
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
          restaurantId: createOrderDto?.restaurantId,
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
      this.orderGateway.handleOrderCreation(order);
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
  async findOrderByClientId(clientId: number) {
    try {
      const orders = await this.prisma.order.findMany({
        where: {
          clientId: clientId,
        },
      });
      const res = orders.map((or) => ({
        price: or.price,
        id: or.id,
        note: or.note,
        address: or.address,
      }));
      return res;
    } catch (error) {
      console.log('Error while fetching orders by client id: ', error);
      throw error;
    }
  }

  async findOrderByRestaurantId(restaurantId: number) {
    try {
      const orders = await this.prisma.order.findMany({
        where: {
          restaurantId: restaurantId,
        },
        include: {
          client: true,
          ordersItems: {
            include: {
              meal: {
                include: {
                  images: true,
                },
              },
            },
          },
        },
      });

      return orders;
    } catch (error) {
      console.log('Error while trying to find order by restaurant id: ', error);
      throw error;
    }
  }

  async findOrderById(orderId: number) {
    try {
      const order = await this.prisma.order.findUnique({
        where: {
          id: orderId,
        },
      });

      return order;
    } catch (error) {
      console.log('Error while trying to get orders by ID: ', error);
      throw error;
    }
  }

  // assign order to delivery man
  async assignOrder(orderId: number) {
    try {
      const deliverymen = await this.prisma.deliveryMan.findMany();
      const order = await this.prisma.order.findUnique({
        where: {
          id: orderId,
        },
      });
      const restaurant = await this.prisma.restaurant.findFirst({
        where: {
          id: order?.restaurantId,
        },
      });

      const restaurantPosition = turf.point([
        restaurant?.longtitud as number,
        restaurant?.latitud as number,
      ]);

      let minDistance = {
        distance: Number.POSITIVE_INFINITY,
        deliverymanId: 0,
      };
      for (let i = 0; i < deliverymen?.length; i++) {
        const deliverymanPosition = turf.point([
          deliverymen[i]?.longtitud as number,
          deliverymen[i]?.latitud as number,
        ]);

        const distance = turf.distance(restaurantPosition, deliverymanPosition);
        console.log('distance: ', distance);
        if (distance < minDistance['distance']) {
          minDistance['distance'] = distance;
          minDistance['deliverymanId'] = deliverymen[i]?.id;
          console.log('delivery man id: ', deliverymen[i]?.id);
        }
      }

      console.log('MIN DISTANCE AFTER LOOP: ', minDistance);
      const updatedOrder = await this.prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          deliverymanId: minDistance['deliverymanId'],
        },
      });
      return updatedOrder;
    } catch (error) {
      console.log('Error while assigning order to delivery man: ', error);
      throw error;
    }
  }
}
