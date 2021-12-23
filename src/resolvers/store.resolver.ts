import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
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

	@Mutation(() => Store, { nullable: true })
	async createStore(@Arg('name') name: string, @Arg('username') username: string, @Arg('address') address: string, @Ctx() { em }: MyContext) {
		const str = await em.findOne(Store, { username: username });
		if (str) {
			return null;
		}

		const newStore = em.create(Store, { name: name, username: username, address: address });
		await em.persistAndFlush(newStore);

		return newStore;
	}

	@Mutation(() => Store, { nullable: true })
	async updateStore(@Arg('id') id: string, @Arg('name', () => String, { nullable: true }) name: string, @Arg('address', () => String, { nullable: true }) address: string, @Ctx() { em }: MyContext) {
		const store = await em.findOne(Store, { id: id });
		if (!store) {
			return null;
		}

		if (typeof name !== 'undefined') {
			store.name = name;
		}
		if (typeof address !== 'undefined') {
			store.address = address;
		}
		await em.persistAndFlush(store);
		return store;
	}
}
