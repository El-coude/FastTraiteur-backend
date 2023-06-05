import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderGateway } from './order.gateway';
import { SmsService } from 'src/sms/sms.service';
import { SmsModule } from 'src/sms/sms.module';
@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrderGateway],
  imports: [SmsModule],
  exports: [OrdersService],
})
export class OrdersModule {}
