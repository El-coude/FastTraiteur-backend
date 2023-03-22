import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';

@Injectable()
export class ManagerService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async create(createManagerDto: CreateManagerDto) {
    const hashedPass = await hash(createManagerDto.password);
    try {
      const manager = await this.prisma.manager.create({
        data: {
          email: createManagerDto.email,
          hash: hashedPass,
        },
      });
      /* sms verify */
      const { hash, ...payload } = manager;

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
        throw new ForbiddenException(['email already used']);
      }
      throw error;
    }
  }

  findAll() {
    return `This action returns all mangers`;
  }

  findOne(id: number) {
    return `This action returns a #${id}  manger`;
  }

  update(id: number, updateManagerDto: UpdateManagerDto) {
    return `This action updates a #${id} manger`;
  }

  remove(id: number) {
    return `This action removes a #${id} manager`;
  }
}
