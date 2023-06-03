import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';

import { AdminAuthDto, ClientAuthDto, ManagerAuthDto } from './dto';
import { JwtPayload, Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async clientSignIn(dto: ClientAuthDto) {
    const client = await this.prisma.client
      .findUnique({
        where: {
          phone: dto.phone,
        },
      })
      .catch((err) => {
        throw new ForbiddenException('Network error');
      });
    if (!client) throw new ForbiddenException('Access Denied');
    const passwordMatches = await argon
      .verify(client.hash, dto.password)
      .catch((err) => console.log(err));
    if (!passwordMatches) throw new ForbiddenException('Access Denied');
    const { hash, ...payload } = client;
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.config.get('AT_SECRET'),
        expiresIn: '30d',
      }),
      ...payload,
    };
  }
  async adminSignIn(dto: AdminAuthDto) {
    const admin = await this.prisma.admin
      .findUnique({
        where: {
          email: dto.email,
        },
      })
      .catch((err) => {
        throw new ForbiddenException('Network error');
      });
    if (!admin) throw new ForbiddenException('Access Denied');

    const passwordMatches = await argon.verify(admin.hash, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    // if (!admin.isConfirmed) {
    //   /* send sms */
    // }
    const { hash, ...payload } = admin;

    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.config.get('AT_SECRET'),
        expiresIn: '30d',
      }),
      ...payload,
    };
  }

  async deliveryManSignIn(dto: ClientAuthDto) {
    const deliveryman = await this.prisma.deliveryMan
      .findUnique({
        where: {
          phone: dto.phone,
        },
      })
      .catch((err) => {
        throw new ForbiddenException('Network error');
      });
    if (!deliveryman) throw new ForbiddenException('Access Denied');

    const passwordMatches = await argon.verify(deliveryman.hash!, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');
    if (!deliveryman.accepted) throw new ForbiddenException('Not accepted');

    const { hash, ...payload } = deliveryman;
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.config.get('AT_SECRET'),
        expiresIn: '30d',
      }),
      ...payload,
    };
  }
  async managerSignIn(dto: ManagerAuthDto) {
    const manager = await this.prisma.manager
      .findUnique({
        where: {
          email: dto.email,
        },
      })
      .catch((err) => {
        throw new ForbiddenException('Network error');
      });
    if (!manager) throw new ForbiddenException('Access Denied');

    const passwordMatches = await argon.verify(manager.hash!, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    // if (!manager.isConfirmed) {
    //   /* send sms */
    // }

    const restaurant = await this.prisma.restaurant
      .findUnique({
        where: {
          managerId: manager.id,
        },
      })
      .catch((err) => console.log(err));

    const { hash, ...payload } = manager;
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.config.get('AT_SECRET'),
        expiresIn: '30d',
      }),
      ...payload,
      restaurant,
    };
  }
}
