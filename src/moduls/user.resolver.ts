import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { User } from '../entities/User';
import { MyContext } from '../types';
import { RegisterInput } from './inputs/RegisterInput';
import bcrypt from 'bcryptjs';

@Resolver(User)
export class UserResolver {
	@Mutation(() => User, { nullable: true })
	async register(@Arg('data') { username, password }: RegisterInput, @Ctx() { em }: MyContext) {
		const userExist = await em.findOne(User, { username });
		if (userExist) {
			return null;
		}
		const salt = bcrypt.genSaltSync(10);
		const hashPassword = bcrypt.hashSync(password, salt);

		const newUser = em.create(User, {
			username,
			password: hashPassword,
		});

		await em.persistAndFlush(newUser);

		return newUser;
	}
}
