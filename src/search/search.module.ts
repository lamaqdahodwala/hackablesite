import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SearchController } from './search.controller';

@Module({
  imports: [PrismaModule],
  providers: [SearchService],
  controllers: [SearchController]
})
export class SearchModule {}
