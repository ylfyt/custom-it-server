import { Entity, PrimaryKey, SerializedPrimaryKey, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';

@Entity()
export class Product {
	@PrimaryKey()
	_id!: ObjectId;

	@SerializedPrimaryKey()
	id!: string;

	@Property()
	name!: string;

	@Property()
	description!: string;

	@Property()
	price!: number;

	@Property()
	stock!: number;

	@Property()
	storeId!: string;

	@Property()
	image!: string;
}
