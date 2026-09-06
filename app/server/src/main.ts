import { ClassSerializerInterceptor, Logger } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import Validate from './common/validate'
import { TransformInterceptor } from './transform.interceptor'
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose'],
  })

  app.useGlobalPipes(new Validate())
  app.useGlobalInterceptors(new TransformInterceptor())
  app.setGlobalPrefix('api')
  app.enableCors();

  // 使用相对路径配置静态资源
  app.useStaticAssets(join(process.cwd(), 'uploads'), { prefix: '/uploads' })

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  Logger.log(`🚀 Application is running on: http://localhost:${port}/api`);
  Logger.log(`🔐 JWT Secret configured: ${process.env.TOKEN_SECRET ? 'YES' : 'NO'}`);
}
bootstrap()
