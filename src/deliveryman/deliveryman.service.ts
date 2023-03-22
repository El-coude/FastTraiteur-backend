import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDeliveryManDto } from './dto/create-deliveryman.dto';
import { UpdateDeliveryManDto } from './dto/update-deliveryman.dto';

@Injectable()
export class DeliverymanService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async create(createLiveryManDto: CreateDeliveryManDto) {
    const hashedPass = await hash(createLiveryManDto.password);
    try {
      const dileveryman = await this.prisma.dileveryman.create({
        data: {
          phone: createLiveryManDto.phone,
          name: createLiveryManDto.name,
          hash: hashedPass,
        },
      });
      /* sms verify */
      const { hash, ...payload } = dileveryman;

      return {
        access_token: this.jwtService.sign(payload, {
          secret: this.config.get('AT_SECRET'),
          expiresIn: '30d',
        }),
        ...payload,
      };
    } catch (error) {
      console.log(error);
      if (error.message.includes('Unique constraint failed')) {
        throw new ForbiddenException(['phone already used']);
      }
      throw error;
    }
  }

  findAll() {
    return `This action returns all delivery men`;
  }

  findOne(id: number) {
    return `This action returns a #${id} delivery man`;
  }

  update(id: number, UpdateDeliveryManDto: UpdateDeliveryManDto) {
    return `This action updates a #${id} delivery man`;
  }

  remove(id: number) {
    return `This action removes a #${id} delivery man`;
  }
}
