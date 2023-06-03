import { ForbiddenException, Injectable } from '@nestjs/common';
import { MailingService } from 'src/mailing/mailing.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDeliveryManDto } from './dto/create-deliveryman.dto';
import { UpdateDeliveryManDto } from './dto/update-deliveryman.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class DeliverymanService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailingService,
    private config: ConfigService,
    private jwtService: JwtService,
  ) {}

  async create(createLiveryManDto: CreateDeliveryManDto) {
    /*  const hashedPass = await hash(createLiveryManDto.password); */
    console.log(createLiveryManDto.restaurantId);
    try {
      const dileveryman = await this.prisma.deliveryMan.create({
        data: {
          name: createLiveryManDto.name,
          email: createLiveryManDto.email,
          phone: createLiveryManDto.phone,
          restaurantId: createLiveryManDto.restaurantId,
        },
      });
      const token = this.jwtService.sign(dileveryman, {
        secret: this.config.get('AT_SECRET'),
        expiresIn: '1d',
      });
      await this.mailService.sendEmail(
        createLiveryManDto.email,
        'Your account has been created by FastTraiteur',
        `Hello , FastTraiteur has added your restaurant , open <a href="http://localhost:5173/set-password?token=${encodeURIComponent(
          token,
        )}" >link here</a>  so you can proceed with your account`,
      );

      const { hash, ...payload } = dileveryman;
      return {
        success: true,
        ...payload,
      };
    } catch (error) {
      console.log(error);
      if (error.message.includes('Unique constraint failed')) {
        let errors: string[] = [];
        if (error.message.includes('email')) {
          errors.push('Email already used');
        }
        if (error.message.includes('phone')) {
          errors.push('Phone number already used');
        }
        throw new ForbiddenException(errors);
      }
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.deliveryMan.findMany({
      include: {
        restaurant: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} delivery man`;
  }

  async update(id: number, dto: UpdateDeliveryManDto) {
    const d = await this.prisma.deliveryMan.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
    return d;
  }

  async remove(id: number) {
    await this.prisma.deliveryMan.delete({
      where: {
        id,
      },
    });
    return `This action removes a #${id} delivery man`;
  }
}
