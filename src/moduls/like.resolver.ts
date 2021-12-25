import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { Like } from '../entities/Like';
import { MyContext } from '../types';
import { CreateLikeInput } from './inputs/CreateLikeInput';

@Resolver(Like)
export class LikeResolver {
	@Mutation(() => Like, { nullable: true })
	async createLike(@Arg('data') { productId, userId }: CreateLikeInput, @Ctx() { em }: MyContext) {
		const like = await em.findOne(Like, { userId: userId, productId: productId });

		if (like) {
			return null;
		}

		const newLike = em.create(Like, {
			productId,
			userId,
			createAt: new Date(),
		});
		await em.persistAndFlush(newLike);
		return newLike;
	}
}
