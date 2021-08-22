import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberRepository } from './member.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(MemberRepository)
    private memberRepository: MemberRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.memberRepository.createUser(authCredentialDto);
  }

  async signIn(
    authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    const { name, password } = authCredentialDto;
    const user = await this.memberRepository.findOne({ name });

    if (user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성(secret + payload)
      const payload = { name };
      // const accessToken = await this.jwtService.sign(payload);
      const accessToken = this.jwtService.sign(payload);
      return { accessToken: accessToken };

      // return 'login success';
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
