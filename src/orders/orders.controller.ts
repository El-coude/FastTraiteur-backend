import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
  Res,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStateDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Post('create')
  async create(@Body() createOrderDto: CreateOrderDto, @Res() res) {
    const order = await this.orderService.createOrder(createOrderDto);

    res.json(order);
  }
  @Patch('assign-order/:id')
  async assignOrder(@Param('id') id: string, @Res() res) {
    const order = await this.orderService.assignOrder(+id);
    return res.json(order);
  }

  @Patch(':id')
  async updateOrderState(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderStateDto,
    @Res() res,
  ) {
    const order = await this.orderService.updateOrderState(updateOrderDto, +id);
    return res.json(order);
  }

  @Get('clientOrders/:clientId')
  async getOrdersByClientId(@Param('clientId') clientId: string, @Res() res) {
    const orders = await this.orderService.findOrderByClientId(+clientId);
    return res.json(orders);
  }

  @Get('restaurantOrders/:restaurantId')
  async getOrdersByRestaurantId(
    @Param('restaurantId') restaurantId: string,
    @Res() res,
  ) {
    const orders = await this.orderService.findOrderByRestaurantId(
      +restaurantId,
    );
    console.log(orders);
    return res.json(orders);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string, @Res() res) {
    const order = await this.orderService.findOrderById(+id);
    return res.json(order);
  }
}
