import { Entity, PrimaryKey, SerializedPrimaryKey, Property, OneToMany, ManyToMany, ManyToOne } from '@mikro-orm/core';
import { ObjectId, Collection } from 'mongoose';

@Entity()
export class Store {
	@PrimaryKey()
	_id!: ObjectId;

	@SerializedPrimaryKey()
	id!: string;

	@Property()
	name!: string;

	@Property()
	username!: string;

	@Property()
	address!: string;
}
