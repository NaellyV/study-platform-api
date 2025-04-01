import { Controller, Get, Body, Param, Delete, UseGuards, Post, Patch } from '@nestjs/common';
import { UserService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuario')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponse({ 
    status: 201, 
    description: 'Usuário criado com sucesso.' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados inválidos fornecidos.' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Email já está em uso.' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Erro interno do servidor.' 
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiResponse({ status: 200, description: `Usuários listados com sucesso.` })
  @ApiResponse({ status: 400, description: `Erro ao listar usuários` })
  @ApiResponse({ status: 404, description: `Nenhum usuário encontrado` })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Lista um usuário por id' })
  @ApiResponse({ status: 200, description: `Usuário listado com sucesso.` })
  @ApiResponse({ status: 400, description: `Erro ao listar usuário` })
  @ApiResponse({ status: 404, description: `Usuário não encontrado` })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth('access_token')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um usuário por id' })
  @ApiResponse({ status: 200, description: `Usuário atualizado com sucesso` })
  @ApiResponse({ status: 400, description: `Erro ao atualizar usuário` })
  @ApiResponse({ status: 404, description: `Usuário inexistente` })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth('access_token')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um usuário por id' })
  @ApiResponse({ status: 204, description: `Usuário deletado com sucesso` })
  @ApiResponse({ status: 400, description: `Erro ao deletar usuário` })
  @ApiResponse({ status: 404, description: `Usuário inexistente` })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth('access_token')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}