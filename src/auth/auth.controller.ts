import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
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
  clientSignIn(@Body() dto: ClientAuthDto): Promise<string> {
    console.log(dto);
    return this.authService.clientSignIn(dto);
  }

  // hna ta3 admin ...etc
  /* @Public()
  @Post('client/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signinLocal(dto);
  } */
}
