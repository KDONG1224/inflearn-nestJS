import { PickType } from '@nestjs/swagger';
import { Cat } from '../schema/cats.schema';

export class CatRequestDto extends PickType(Cat, ['email', 'name', 'password'] as const) {}
