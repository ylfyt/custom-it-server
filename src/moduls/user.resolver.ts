import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { User } from '../entities/User';
import { MyContext } from '../types';
import { RegisterInput } from './inputs/RegisterInput';

@Resolver(User)
export class UserResolver {
	@Mutation(() => User, { nullable: true })
	async register(@Arg('data') { username, password }: RegisterInput, @Ctx() { em }: MyContext) {
		const userExist = await em.findOne(User, { username });
		if (userExist) {
			return null;
		}

		const newUser = em.create(User, {
			username,
			password,
		});

		await em.persistAndFlush(newUser);

		return newUser;
	}
}
