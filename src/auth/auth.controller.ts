import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';

import { Public, GetCurrentUserId, GetCurrentUser } from '../common/decorators';
import { AuthService } from './auth.service';
import { AdminAuthDto, ClientAuthDto, DeliveryManAuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /* @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signupLocal(dto);
  } */

  @Post('clients/signin')
  async clientSignIn(@Body() dto: ClientAuthDto, @Res() res) {
    const client = await this.authService.clientSignIn(dto);
    res.json({ client });
  }
  @Post('admins/signin')
  async adminSignIn(@Body() dto: AdminAuthDto, @Res() res) {
    const admin = await this.authService.adminSignIn(dto);
    res.json({ admin });
  }
  @Post('delivery/signin')
  async deliveryManSignIn(@Body() dto: DeliveryManAuthDto, @Res() res) {
    const deliveryman = await this.authService.deliveryManSignIn(dto);
    res.json({ deliveryman });
  }

  // hna ta3 admin ...etc
  /* @Public()
  @Post('client/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signinLocal(dto);
  } */
}
