import { Module } from '@nestjs/common';
import { RoutesController } from './routes.controller';
import { InfoModule } from 'src/info/info.module';
import {UsersModule} from 'src/users/users.module'

@Module({
  controllers: [RoutesController],
  imports: [InfoModule, UsersModule]
})
export class RoutesModule {}
