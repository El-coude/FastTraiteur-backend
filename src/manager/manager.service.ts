import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { MailingService } from 'src/mailing/mailing.service';
@Injectable()
export class ManagerService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
    private mailService: MailingService,
  ) {}

  async create(createManagerDto: CreateManagerDto) {
    try {
      const manager = await this.prisma.manager.create({
        data: {
          email: createManagerDto.email,
          name: createManagerDto.name,
          restaurantId: createManagerDto.restaurantId,
        },
      });
      const { hash, ...payload } = manager;
      await this.mailService.sendEmail(
        createManagerDto.email,
        'Your account has been created by FastTraiteur',
        'Hello , FastTraiteur has created a delivery man account for you Download the app from this link , and sign-in using your email to complete setting up your profile',
      );
      return {
        success: true,
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
