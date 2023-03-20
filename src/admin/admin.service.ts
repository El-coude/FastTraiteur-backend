import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const hashedPass = await hash(createAdminDto.password);
    try {
      const admin = await this.prisma.admin.create({
        data: {
          email: createAdminDto.email,
          name: createAdminDto.name,
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
        throw new ForbiddenException(['email already used']);
      }
      throw error;
    }
  }

  findAll() {
    return `This action returns all admins`;
  }

  findOne(id: number) {
    return `This action returns a #${id}  admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
