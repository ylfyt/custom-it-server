import { MiddlewareFn } from 'type-graphql';
import jwt from 'jsonwebtoken';

import { IJwtData, MyContext } from '../../types';
import { User } from '../../entities/User';

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
	if (context.req.cookies['qid']) {
		try {
			const token = context.req.cookies['qid'];
			const { id } = jwt.verify(token, process.env.JWT_SECRET!) as IJwtData;

			const user = await context.em.findOne(User, { id });

			if (!user) {
				context.req.userId = null;
				throw new Error('Not Authenticated');
			} else {
				context.req.userId = user.id;
			}
		} catch (error) {
			context.req.userId = null;
			throw new Error('Not Authenticated');
		}
	} else {
		context.req.userId = null;
		throw new Error('Not Authenticated');
	}

	return next();
};
