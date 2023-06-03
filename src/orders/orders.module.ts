import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [],
})
export class OrdersModule {}
