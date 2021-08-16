import { Module } from '@nestjs/common';
import { BoardModule } from './board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';

@Module({
  imports: [BoardModule, TypeOrmModule.forRoot(typeORMConfig)],
})
export class AppModule {}
