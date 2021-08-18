import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberRepository } from './member.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(MemberRepository)
    private memberRepository: MemberRepository,
  ) {}

  signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.memberRepository.createUser(authCredentialDto);
  }
}
