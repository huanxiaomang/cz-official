import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get('ping')
  ping() {
    return { status: 'ok' };
  }
}