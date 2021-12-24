import { Entity, PrimaryKey, SerializedPrimaryKey, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Ctx, Field, ID, ObjectType, Root } from 'type-graphql';
import { MyContext } from '../types';
import { Product } from './Product';

@ObjectType()
@Entity()
export class Store {
	@PrimaryKey()
	_id!: ObjectId;

	@Field((type) => ID)
	@SerializedPrimaryKey()
	id!: string;

	@Field()
	@Property({ type: String })
	name!: string;

	@Field()
	@Property({ unique: true })
	username!: string;

	@Field()
	@Property({ nullable: false })
	address!: string;

	@Field(() => [Product])
	async products(@Ctx() { em }: MyContext, @Root() store: Store) {
		return await em.find(Product, { storeId: store.id });
	}
}
