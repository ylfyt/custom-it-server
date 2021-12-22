import express from 'express';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import mongoose, { connection } from 'mongoose';
// import { MikroORM } from '@mikro-orm/core';

import schema from './schema/schema';
import { createConnection } from 'typeorm';
import { Store } from './entities/Store';
import 'reflect-metadata';
// import { Product } from './entities/Product';
// import { Store } from './entities/Store';

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

const app = express();

dotenv.config();
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
	res.send('Hello ');
});

createConnection()
	.then(async (connection) => {
		console.log('DB is connected');

		app.listen(PORT, () => {
			console.log(`Server is listening on port ${PORT} | http://localhost:${PORT}`);
		});

		const strs = await connection.manager.find(Store);
		console.log(strs);
	})
	.catch((error) => {
		console.log(error.message);
	});
