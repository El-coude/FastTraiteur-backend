import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Res,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('create')
  async create(@Body() createCategoryDto: CreateCategoryDto, @Res() res) {
    const category = await this.categoryService.create(createCategoryDto);
    res.json(category);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get()
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Delete()
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
