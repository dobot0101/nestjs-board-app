import { Controller, Param, Get } from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './board.entity';

@Controller('board')
export class BoardController {
  // boardService: BoardService;
  //   constructor(boardService: BoardService) {
  //     this.boardService = boardService;
  //   }

  constructor(private boardService: BoardService) {}

  // DB 방식
  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
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
