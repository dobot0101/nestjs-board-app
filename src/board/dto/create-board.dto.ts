import { IsNotEmpty } from 'class-validator';
export class CreateBoardDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;
}
