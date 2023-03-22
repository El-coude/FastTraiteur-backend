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
    console.log(client);
    if (!client) throw new ForbiddenException('Access Denied');

    const passwordMatches = await argon.verify(client.hash, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    if (!client.isConfirmed) {
      /* send sms */
    }
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
    console.log(admin);
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
    const deliveryman = await this.prisma.deliveryman
      .findUnique({
        where: {
          phone: dto.phone,
        },
      })
      .catch((err) => {
        throw new ForbiddenException('Network error');
      });
    console.log(deliveryman);
    if (!deliveryman) throw new ForbiddenException('Access Denied');

    const passwordMatches = await argon.verify(deliveryman.hash, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    if (!deliveryman.isConfirmed) {
      /* send sms */
    }
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
    console.log(manager);
    if (!manager) throw new ForbiddenException('Access Denied');

    const passwordMatches = await argon.verify(manager.hash, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    // if (!manager.isConfirmed) {
    //   /* send sms */
    // }
    const { hash, ...payload } = manager;
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.config.get('AT_SECRET'),
        expiresIn: '30d',
      }),
      ...payload,
    };
  }




  /* async logout(userId: number): Promise<boolean> {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
    return true;
  } */

  /*  async refreshTokens(userId: number, rt: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

    const rtMatches = await argon.verify(user.hashedRt, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async updateRtHash(userId: number, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  } */

  /* async getTokens(userId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  } */
}
