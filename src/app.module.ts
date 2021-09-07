import { Module } from '@nestjs/common';
import { BoardModule } from './board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    BoardModule,
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,

    GraphQLModule.forRoot({
      // 자동으로 생성된 스키마를 어디에 저장할지 설정
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // 메모리에 저장 시 사용
      // sortSchema: true,
    }),

    ProductModule,
    // GraphQLModule.forRoot({ debug: false, playground: false }),
  ],
})
export class AppModule {}
