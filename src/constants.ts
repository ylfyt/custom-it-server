import { Configuration, Connection, IDatabaseDriver, Options } from '@mikro-orm/core';
import { Product } from './entities/Product';
import { Store } from './entities/Store';
import { User } from './entities/User';

export const dbConfig: Configuration<IDatabaseDriver<Connection>> | Options<IDatabaseDriver<Connection>> = {
	entities: [Store, Product, User],
	dbName: 'custom-it',
	type: 'mongo',
	clientUrl: process.env.DB_CONNECT,
	debug: false,
};
