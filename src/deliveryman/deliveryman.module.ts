import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MailingModule } from 'src/mailing/mailing.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeliveryManController } from './deliveryman.controller';
import { DeliverymanService } from './deliveryman.service';

@Module({
  imports: [JwtModule.register({}), MailingModule],
  controllers: [DeliveryManController],
  providers: [DeliverymanService],
})
export class DeliveryManModule {}
