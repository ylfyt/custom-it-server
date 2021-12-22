// import { Entity, PrimaryKey, SerializedPrimaryKey, Property } from '@mikro-orm/core';
// import { ObjectId } from 'mongoose';

// @Entity()
// export class Store {
// 	@PrimaryKey()
// 	_id!: ObjectId;

// 	@SerializedPrimaryKey()
// 	id!: string;

// 	@Property({ type: String })
// 	name!: string;

// 	@Property({ unique: true })
// 	username!: string;

// 	@Property({ nullable: false })
// 	address!: string;

// 	constructor(name: string, username: string, address: string) {
// 		this.name = name;
// 		this.username = username;
// 		this.address = address;
// 	}
// }

import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Store {
	@ObjectIdColumn()
	id!: ObjectID;

	@Column()
	name!: string;

	@Column()
	username!: string;

	@Column()
	address!: string;
}