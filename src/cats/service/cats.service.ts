import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDto } from '../dto/cats.request.dto';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from '../repository/cats.repository';
import { Cat } from '../schema/cats.schema';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async getAllCat() {
    const allCat = await this.catsRepository.findAll();
    const readOnlyCats = allCat.map((cat) => cat.readOnlyData);
    return readOnlyCats;
  }

  async signUp(body: CatRequestDto) {
    const { email, password } = body;

    // 존재여부 파악
    const isCatExist = await this.catsRepository.existsByEmail(email);
    if (isCatExist) throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');

    // 패스워드 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // db저장
    const cat = await this.catsRepository.create({
      ...body,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }

  async uploadImg(cat: Cat, file: any) {
    const fileName = file.key;

    console.log('== fileName == : ', fileName);

    const newCat = await this.catsRepository.findByIdAndUpdateImg(cat.id, fileName);

    console.log('== newCat == : ', newCat);

    return newCat;
  }
}
