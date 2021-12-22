import { ObjectId } from 'mongoose';
import { Field, ID, ObjectType } from 'type-graphql';
import { Entity, ObjectID, ObjectIdColumn, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Store {
	@Field()
	@ObjectIdColumn()
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
