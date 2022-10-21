// base
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// modules
import { CatsModule } from './cats/module/cats.module';

// controllers
import { AppController } from './app.controller';

// services
import { AppService } from './app.service';

// common
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AuthModule } from './auth/module/auth.module';
import { CommentsModule } from './comments/module/comments.module';

// libraries
import * as mongoose from 'mongoose';
import { AwsService } from './aws.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    CatsModule,
    AuthModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AwsService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');

    mongoose.set('debug', this.isDev);
  }
}
