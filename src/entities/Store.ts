import { ObjectID } from 'mongodb';
import { Field, ID, ObjectType } from 'type-graphql';
import { Entity, ObjectID as ObjectIDType, ObjectIdColumn, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Store {
	@ObjectIdColumn()
	_id!: ObjectIDType;

	@Field((type) => ID)
	@PrimaryColumn()
	id!: string;

	@Field()
	@Column()
	name!: string;

	@Field()
	@Column()
	username!: string;

	@Field()
	@Column()
	address!: string;
}
