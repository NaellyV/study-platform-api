import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],

  exports: [UserService]
})
export class UsersModule {}
