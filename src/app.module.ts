import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AtGuard } from './common/guards';
import { PrismaModule } from './prisma/prisma.module';
import { ClientsModule } from './clients/clients.module';
import { SmsModule } from './sms/sms.module';
import { AdminModule } from './admin/admin.module';
import { DeliveryManModule } from './deliveryman/deliveryman.module';
import { ManagerModule } from './manager/manager.module';
import { MailingModule } from './mailing/mailing.module';

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
  ],
  /* providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ], */
})
export class AppModule {}
