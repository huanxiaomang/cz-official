import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('TOKEN_SECRET'),
        signOptions: { expiresIn: '100d' },
      }),
    }),
  ],
  controllers: [CommentController],
  providers: [CommentService, PrismaService],
})
export class CommentModule {}