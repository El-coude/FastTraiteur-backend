import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const hashedPass = await hash(createClientDto.password);
    try {
      const client = await this.prisma.client.create({
        data: {
          phone: createClientDto.phone,
          name: createClientDto.name,
          hash: hashedPass,
        },
      });
      /* sms verify */

      return this.jwtService.sign(
        { ...client },
        {
          secret: this.config.get('AT_SECRET'),
          expiresIn: '30d',
        },
      );
    } catch (error) {
      console.log(error);
      if (error.message.includes('Unique constraint failed')) {
        throw new ForbiddenException(['Phone already used']);
      }
      throw error;
    }
  }

  findAll() {
    return `This action returns all clients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
