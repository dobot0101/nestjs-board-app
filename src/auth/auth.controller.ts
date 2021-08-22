import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetMember } from './get-user-decorator';
import { Member } from './member.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    // dto에 있는 유효성 검사를 하려면 ValidationPipe를 넣어줘야함
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  // test(@Req() req) {
  // 커스텀 데코레이터 사용 예시
  test(@GetMember() member: Member) {
    // console.log('req', req);
    console.log('member', member);
  }
}
