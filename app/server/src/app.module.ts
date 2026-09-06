import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UploadModule } from './upload/upload.module';
import { ProjectModule } from './project/project.module';
import { MessageModule } from './message/message.module';
import { WinnersModule } from './winners/winners.module';
import { CommentModule } from './comment/comment.module';
import { ActivityModule } from './activity/activity.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UploadModule,
    ProjectModule,
    MessageModule,
    WinnersModule,
    CommentModule,  // 评论模块
    ActivityModule,
    HealthModule,
  ]
})
export class AppModule { }
