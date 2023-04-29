import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('restaurant')
export class RestaurantController {
  constructor(
    private restaurantService: RestaurantService,
    private configService: ConfigService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() createRestaurantDto: CreateRestaurantDto, @Res() res) {
    const restaurant = await this.restaurantService.create(createRestaurantDto);
    res.json(restaurant);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.restaurantService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantService.update(+id, updateRestaurantDto);
  }
}
