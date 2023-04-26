import { IsNotEmpty } from 'class-validator';

class AuthDto {
  @IsNotEmpty()
  password: string;
}

export class ClientAuthDto extends AuthDto {
  phone: string;
}
export class AdminAuthDto extends AuthDto {
  email: string;
}
export class DeliveryManAuthDto extends AuthDto {
  phone: string;
}
export class ManagerAuthDto extends AuthDto {
  email: string;
}
