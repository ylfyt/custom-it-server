import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Comment } from '../../entities/Comment';
import { MyContext } from '../../types';
import { CreateCommentInput } from './CreateCommentInput';

@Resolver(Comment)
export class CommentResolver {
	@Query(() => [Comment])
	async comments(@Ctx() { em }: MyContext) {
		return await em.find(Comment, {});
	}

	@Query(() => Comment, { nullable: true })
	async comment(@Arg('id') id: string, @Ctx() { em }: MyContext) {
		return await em.findOne(Comment, { id });
	}

	@Mutation(() => Comment, { nullable: true })
	async createComment(@Arg('data') { productId, userId, text }: CreateCommentInput, @Ctx() { em }: MyContext) {
		const newComment = em.create(Comment, {
			productId,
			userId,
			createAt: new Date(),
			text,
		});
		await em.persistAndFlush(newComment);
		return newComment;
	}
}
