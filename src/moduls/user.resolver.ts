import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { User } from '../entities/User';
import { IJwtData, MyContext } from '../types';
import { RegisterInput } from './inputs/RegisterInput';
import bcrypt from 'bcryptjs';
import { LoginInput } from './inputs/LoginInput';
import jwt from 'jsonwebtoken';

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

	@Mutation(() => User, { nullable: true })
	async login(@Arg('data') { username, password }: LoginInput, @Ctx() { em, res }: MyContext) {
		const user = await em.findOne(User, { username });

		if (!user) {
			return null;
		}

		if (user.username !== username) {
			return null;
		}

		if (!bcrypt.compareSync(password, user.password)) {
			return null;
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
		res.cookie('qid', token, {
			secure: true,
			httpOnly: true,
			sameSite: 'none',
		});

		return user;
	}

	@Mutation(() => User, { nullable: true })
	async me(@Ctx() { req, em }: MyContext) {
		if (!req.cookies['qid']) {
			return null;
		}

		try {
			const { id } = jwt.verify(req.cookies['qid'], process.env.JWT_SECRET!) as IJwtData;

			const user = await em.findOne(User, { id });
			return user;
		} catch (error) {
			return null;
		}
	}
}
