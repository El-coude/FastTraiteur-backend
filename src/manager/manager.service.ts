import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash as _hash } from 'argon2';
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
        },
      });
      await this.prisma.restaurant.update({
        where: { id: createManagerDto.restaurantId },
        data: {
          managerId: manager.id,
        },
      });

      const token = this.jwtService.sign(manager, {
        secret: this.config.get('AT_SECRET'),
        expiresIn: '1d',
      });
      await this.mailService.sendEmail(
        createManagerDto.email,
        'Your account has been created by FastTraiteur',
        `Hello , FastTraiteur has added your restaurant , open <a href="http://localhost:5173/set-password?token=${encodeURIComponent(
          token,
        )}" >link here</a>  so you can proceed with your account and manage your restaurant `,
      );

      return {
        success: true,
        ...manager,
      };
    } catch (error) {
      console.log(error);
      if (error.message.includes('Unique constraint failed')) {
        throw new ForbiddenException(['email already used']);
      }
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.manager.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.manager.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateManagerDto: UpdateManagerDto) {
    const user = await this.prisma.manager.update({
      where: {
        id: id,
      },
      data: {
        ...updateManagerDto,
      },
    });

    return user;
  }

  async remove(id: number) {
    return await this.prisma.manager.delete({
      where: {
        id: id,
      },
    });
  }

  async changePassword(token: string, password: string) {
    const hashedPass = await _hash(password);
    const { id } = await this.jwtService.verifyAsync(token, {
      secret: this.config.get('AT_SECRET'),
    });

    const manager = await this.prisma.manager.update({
      where: {
        id: id,
      },
      data: {
        hash: hashedPass,
      },
      include: {
        Restaurant: true,
      },
    });

    const { hash, ...payload } = manager;
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.config.get('AT_SECRET'),
        expiresIn: '30d',
      }),
      ...payload,
    };
  }
}
