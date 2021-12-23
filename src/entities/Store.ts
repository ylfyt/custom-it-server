import { Entity, PrimaryKey, SerializedPrimaryKey, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Store {
	@PrimaryKey()
	_id!: ObjectId;

	@Field((type) => String)
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
}
