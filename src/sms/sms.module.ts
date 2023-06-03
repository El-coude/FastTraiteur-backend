import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SmsController } from './sms.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [SmsService],
  controllers: [SmsController],
  imports: [JwtModule.register({})],
  exports: [SmsService],
})
export class SmsModule {}
