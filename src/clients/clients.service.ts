import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { SmsService } from 'src/sms/sms.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import * as AWS from '@aws-sdk/client-s3';

@Injectable()
export class ClientsService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
    private sms: SmsService,
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
      const { hash, ...payload } = client;

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
        throw new ForbiddenException(['Phone already used']);
      }
      throw error;
    }
  }

  findAll() {
    return `This action returns all clients`;
  }

  async findOne(id: number) {
    const user = await this.prisma.client.findUnique({
      where: {
        id,
      },
    });
    console.log(!!user);
    return { exists: !!user };
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const updateObj = { ...updateClientDto };
    try {
      if (updateClientDto.imageUrl) {
        const s3 = new AWS.S3({
          region: 'ca-central-1',
          credentials: {
            accessKeyId: this.config.get('AWS_KEY')!,
            secretAccessKey: this.config.get('AWS_SECRET')!,
          },
        });
        await s3.putObject({
          Bucket: 'fasttraiteur',
          Key: `clients-profile-images/user-${id}-profile-image.jpg`,
          Body: Buffer.from(
            updateClientDto.imageUrl.replace(/^data:image\/\w+;base64,/, ''),
            'base64',
          ),
        });
        updateObj.imageUrl = `https://fasttraiteur.s3.ca-central-1.amazonaws.com/clients-profile-images/user-${
          id || ''
        }-profile-image.jpg`;
        // process data.
      }
      const client = await this.prisma.client.update({
        where: {
          id,
        },
        data: updateObj,
      });

      return client;
    } catch (error) {
      // error handling.
      console.log(error);
      throw new ForbiddenException(['Network error']);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
