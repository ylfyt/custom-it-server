import { Entity, PrimaryKey, SerializedPrimaryKey, Property, OneToMany, ManyToMany, ManyToOne } from '@mikro-orm/core';
import { ObjectId, Collection } from 'mongoose';

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
