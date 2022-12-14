import { PickType } from '@nestjs/swagger';
import { Cat } from 'src/cats/schema/cats.schema';

export class LoginRequestDto extends PickType(Cat, ['email', 'password'] as const) {}
