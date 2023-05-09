import { Module } from '@nestjs/common';
import { MealsController } from './meals.controller';
import { MealsService } from './meals.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
@Module({
  controllers: [MealsController],
  providers: [MealsService],
  imports: [JwtModule.register({}), PrismaService, ConfigService],
})
export class MealsModule {}
