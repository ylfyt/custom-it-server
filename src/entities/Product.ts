import { Entity, PrimaryKey, SerializedPrimaryKey, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Product {
	@PrimaryKey()
	_id!: ObjectId;

	@Field((type) => ID)
	@SerializedPrimaryKey()
	id!: string;

	@Field()
	@Property()
	name!: string;

	@Field()
	@Property()
	description!: string;

	@Field()
	@Property()
	price!: number;

	@Field()
	@Property()
	stock!: number;

	@Property()
	storeId!: string;

	@Field()
	@Property()
	image!: string;
}
