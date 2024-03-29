import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ClientsModule } from './clients/clients.module';
import { SmsModule } from './sms/sms.module';
import { AdminModule } from './admin/admin.module';
import { DeliveryManModule } from './deliveryman/deliveryman.module';
import { ManagerModule } from './manager/manager.module';
import { MailingModule } from './mailing/mailing.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MealsModule } from './meals/meals.module';
import { CategoryModule } from './category/category.module';
import { OrdersModule } from './orders/orders.module';
import { OrderGateway } from './orders/order.gateway';
import { OrdersService } from './orders/orders.service';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    ClientsModule,
    AdminModule,
    DeliveryManModule,
    ManagerModule,
    MailingModule,
    SmsModule,
    RestaurantModule,
    MealsModule,
    CategoryModule,
    OrdersModule,
  ],
  providers: [OrdersService, OrderGateway],
})
export class AppModule {}
