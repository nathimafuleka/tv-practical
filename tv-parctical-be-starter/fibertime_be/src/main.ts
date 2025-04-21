import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // Remove trailing slash
  app.enableCors(); // Enable CORS for frontend
  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
