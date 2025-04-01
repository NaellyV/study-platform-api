import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../auth/skipAuth/skipAuth';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAuthDto } from './dto/create-auth.dto';

@ApiTags('Login')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login do usuário e retorno do token de acesso' })
  @ApiResponse({ status: 200, description: 'Token' })
  @ApiResponse({ status: 400, description: 'Falha de autenticação.' })
  @ApiResponse({ status: 401, description: 'Token Inválido!' })
  @ApiResponse({ status: 404, description: 'Não foi possível localizar o Usuário' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() body: CreateAuthDto) {
    return this.authService.signIn(body);
  }
}