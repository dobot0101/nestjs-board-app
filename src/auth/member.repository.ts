import { EntityRepository, Repository } from 'typeorm';
import { Member } from './member.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import * as bcrypt from 'bcryptjs';

@EntityRepository(Member)
export class MemberRepository extends Repository<Member> {
  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { name, password } = authCredentialDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ name, password: hashedPassword });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Existing member name');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
