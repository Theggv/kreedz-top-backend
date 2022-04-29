import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { setupSwagger } from './util/setupSwagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ credentials: true, origin: process.env.CORS_ORIGIN });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  setupSwagger(app);

  const PORT = Number(process.env.PORT);
  await app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
}

bootstrap();
