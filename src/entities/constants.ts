import { Configuration, Connection, IDatabaseDriver, Options } from '@mikro-orm/core';
import { Comment } from './Comment';
import { Like } from './Like';
import { Product } from './Product';
import { Store } from './Store';
import { User } from './User';

export const dbConfig: Configuration<IDatabaseDriver<Connection>> | Options<IDatabaseDriver<Connection>> = {
	entities: [Store, Product, User, Comment, Like],
	dbName: 'custom-it',
	type: 'mongo',
	clientUrl: process.env.DB_CONNECT,
	debug: false,
};
