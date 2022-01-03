import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { Like } from '../../entities/Like';
import { MyContext } from '../../utils/types';
import { CreateLikeInput } from './CreateLikeInput';
import { isAuth } from '../user/isAuth';

@Resolver(Like)
export class LikeResolver {
	@Mutation(() => Like, { nullable: true })
	@UseMiddleware(isAuth)
	async createLike(@Arg('data') { productId }: CreateLikeInput, @Ctx() { em, req }: MyContext) {
		const userId = req.user?.id;

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
