import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @MinLength(6)
    @MaxLength(20)
    password: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

}
