import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, AuthModule, JwtModule],
  providers: [SeedService]
})
export class SeedModule {}
