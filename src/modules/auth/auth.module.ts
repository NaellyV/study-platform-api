import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import { PrismaService } from '../../database/PrismaService';

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