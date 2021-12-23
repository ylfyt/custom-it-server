import { Entity, PrimaryKey, SerializedPrimaryKey, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Ctx, Field, ID, ObjectType, Root } from 'type-graphql';
import { MyContext } from '../types';
import { Store } from './Store';

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

	@Field(() => Store)
	async store(@Root() product: Product, @Ctx() { em }: MyContext) {
		return await em.findOne(Store, { id: product.storeId });
	}
}
