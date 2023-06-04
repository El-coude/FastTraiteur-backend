import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  controllers: [RestaurantController],
  providers: [RestaurantService],
  imports: [JwtModule.register({})],
})
export class RestaurantModule {}
