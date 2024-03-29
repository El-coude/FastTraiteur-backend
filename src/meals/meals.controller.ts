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
  Query,
} from '@nestjs/common';
import { MealsService } from './meals.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { ManagerAdminGuard } from 'src/auth/manager-admin.guard';
import { ConfigService } from '@nestjs/config';

@Controller('meals')
export class MealsController {
  constructor(
    private mealsService: MealsService,
    private configService: ConfigService,
  ) {}

  //@UseGuards(ManagerAdminGuard)
  @Post('create')
  async create(@Body() createMealDto: CreateMealDto, @Res() res) {
    const meal = await this.mealsService.create(createMealDto);
    res.json(meal);
  }

  @Get('filter')
  filter(
    @Query('distanceRange') distanceRange: number,
    @Query('minPrice') minPrice: string,
    @Query('maxPrice') maxPrice: string,
    @Query('name') name: string,
    @Query('userId') userId: string,
    @Query('categoryId') categoryId: string,
  ) {
    return this.mealsService.filterMeals(
      distanceRange,
      minPrice,
      maxPrice,
      name,
      userId,
      categoryId,
    );
  }

  @Get('restaurant/:id')
  findAll(@Param('id') id: string) {
    return this.mealsService.findAll(+id);
  }

  @UseGuards(ManagerAdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mealsService.findOne(+id);
  }

  @UseGuards(ManagerAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealsService.remove(+id);
  }

  @UseGuards(ManagerAdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMealDto: UpdateMealDto) {
    return this.mealsService.update(+id, updateMealDto);
  }
}
