import { Configuration, Connection, IDatabaseDriver, Options } from '@mikro-orm/core';
import { Comment } from '../entities/Comment';
import { Like } from '../entities/Like';
import { Product } from '../entities/Product';
import { Store } from '../entities/Store';
import { User } from '../entities/User';
import dotenv from 'dotenv';

dotenv.config();

export const dbConfig: Configuration<IDatabaseDriver<Connection>> | Options<IDatabaseDriver<Connection>> = {
	entities: [Store, Product, User, Comment, Like],
	dbName: 'custom-it',
	type: 'mongo',
	clientUrl: process.env.MODE === 'DEV' ? process.env.DB_CONNECT_DEV : process.env.DB_CONNECT_PROD,
	debug: false,
};
