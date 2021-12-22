import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import { createConnection, getMongoRepository } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';

import { buildSchema, ID } from 'type-graphql';
import { StoreResolver } from './resolver/store.resolver';
import { Store } from './entities/Store';
import { ObjectID } from 'mongodb';

const main = async () => {
	const app = express();
	dotenv.config();
	const PORT = process.env.PORT || 4000;

	app.get('/', (req, res) => {
		res.send('Hello ');
	});

	const schema = await buildSchema({
		resolvers: [StoreResolver],
	});

	const apolloServer = new ApolloServer({
		schema: schema,
	});

	await apolloServer.start();
	apolloServer.applyMiddleware({ app });

	createConnection({
		type: 'mongodb',
		url: process.env.DB_CONNECT,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		synchronize: true,
		logging: true,
		entities: ['dist/entities/*.{ts,js}'],
	})
		.then(async (connection) => {
			console.log('Mongodb is connected');

			app.listen(PORT, () => {
				console.log(`Server is listening on port ${PORT} | http://localhost:${PORT}`);
			});

			const str = await getMongoRepository(Store).findOne({ _id: new ObjectID('61b36e3ff59c45a4aa9f2fa4') });
			console.log(str);
		})
		.catch((error) => {
			console.log(error.message);
		});
};

main();
