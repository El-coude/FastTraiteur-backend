import { ForbiddenException, Injectable } from '@nestjs/common';
import { initClient } from 'messagebird';
import { PrismaService } from 'src/prisma/prisma.service';
import { Twilio } from 'twilio';
const twilio = new Twilio(
  'ACe5bb52191b2d46ea3c9fbd55a6b2322c',
  'c2ef737c23a0cdfbce70d6da7cd60846',
);
const messagebird = initClient('uYJqmBhAZbOE2cC5qOT7cxZos');

@Injectable()
export class SmsService {
  constructor(private prisma: PrismaService) {}
  // kayen sendSms w verify sms
  // sendSms ndiroha ki client ydir signup wla ki ydir signin w maykonch mconfirmi
  async sendSms(phone: string) {
    console.log(phone);
    try {
      return await new Promise<{ result: string }>((res, rej) => {
        twilio.verify.v2
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
            rej({ error: err.message });
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
      twilio.verify.v2
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
