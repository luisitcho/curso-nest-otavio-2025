import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ParseIntIdPipe } from './common/pipes/parse-int-id.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove chaves que não estão no DTO
      forbidNonWhitelisted: true, // lança erro se chaves não estão no DTO
      transform: false, // converte tipos de dados (ex: string para number)
    }),
    new ParseIntIdPipe(), // Custom pipe to parse integer IDs
  );
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
