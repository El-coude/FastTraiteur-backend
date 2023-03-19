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
import { ClientAuthDto } from './dto';

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
    const token = await this.authService.clientSignIn(dto);
    res.json({ access_token: token });
  }

  // hna ta3 admin ...etc
  /* @Public()
  @Post('client/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signinLocal(dto);
  } */
}
