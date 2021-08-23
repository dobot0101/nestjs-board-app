import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Unique,
  OneToMany,
} from 'typeorm';
import { Board } from 'src/board/board.entity';

@Entity()
@Unique(['name'])
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany((type) => Board, (board) => board.member, { eager: true })
  boards: Board[];
}
