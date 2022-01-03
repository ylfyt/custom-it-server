import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../../entities/User';
import { IJwtData, MyContext } from '../../utils/types';
import { RegisterInput } from './RegisterInput';
import bcrypt from 'bcryptjs';
import { LoginInput } from './LoginInput';
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

	@Query(() => User, { nullable: true })
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

	@Mutation(() => Boolean)
	async logout(@Ctx() { em, req, res }: MyContext) {
		if (req.cookies['qid']) {
			res.cookie('qid', '', {
				maxAge: 0,
				secure: true,
				httpOnly: true,
				sameSite: 'none',
			});
			return true;
		} else {
			return false;
		}
	}
}
