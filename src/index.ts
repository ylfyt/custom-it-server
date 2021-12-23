import express from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { MikroORM } from '@mikro-orm/core';

import { buildSchema, ID } from 'type-graphql';
import { StoreResolver } from './resolver/store.resolver';
import { Store } from './entities/Store';
import { Product } from './entities/Product';

const main = async () => {
	const app = express();
	dotenv.config();
	const PORT = process.env.PORT || 4000;

	app.get('/', (req, res) => {
		res.send('Hello ');
	});

	// const schema = await buildSchema({
	// 	resolvers: [StoreResolver],
	// });

	// const apolloServer = new ApolloServer({
	// 	schema: schema,
	// });

	const orm = await MikroORM.init({
		entities: [Store, Product],
		dbName: 'custom-it',
		type: 'mongo',
		clientUrl: 'mongodb://localhost:27017',
		debug: false,
	});

	app.listen(PORT, () => {
		console.log(`Server is listening on port ${PORT} | http://localhost:${PORT}`);
	});

	const str = await orm.em.find(Store, { id: '61c42c37e9b6d931c8b1ddf9' });
	console.log(str);
};

main();
