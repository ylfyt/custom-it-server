import express from 'express';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';

import { createConnection } from 'typeorm';
import { Store } from './entities/Store';
import 'reflect-metadata';

const app = express();

// app.use(express.static('public'));

// app.use(
// 	'/graphql',
// 	graphqlHTTP({
// 		schema: schema,
// 		graphiql: true,
// 	})
// );

dotenv.config();
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
	res.send('Hello ');
});

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
	})
	.catch((error) => {
		console.log(error.message);
	});
