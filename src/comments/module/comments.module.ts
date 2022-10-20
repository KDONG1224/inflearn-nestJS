import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from 'src/cats/module/cats.module';
import { CommentsController } from '../controller/comments.controller';
import { Comments, CommentsSchema } from '../schema/comments.schema';
import { CommentsService } from '../service/comments.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comments.name, schema: CommentsSchema }]),
    CatsModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
