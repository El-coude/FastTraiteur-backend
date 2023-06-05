import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { initClient } from 'messagebird';
import { PrismaService } from 'src/prisma/prisma.service';
import { Twilio } from 'twilio';

@Injectable()
export class SmsService {
  twilio: Twilio;
  constructor(private prisma: PrismaService, private config: ConfigService) {
    this.twilio = new Twilio(
      this.config.get('TWILIO_API_KEY'),
      this.config.get('TWILIO_AUTH_TOKEN'),
    );
  }
  // kayen sendSms w verify sms
  // sendSms ndiroha ki client ydir signup wla ki ydir signin w maykonch mconfirmi
  async sendMessaage(phone: string, message: string) {
    try {
      return await new Promise<{ result: string }>((res, rej) => {
        this.twilio.messages
          .create({
            to: phone,
            body: message,
            from: '+13203297078',
          })
          .then(() => {
            res({ result: 'sent' });
          })
          .catch((err) => {
            console.log(err);
            rej({ error: 'Network error' });
          });
      });
    } catch ({ error }) {
      throw new ForbiddenException(error);
    }
  }
  async sendSms(phone: string) {
    try {
      return await new Promise<{ result: string }>((res, rej) => {
        this.twilio.verify.v2
          ?.services('VA9f9c7fede6022fc713cfb30eb3604fb7')
          .verifications.create({
            to: phone,
            channel: 'sms',
          })
          .then((verification) => {
            res({ result: 'sent' });
          })
          .catch((err) => {
            console.log(err);
            rej({ error: 'Network error' });
          });
      });
    } catch ({ error }) {
      throw new ForbiddenException(error);
    }
    /*  messagebird.verify.create(
        phone,
        {
          originator: 'Code',
          template: 'Your verification code is %token.',
        },
        function (err, response) {
          if (err) {
            console.log(err);
            rej(err);
          }
          console.log(response);
          res(response?.id!);
        },
      ); */
  }

  async verify(phone: string, code: string) {
    return new Promise<{ result: string }>((res, rej) => {
      this.twilio.verify.v2
        ?.services('VA9f9c7fede6022fc713cfb30eb3604fb7')
        .verificationChecks.create({
          to: phone,
          code: code,
        })
        .then(async () => {
          await this.prisma.client.update({
            where: {
              phone,
            },
            data: {
              isConfirmed: true,
            },
          });
          res({ result: 'success' });
        })
        .catch((err) => {
          console.log(err);
          rej({ result: 'error' });
        });
    });
  }
}
