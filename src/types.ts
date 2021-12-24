import { EntityManager, IDatabaseDriver, Connection } from '@mikro-orm/core';
import { Request, Response } from 'express';

export interface ProductInterface {
	_id: string;
	name: string;
	description: number;
	price: number;
	stock: number;
	storeId: string;
	image: string;
}

export interface IJwtData {
	id: string;
}

export type MyContext = {
	em: EntityManager<IDatabaseDriver<Connection>>;
	req: Request;
	res: Response;
};
