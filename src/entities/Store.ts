import { Entity, PrimaryKey, SerializedPrimaryKey, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Field, ID } from 'type-graphql';

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
}
