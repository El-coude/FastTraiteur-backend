import { IsEmail, IsNotEmpty, IsString } from "class-validator";

 export class CreateManagerDto{
   @IsEmail()
   @IsString()
   @IsNotEmpty()
   email:string;
   
   @IsString()
   @IsNotEmpty()
   password:string;
 }