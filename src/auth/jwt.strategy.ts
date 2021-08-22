import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberRepository } from './member.repository';
import { Member } from './member.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(MemberRepository)
    private memberRepository: MemberRepository,
  ) {
    super({
      secretOrKey: 'jwt_secret_key',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { name } = payload;
    const member: Member = await this.memberRepository.findOne({ name });
    if (!member) {
      throw new UnauthorizedException();
    }
    return member;
  }
}
