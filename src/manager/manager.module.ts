import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MailingService } from 'src/mailing/mailing.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';

@Module({
  controllers: [ManagerController],
  providers: [ManagerService],
  imports: [MailingService, JwtModule.register({}), PrismaService],
})
export class ManagerModule {}
