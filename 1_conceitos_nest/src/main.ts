import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove chaves que não estão no DTO
      forbidNonWhitelisted: true, // lança erro se chaves não estão no DTO
      transform: false, // converte tipos de dados (ex: string para number)
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
