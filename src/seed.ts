import { NestFactory } from "@nestjs/core";
import { SeedModule } from "./seed/seed.module";
import { SeedService } from "./seed/seed.service";
import { AppModule } from "./app.module";

async function bootstrap() {
  NestFactory.createApplicationContext(AppModule)
    .then((appContext) => {
      const seeder = appContext.get(SeedService);
      seeder
        .seedDatabase()
        .then(() => {
          console.log("Finished successfully")
        })
        .catch((error) => {
          console.log("Failed")
          throw error;
        })
        .finally(() => appContext.close());
    })
    .catch((error) => {
      throw error;
    });
}
bootstrap();
