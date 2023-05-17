import { ForbiddenException, Injectable } from '@nestjs/common';
import { MailingService } from 'src/mailing/mailing.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDeliveryManDto } from './dto/create-deliveryman.dto';
import { UpdateDeliveryManDto } from './dto/update-deliveryman.dto';

@Injectable()
export class DeliverymanService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailingService,
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
      await this.mailService.sendEmail(
        createLiveryManDto.email,
        'Your account has been created by FastTraiteur',
        'Hello , FastTraiteur has created a delivery man account for you Download the app from this link , and sign-in using your email to complete setting up your profile',
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
