import { Controller, Get } from '@nestjs/common';
import { SmsService } from './sms.service';

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Get('test')
  async create() {
    return this.smsService.sendSms();
  }
  // kayen /verify-sms
}
