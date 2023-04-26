import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SmsModule } from 'src/sms/sms.module';

@Module({
  imports: [JwtModule.register({}), PrismaService, SmsModule],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
