import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { MikroORM } from '@mikro-orm/core';
import { buildSchema } from 'type-graphql';

import { StoreResolver } from './moduls/store.resolver';
import { ProductResolver } from './moduls/product.resolver';
import { dbConfig } from './constants';
import { UserResolver } from './moduls/user.resolver';

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
			resolvers: [StoreResolver, ProductResolver, UserResolver],
		});

		const apolloServer = new ApolloServer({
			schema: schema,
			context: (req: Request, res: Response) => ({ em: orm.em, req: req, res: res }),
		});
		await apolloServer.start();

		const cors = {
			credentials: true,
			origin: 'https://studio.apollographql.com',
		};

		apolloServer.applyMiddleware({ app, cors });

		app.listen(PORT, () => {
			console.log(`Server is listening on port ${PORT} | http://localhost:${PORT}`);
		});
	});
};

main();
