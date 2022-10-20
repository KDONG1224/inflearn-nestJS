// base
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// mongoose
import { Document, SchemaOptions } from 'mongoose';

// class-validator
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Comments } from 'src/comments/schema/comments.schema';

const options: SchemaOptions = {
  timestamps: true, // create, update 날짜 노출 여부
  versionKey: false, // __v : 버전키 노출 여부 default: true
};

@Schema(options)
export class Cat extends Document {
  @ApiProperty({
    example: 'example@naver.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'kdong',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '1234',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  password: string;

  @Prop({
    default: 'https://kdong1224.github.io/portfolio/assets/img/main.jpg',
  })
  @IsString()
  imgUrl: string;

  readonly readOnlyData: { id: string; email: string; name: string; imgUrl: string };

  readonly comments: Comments[];
}

const _CatSchema = SchemaFactory.createForClass(Cat);

_CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: `https://kdong-nest-cat.s3.ap-northeast-2.amazonaws.com/${this.imgUrl}`,
    comments: this.comments,
  };
});

_CatSchema.virtual('comments', {
  ref: 'comments',
  localField: '_id',
  foreignField: 'info',
});

_CatSchema.set('toObject', { virtuals: true });
_CatSchema.set('toJSON', { virtuals: true });

export const CatSchema = _CatSchema;
