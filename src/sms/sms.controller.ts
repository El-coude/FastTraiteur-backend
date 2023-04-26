import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SmsService } from './sms.service';

@Controller('sms')
export class SmsController {
  constructor(
    private readonly smsService: SmsService,
    private readonly prisma: PrismaService,
  ) {}

  /*  @Get('test')
  async create() {
    return this.smsService.sendSms();
  } */
  @Post('sendSms')
  async send(@Body() dto: { phone: string }, @Res() res) {
    return await this.smsService.sendSms(dto.phone);
  }

  @Post('verify')
  async create(@Body() dto: { phone: string; code: string }) {
    console.log(dto);
    return await this.smsService.verify(dto.phone, dto.code);
  }

  @Get('empty')
  async empty() {
    return this.prisma.cleanDatabase();
  }
  // kayen /verify-sms
}
