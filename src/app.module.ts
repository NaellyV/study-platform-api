import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaClient } from '@prisma/client';
import { UsersModule } from './modules/users/users.module';
import { DisciplinesModule } from './modules/disciplines/disciplines.module';
import { ContentModule } from './modules/content/content.module';
import { SchedulesModule } from './modules/schedules/schedules.module';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [AuthModule, PrismaClient, UsersModule, DisciplinesModule, ContentModule, SchedulesModule, TasksModule],

})
export class AppModule {}
