import { Injectable } from '@nestjs/common';
import { initClient } from 'messagebird';
const messagebird = initClient('ZbZHsxt925VklT9eCGsv7FYme');

@Injectable()
export class SmsService {
  // kayen sendSms w verify sms
  // sendSms ndiroha ki client ydir signup wla ki ydir signin w maykonch mconfirmi
  async sendSms() {
    let code = Math.floor(Math.random() * 1000000);
    var params = {
      originator: 'TestMessage',
      recipients: ['+213669215342'],
      body: `${code}`,
    };

    messagebird.messages.create(params, function (err, response) {
      if (err) {
        return console.log(err);
      }
      console.log(response);
    });
  }
}
