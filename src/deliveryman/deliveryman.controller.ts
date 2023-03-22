import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { DeliverymanService } from './deliveryman.service';
import { CreateDeliveryManDto } from './dto/create-deliveryman.dto';
import { UpdateDeliveryManDto } from './dto/update-deliveryman.dto';

@Controller('deliverymen')
export class DeliveryManController {
  constructor(private readonly deliverymanService: DeliverymanService) {}

  @Post('create')
  async create(@Body() createDeliveryManDto: CreateDeliveryManDto, @Res() res) {
    const deliveryman = await this.deliverymanService.create(
      createDeliveryManDto,
    );
    res.json({ deliveryman });
  }

  @Get()
  findAll() {
    return 'Hello, deliverymen';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliverymanService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeliveryManDto: UpdateDeliveryManDto,
  ) {
    return this.deliverymanService.update(+id, updateDeliveryManDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliverymanService.remove(+id);
  }
}
