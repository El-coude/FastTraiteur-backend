import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() createManagerDto: CreateManagerDto, @Res() res) {
    const manager = await this.managerService.create(createManagerDto);
    res.json({ manager });
  }

  @Get()
  findAll() {
    return 'Hello, mangers';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managerService.update(+id, updateManagerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managerService.remove(+id);
  }
}
