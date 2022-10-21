import { Body, Controller, Delete, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { AwsService } from './aws.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly awsService: AwsService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadMediaFile(@UploadedFile() file: Express.Multer.File) {
    console.log('== file == : ', file);

    return await this.awsService.uploadFileToS3('kcis', file);
  }

  @Post('cats')
  getImageUrl(@Body('key') key: string) {
    return this.awsService.getAwsS3FileUrl(key);
  }

  @Delete('cats')
  deleteImage(@Body('key') key: string) {
    return this.awsService.deleteS3Object(key);
  }
}
