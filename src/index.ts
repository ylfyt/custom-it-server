import express from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { MikroORM } from '@mikro-orm/core';
import { buildSchema } from 'type-graphql';

import { StoreResolver } from './moduls/store/store.resolver';
import { ProductResolver } from './moduls/product/product.resolver';
import { dbConfig } from './entities/constants';
import { UserResolver } from './moduls/user/user.resolver';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { CommentResolver } from './moduls/comment/comment.resolver';
import { LikeResolver } from './moduls/like/like.resolver';

const main = async () => {
	const app = express();
	dotenv.config();
	const PORT = process.env.PORT || 4000;

	app.get('/', (req, res) => {
		res.send('Hello ');
	});

	MikroORM.init(dbConfig).then(async (orm) => {
		console.log('Database is connected!!');

		const schema = await buildSchema({
			resolvers: [StoreResolver, ProductResolver, UserResolver, CommentResolver, LikeResolver],
		});

		const apolloServer = new ApolloServer({
			schema: schema,
			context: ({ req, res }) => ({ em: orm.em, req: req, res: res }),
		});
		await apolloServer.start();

		app.use(express.static('public'));
		app.use(
			cors({
				credentials: true,
				origin: ['https://studio.apollographql.com', 'http://localhost:3000'],
			})
		);

		app.use(cookieParser());

		apolloServer.applyMiddleware({ app, cors: false });

		app.listen(PORT, () => {
			console.log(`Server is listening on port ${PORT} | http://localhost:${PORT}`);
		});
	});
};

main();
