import { Entity, PrimaryKey, SerializedPrimaryKey, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Like {
	@PrimaryKey()
	_id!: ObjectId;

	@Field((type) => ID)
	@SerializedPrimaryKey()
	id!: string;

	@Field()
	@Property()
	userId!: string;

	@Field()
	@Property()
	productId!: string;

	@Field()
	@Property()
	createAt!: string;
}
