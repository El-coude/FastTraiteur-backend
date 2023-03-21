import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLiveryManDto } from './dto/create-liveryman.dto';
import { UpdateLiveryManDto } from './dto/update-liveryman.dto';

@Injectable()
export class LiverymanService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async create(createLiveryManDto: CreateLiveryManDto) {
    const hashedPass = await hash(createLiveryManDto.password);
    try {
      const admin = await this.prisma.livery_person.create({
        data: {
          phone: createLiveryManDto.phone,
          name: createLiveryManDto.name,
          hash: hashedPass,
        },
      });
      /* sms verify */

      return this.jwtService.sign(
        { ...admin },
        {
          secret: this.config.get('AT_SECRET'),
          expiresIn: '30d',
        },
      );
    } catch (error) {
      console.log(error);
      if (error.message.includes('Unique constraint failed')) {
        throw new ForbiddenException(['phone already used']);
      }
      throw error;
    }
  }

  findAll() {
    return `This action returns all livery men`;
  }

  findOne(id: number) {
    return `This action returns a #${id} livery man`;
  }

  update(id: number, UpdateLiveryManDto: UpdateLiveryManDto) {
    return `This action updates a #${id} livery man`;
  }

  remove(id: number) {
    return `This action removes a #${id} livery man`;
  }
}
