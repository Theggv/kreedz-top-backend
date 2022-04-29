import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ credentials: true, origin: process.env.CORS_ORIGIN });
  app.useGlobalPipes(new ValidationPipe());

  const PORT = Number(process.env.PORT);
  await app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
}

bootstrap();
