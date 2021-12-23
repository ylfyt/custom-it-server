import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { MikroORM } from '@mikro-orm/core';

import { buildSchema, ID } from 'type-graphql';
import { StoreResolver } from './resolvers/store.resolver';
import { Store } from './entities/Store';
import { Product } from './entities/Product';

const main = async () => {
	const app = express();
	dotenv.config();
	const PORT = process.env.PORT || 4000;

	app.get('/', (req, res) => {
		res.send('Hello ');
	});

	MikroORM.init({
		entities: [Store, Product],
		dbName: 'custom-it',
		type: 'mongo',
		clientUrl: process.env.DB_CONNECT,
		debug: false,
	}).then(async (orm) => {
		console.log('Database is connected!!');

		const schema = await buildSchema({
			resolvers: [StoreResolver],
		});

		const apolloServer = new ApolloServer({
			schema: schema,
			context: () => ({ em: orm.em }),
		});
		await apolloServer.start();
		apolloServer.applyMiddleware({ app });

		app.listen(PORT, () => {
			console.log(`Server is listening on port ${PORT} | http://localhost:${PORT}`);
		});
	});
};

main();
