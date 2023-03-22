import { PartialType } from '@nestjs/mapped-types';
import { CreateLiveryManDto } from './create-deliveryman.dto';

export class UpdateDeliveryManDto extends PartialType(CreateLiveryManDto) {}