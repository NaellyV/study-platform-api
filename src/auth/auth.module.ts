import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../../src/modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../../src/modules/users/users.service';
import { PrismaService } from '../../src/database/PrismaService';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '43200s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, PrismaService],
})
export class AuthModule {}