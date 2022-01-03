import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Store } from '../../entities/Store';
import { MyContext } from '../../utils/types';
import { isAuth } from '../user/isAuth';
import { CreateStoreInput } from './CreateStoreInput';
import { UpdateStoreInput } from './UpdateStoreInput';

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
	@UseMiddleware(isAuth)
	async createStore(@Arg('data') { name, address }: CreateStoreInput, @Ctx() { em, req }: MyContext) {
		const str = await em.findOne(Store, { username: req.user?.username });
		if (str) {
			return null;
		}

		const newStore = em.create(Store, { name: name, username: req.user?.username, address: address });
		await em.persistAndFlush(newStore);

		return newStore;
	}

	@Mutation(() => Store, { nullable: true })
	@UseMiddleware(isAuth)
	async updateStore(@Arg('id') id: string, @Arg('data') { name, address }: UpdateStoreInput, @Ctx() { em }: MyContext) {
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
