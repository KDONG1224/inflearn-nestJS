import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AmazonS3FileInterceptor } from 'nestjs-multer-extended';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { AuthService } from 'src/auth/service/auth.service';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { ReadOnlyCatDto } from '../dto/cat.dto';
import { CatRequestDto } from '../dto/cats.request.dto';
import { Cat } from '../schema/cats.schema';

import { CatsService } from '../service/cats.service';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat) {
    console.log('== cat == : ', cat);
    return cat.readOnlyData;
  }

  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: '성공...',
    type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    console.log('== login : data == : ', data);
    return this.authService.jwtLogIn(data);
  }

  @ApiOperation({ summary: '이미지 업로드' })
  @UseInterceptors(
    AmazonS3FileInterceptor('image', {
      dynamicPath: 'cats',
    }),
  )
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  uploadCatImg(@UploadedFile() file: Array<Express.Multer.File>, @CurrentUser() cat: Cat) {
    console.log('== file == : ', file);
    // return {
    //   image: `http://localhost:8000/media/cats/${file[0].filename}`,
    // };
    return this.catsService.uploadImg(cat, file);
  }

  @ApiOperation({ summary: '모든 고양이 가져오기' })
  @Get('all')
  getAllCat() {
    return this.catsService.getAllCat();
  }
}
