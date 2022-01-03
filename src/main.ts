import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // request로 들어오는 정보가 유효한 정보인지 필터링 해줌
    }),
  );
  await app.listen(3000);
}
bootstrap();
