import { PrismaService } from '@/prisma/prisma.service'
import { ConfigService } from '@nestjs/config'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(JwtStrategy.name);
  constructor(configService: ConfigService, private prisma: PrismaService) {
    super({
      //解析用户提交的Bearer Token header数据
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //加密码的 secret
      secretOrKey: configService.get('TOKEN_SECRET'),
      ignoreExpiration: false,
    })
    
    this.logger.debug(`JWT Strategy initialized with secret: ${configService.get('TOKEN_SECRET') ? '***' : 'NOT_SET'}`);
  }

  //验证通过后结果用户资料
  async validate(payload: any) {
    this.logger.debug(`Validating JWT payload: ${JSON.stringify(payload)}`);
    
    if (!payload.sub) {
      this.logger.warn('JWT payload missing sub field');
      throw new UnauthorizedException('Invalid token payload');
    }
    
    // 强制转换userId为Number，避免类型不一致
    const userId = Number(payload.sub);
    
    const user = await this.prisma.user.findUnique({
      where: { userId },
    })
    
    if (!user) {
      this.logger.warn(`User not found for userId: ${userId}`);
      throw new UnauthorizedException('User not found');
    }
    
    this.logger.debug(`User validated: ${user.username} (role: ${user.role})`);
    return user;
  }
}
