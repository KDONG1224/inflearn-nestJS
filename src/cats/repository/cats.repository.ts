import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatRequestDto } from '../dto/cats.request.dto';
import { Cat } from '../schema/cats.schema';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async findAll() {
    return await this.catModel.find();
  }

  async findByIdAndUpdateImg(catId: string, fileName: string) {
    console.log(catId);
    const cat = await this.catModel.findById(catId);

    cat.imgUrl = `http://localhost:8000/media/${fileName}`;

    const newCat = await cat.save();

    console.log('== newCat == : ', newCat);

    return newCat.readOnlyData;
  }

  async findCatByIdWithoutPassword(catId: string): Promise<Cat | null> {
    // select 문법
    // 패스워드를 빼고 가지고 오고 싶다면 -> select('-password');
    // 이메일과 이름만 가지고 오고 싶다면 -> select('email name')
    const cat = await this.catModel.findById(catId).select('-password');
    return cat;
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async existsByEmail(email: string): Promise<boolean> {
    try {
      const result = (await this.catModel.exists({ email })) ? true : false;

      return result;
    } catch (error) {
      throw new HttpException('db error', 400);
    }
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }
}
