import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(body: CreateAuthDto): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(body.email);

    const payload = {
      id: user.id,
      email: user.email,
    };

    const passwordCorrect = await bcrypt.compare(body.password, user.password);

    if (!passwordCorrect)
      throw new UnauthorizedException({
        message: 'Falha de autenticação.',
        error: 'Credenciais inválidas',
      });

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}