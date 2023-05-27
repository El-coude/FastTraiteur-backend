import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailingService {
  constructor(private config: ConfigService) {}

  async sendEmail(to: string, subject: string, text: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.config.get('NODEMAILER_USER'),
        pass: this.config.get('NODEMAILER_PASS'),
      },
    });
    const mailOptions = {
      from: '"Fast traiteur" <mr.chakerw@gmail.com>',
      to,
      subject,
      html: text,
    };

    await transporter.sendMail(mailOptions);
    console.log('email sent');
  }
}
