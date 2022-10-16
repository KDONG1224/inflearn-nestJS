import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // class-validation 사용하려면 설정
  app.useGlobalPipes(new ValidationPipe());

  // 에러처리 글로벌로 설정
  app.useGlobalFilters(new HttpExceptionFilter());

  // swagger 설정
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0.0')
    // .addTag('cats')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // enableCors 설정
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // port 설정
  const PORT = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
