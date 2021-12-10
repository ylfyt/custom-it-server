import express from 'express';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';

import schema from './schema/schema';

const app = express();

app.use(express.static('public'));

app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		graphiql: true,
	})
);

app.get('/', (req, res) => {
	res.send(process.env.BASE_URL);
});

dotenv.config();
const PORT = process.env.PORT || 4000;
const DB_CONNECT = process.env.DB_CONNECT!;

mongoose.connect(DB_CONNECT, () => {
	console.log('Database is connected ...');
	app.listen(PORT, () => {
		console.log(`Server is listening on port ${PORT} | http://localhost:${PORT}`);
	});
});
