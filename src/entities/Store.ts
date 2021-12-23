import { Field, ID, ObjectType } from 'type-graphql';
import { Entity, ObjectID, ObjectIdColumn, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Store {
	@ObjectIdColumn({ name: 'id' })
	_id!: string;

	@Field((type) => ID)
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
