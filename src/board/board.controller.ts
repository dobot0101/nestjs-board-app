import {
  Controller,
  Param,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  ParseIntPipe,
  Delete,
  Patch,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetMember } from 'src/auth/get-user-decorator';
import { Member } from 'src/auth/member.entity';

@Controller('board')
@UseGuards(AuthGuard())
export class BoardController {
  // boardService: BoardService;
  //   constructor(boardService: BoardService) {
  //     this.boardService = boardService;
  //   }
  private logger = new Logger('BoardController');
  constructor(private boardService: BoardService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetMember() member: Member,
  ): Promise<Board> {
    this.logger.verbose(`Member ${member.name} creating a new board.
    Payload: ${JSON.stringify(createBoardDto)}`);
    return this.boardService.createBoard(createBoardDto, member);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardService.updateBoardStatus(id, status);
  }

  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetMember() member: Member,
  ): Promise<void> {
    return this.boardService.deleteBoard(id, member);
  }

  // DB 방식
  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  @Get()
  getAllBoards(@GetMember() member: Member): Promise<Board[]> {
    this.logger.verbose(`Member ${member.name} trying to get all boards`);
    return this.boardService.getAllBoards(member);
  }

  // 메모리 방식
  // @Get('/')
  // getAllBoards(): Board[] {
  //   return this.boardService.getAllBoards();
  // }

  // @Post()
  // @UsePipes(ValidationPipe)
  // // 아래처럼 하면 request 한번에 다 가져옴
  // // createBoard(@Body() body): Board[] {
  // // createBoard(
  // //   @Body('title') title: string,
  // //   @Body('description') description: string,
  // // ): Board {
  // createBoard(@Body() createBoardDto: CreateBoardDto) {
  //   // console.log(createBoardDto);
  //   // return this.boardService.createBoard(title, description);
  //   return this.boardService.createBoard(createBoardDto);
  // }

  // @Get('/:id')
  // findOne(@Param('id', ParseIntPipe) id: string): Board {
  //   return this.boardService.getBoardById(id);
  // }

  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): void {
  //   this.boardService.deleteBoard(id);
  // }

  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ): Board {
  //   return this.boardService.updateBoardStatus(id, status);
  // }
}
