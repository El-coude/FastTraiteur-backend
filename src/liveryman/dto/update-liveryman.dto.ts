import { PartialType } from '@nestjs/mapped-types';
import { CreateLiveryManDto } from './create-liveryman.dto';

export class UpdateLiveryManDto extends PartialType(CreateLiveryManDto) {}