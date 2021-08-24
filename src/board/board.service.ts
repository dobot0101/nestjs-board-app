import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { exception } from 'console';
import { Member } from 'src/auth/member.entity';

@Injectable()
export class BoardService {
  // DB 방식
  constructor(
    @InjectRepository(BoardRepository) private boardRepository: BoardRepository,
  ) {}

  // 게시물 생성
  async createBoard(
    createBoardDto: CreateBoardDto,
    member: Member,
  ): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, member);
  }

  // 게시물 삭제
  async deleteBoard(id: number, member: Member): Promise<void> {
    // const result = await this.boardRepository.delete(id);
    const result = await this.boardRepository.delete({ id, member });

    // delete 사용할 경우 삭제할 데이터가 있는지 알림
    if (result.affected === 0) {
      throw new NotFoundException(`can't find Board with id ${id}`);
    }
    console.log('result', result);
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`can't find board with id ${id}`);
    }
    return found;
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }

  async getAllBoards(member: Member): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board');
    query.where('board.memberId = :memberId', { memberId: member.id });
    const boards = await query.getMany();
    return boards;
    // return this.boardRepository.find();
  }

  // 메모리 방식
  // private boards: Board[] = [];
  // getAllBoards(): Board[] {
  //   return this.boards;
  // }
  // // createBoard(title: string, description: string) {
  // //   const board: Board = {
  // //     id: uuid(),
  // //     title,
  // //     description,
  // //     status: BoardStatus.PUBLIC,
  // //   };
  // //   this.boards.push(board);
  // //   return board;
  // // }
  // createBoard(createBoardDto: CreateBoardDto) {
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(board);
  //   return board;
  // }
  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`can't find board with id ${id}`);
  //   }
  //   return found;
  // }
  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
