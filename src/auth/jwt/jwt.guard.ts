import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// 가드에서는 자동으로 strategy를 실행한다.

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
