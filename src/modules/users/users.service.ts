import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../database/PrismaService';
import * as bcrypt from 'bcryptjs';
import { randomInt } from 'node:crypto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateUserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { email: body.email },
    });

    if (userExists) {
      throw new HttpException('Email já está em uso', HttpStatus.CONFLICT);
    }

    const saltRounds = randomInt(10, 16);
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);

    try {
      const newUser = await this.prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      return newUser;
    } catch (error) {
      throw new HttpException(
        'Erro ao criar usuário',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


  async findAll() {
    try {
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      if (!users) throw new HttpException('Nenhum usuário encontrado', HttpStatus.NOT_FOUND);

      return users;
    } catch (error) {
      throw new HttpException(error as string, HttpStatus.BAD_REQUEST);
    }
  }

  

  async findOne(identifier: string) {
    const isEmail = identifier.includes('@');

    const userCheck = await this.prisma.user.findFirst({
      where: isEmail ? { email: identifier } : { id: identifier },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    if (!userCheck) throw new HttpException('Usuário inexistente', HttpStatus.NOT_FOUND);

    return userCheck;
  }

  async update(id: string, body: UpdateUserDto) {
    const userCheck = await this.prisma.user.findFirst({ where: { id } });
    if (!userCheck) throw new HttpException('Usuário inexistente', HttpStatus.NOT_FOUND);

    const randomSalt = randomInt(10, 16);
    const passwordHash = await bcrypt.hash(body.password as string, randomSalt);

    try {
      const updateUser = await this.prisma.user.update({
        where: { id },
        data: {
          name: body.name,
          password: passwordHash,
        },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
        },
      });

      return updateUser;
    } catch (error) {
      throw new HttpException(error as string, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    const userCheck = await this.prisma.user.findFirst({ where: { id } });

    if (!userCheck) throw new HttpException('Usuário inexistente', HttpStatus.NOT_FOUND);

    try {
      await this.prisma.user.delete({ where: { id } });

      return {
        message: 'Usuário deletado com sucesso',
        status: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      throw new HttpException(error as string, HttpStatus.BAD_REQUEST);
    }
  }
}