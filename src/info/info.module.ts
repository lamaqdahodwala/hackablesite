import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [InfoService],
  exports: [InfoService]
})
export class InfoModule {}
