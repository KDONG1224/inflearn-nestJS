import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/module/auth.module';
import { Comments, CommentsSchema } from 'src/comments/schema/comments.schema';
import { CatsController, CatsService } from '..';
import { CatsRepository } from '../repository/cats.repository';
import { Cat, CatSchema } from '../schema/cats.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cat.name, schema: CatSchema },
      { name: Comments.name, schema: CommentsSchema },
    ]),
    MulterModule.register({
      dest: './upload',
    }),
    forwardRef(() => AuthModule),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}
