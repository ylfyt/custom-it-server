import express from 'express';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import { MikroORM } from '@mikro-orm/core';

import schema from './schema/schema';
import { Product } from './entities/Product';
import { Store } from './entities/Store';

// app.use(express.static('public'));

// app.use(
// 	'/graphql',
// 	graphqlHTTP({
// 		schema: schema,
// 		graphiql: true,
// 	})
// );

// mongoose.connect(DB_CONNECT, () => {
// 	console.log('Database is connected ...');
// });

const main = async () => {
	const orm = await MikroORM.init({
		entities: [Product, Store],
		dbName: 'custom-it',
		type: 'mongo',
		clientUrl: 'mongodb://localhost:27017',
		debug: false,
	});

	const app = express();

	app.get('/', (req, res) => {
		res.send('Hello');
	});

	dotenv.config();
	const PORT = process.env.PORT || 4000;

	app.listen(PORT, () => {
		console.log(`Server is listening on port ${PORT} | http://localhost:${PORT}`);
	});
};

main();
