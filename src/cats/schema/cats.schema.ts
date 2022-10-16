// base
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// mongoose
import { Document, SchemaOptions } from 'mongoose';

// class-validator
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

  @Prop()
  @IsString()
  imgUrl: string;

  readonly readOnlyData: { id: string; email: string; name: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  };
});
