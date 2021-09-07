import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class ProductResolver {
  @Query(() => Boolean)
  isProductGood(): boolean {
    return true;
  }
}
