import { EntityManager, IDatabaseDriver, Connection } from '@mikro-orm/core';

export interface ProductInterface {
	_id: string;
	name: string;
	description: number;
	price: number;
	stock: number;
	storeId: string;
	image: string;
}

export type MyContext = {
	em: EntityManager<IDatabaseDriver<Connection>>;
};
