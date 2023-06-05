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
import { UpdatePositionDto } from './dto/update-position.dto';
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
    return this.deliverymanService.findAll();
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
    console.log(updateDeliveryManDto);
    return this.deliverymanService.update(+id, updateDeliveryManDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliverymanService.remove(+id);
  }

  @Post('update-position/:id')
  async updatePosition(
    @Body() updatePostion: UpdatePositionDto,
    @Param('id') id: string,
    @Res() res,
  ) {
    console.log(updatePostion);
    const deliveryman = await this.deliverymanService.updatePosition(
      updatePostion,
      +id,
    );

    return res.json(deliveryman);
  }
}
