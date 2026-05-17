import { Module } from '@nestjs/common';
import { WinnersController } from '../controllers/winners.controller';
import { WinnerService } from '../services/winners.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WinnersController],
  providers: [WinnerService]
})
export class WinnersModule {}
