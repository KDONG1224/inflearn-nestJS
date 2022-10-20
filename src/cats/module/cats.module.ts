import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { MulterExtendedModule } from 'nestjs-multer-extended';
import { AuthModule } from 'src/auth/module/auth.module';
import { Comments, CommentsSchema } from 'src/comments/schema/comments.schema';
import { CatsController, CatsService } from '..';
import { CatsRepository } from '../repository/cats.repository';
import { Cat, CatSchema } from '../schema/cats.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: Cat.name, schema: CatSchema },
      { name: Comments.name, schema: CommentsSchema },
    ]),
    MulterModule.register({
      dest: './upload',
    }),
    MulterExtendedModule.register({
      awsConfig: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_KEY,
        region: process.env.AWS_S3_REGION,
      },
      bucket: process.env.AWS_S3_BUCKET_NAME,
      basePath: 'kcis',
      fileSize: 1 * 1024 * 1024,
    }),
    forwardRef(() => AuthModule),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}
