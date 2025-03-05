import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { RoutesModule } from './routes/routes.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SearchModule } from './search/search.module';
import { SeedModule } from './seed/seed.module';
import { JwtModule } from '@nestjs/jwt';
import { InfoModule } from './info/info.module';
import { TransfersModule } from './transfers/transfers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    RoutesModule,
    AuthModule,
    UsersModule,
    SearchModule,
    SeedModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get("JWT_SECRET")
        }
      },
      inject: [ConfigService]
    }),
    InfoModule,
    TransfersModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
