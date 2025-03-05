import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setViewEngine('hbs')
  app.setBaseViewsDir(join(__dirname, "..", "views"))
  app.use(cookieParser())
  

  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
