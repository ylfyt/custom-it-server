import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { Like } from '../../entities/Like';
import { IJwtData, MyContext } from '../../types';
import { CreateLikeInput } from './CreateLikeInput';
import jwt from 'jsonwebtoken';

@Resolver(Like)
export class LikeResolver {
	@Mutation(() => Like, { nullable: true })
	async createLike(@Arg('data') { productId }: CreateLikeInput, @Ctx() { em, req }: MyContext) {
		if (!req.cookies['qid']) {
			return null;
		}

		try {
			const { id } = jwt.verify(req.cookies['qid'], process.env.JWT_SECRET!) as IJwtData;

			const userId = id;

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
		} catch (error) {
			return null;
		}
	}
}
