import { ForbiddenException, Injectable } from '@nestjs/common';
import { MailingService } from 'src/mailing/mailing.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDeliveryManDto } from './dto/create-deliveryman.dto';
import { UpdateDeliveryManDto } from './dto/update-deliveryman.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'argon2';
import * as AWS from '@aws-sdk/client-s3';
import { SmsService } from 'src/sms/sms.service';

@Injectable()
export class DeliverymanService {
  constructor(
    private prisma: PrismaService,
    private smsSerive: SmsService,
    private config: ConfigService,
    private jwtService: JwtService,
  ) {}

  async create(createLiveryManDto: CreateDeliveryManDto) {
    const hashedPass = await hash(createLiveryManDto.password);
    try {
      const dileveryman = await this.prisma.deliveryMan.create({
        data: {
          name: createLiveryManDto.name,
          phone: createLiveryManDto.phone,
          hash: hashedPass,
        },
      });

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
    return await this.prisma.deliveryMan.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} delivery man`;
  }

  async update(id: number, dto: UpdateDeliveryManDto) {
    const updateObj = { ...dto };
    try {
      if (dto.imageUrl) {
        const s3 = new AWS.S3({
          region: 'ca-central-1',
          credentials: {
            accessKeyId: this.config.get('AWS_KEY')!,
            secretAccessKey: this.config.get('AWS_SECRET')!,
          },
        });
        await s3.putObject({
          Bucket: 'fasttraiteur',
          Key: `delivery-profile-images/user-${id}-profile-image.jpg`,
          Body: Buffer.from(
            dto.imageUrl.replace(/^data:image\/\w+;base64,/, ''),
            'base64',
          ),
        });
        updateObj.imageUrl = `https://fasttraiteur.s3.ca-central-1.amazonaws.com/delivery-profile-images/user-${
          id || ''
        }-profile-image.jpg`;
        // process data.
      }
      const dl = await this.prisma.deliveryMan.update({
        where: {
          id,
        },
        data: updateObj,
      });

      if ((dto as any).accepted) {
        await this.smsSerive.sendMessaage(
          dl.phone,
          'Your request to join Fasttraitaur as delivery has been accepted',
        );
      }
      return dl;
    } catch (error) {
      // error handling.
      console.log(error);
      throw new ForbiddenException(['Network error']);
    }
  }

  async remove(id: number) {
    await this.prisma.deliveryMan.delete({
      where: {
        id,
      },
    });
    return `This action removes a #${id} delivery man`;
  }

  async updatePosition(updatePositionDto: UpdatePositionDto, id: number) {
    try {
      const deliveryman = await this.prisma.deliveryMan.update({
        where: {
          id,
        },
        data: {
          longtitud: updatePositionDto?.longtitud,
          latitud: updatePositionDto?.latitud,
        },
      });

      return deliveryman;
    } catch (error) {
      console.log('Error while updating delivery man position: ', error);
      throw error;
    }
  }
}
