import { JwtStrategy } from './strategy/jwt.strategy'
import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { VerificationCodeService } from './verification-code.service'
import { RedisService } from '../redis/redis.service'
import { MailService } from '../mail/mail.service'
import { PrismaService } from '../prisma/prisma.service'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('TOKEN_SECRET'),
          signOptions: { expiresIn: '100d' },
        }
      },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    VerificationCodeService,
    RedisService,
    MailService,
    PrismaService
  ],
  controllers: [AuthController],
})
export class AuthModule {}
