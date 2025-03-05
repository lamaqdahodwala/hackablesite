import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { InfoController } from './info.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  providers: [InfoService],
  exports: [InfoService],
  controllers: [InfoController]
})
export class InfoModule {}
