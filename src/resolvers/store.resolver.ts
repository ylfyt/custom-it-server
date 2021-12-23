import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { Product } from '../entities/Product';
import { Store } from '../entities/Store';
import { MyContext } from '../types';

@Resolver(Store)
export class StoreResolver {
	@Query(() => [Store])
	async stores(@Ctx() { em }: MyContext) {
		return await em.find(Store, {});
	}
	@Query(() => Store, { nullable: true })
	async store(@Ctx() { em }: MyContext, @Arg('id') id: string) {
		return await em.findOne(Store, { id: id });
	}

	@FieldResolver(() => [Product])
	async products(@Ctx() { em }: MyContext, @Root() store: Store) {
		return await em.find(Product, { storeId: store.id });
	}
}
