import { Arg, Ctx, Query, Resolver } from 'type-graphql';
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
}
