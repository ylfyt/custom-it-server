import { Entity, PrimaryKey, SerializedPrimaryKey, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Ctx, Field, ID, ObjectType, Root } from 'type-graphql';

@ObjectType()
@Entity()
export class Comment {
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
	text!: string;
}
