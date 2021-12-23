import { query } from 'express';
import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { Product } from '../entities/Product';
import { Store } from '../entities/Store';
import { MyContext } from '../types';

@Resolver(Product)
export class ProductResolver {
	@Query(() => [Product])
	async products(@Ctx() { em }: MyContext) {
		return await em.find(Product, {});
	}

	@Query(() => Product)
	async product(@Ctx() { em }: MyContext, @Arg('id') id: string) {
		return await em.findOne(Product, { id: id });
	}

	@FieldResolver(() => Store)
	async store(@Root() product: Product, @Ctx() { em }: MyContext) {
		return await em.findOne(Store, { id: product.storeId });
	}
}
