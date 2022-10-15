import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 404 에러처리 글로벌로 설정
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(8000);
}
bootstrap();
