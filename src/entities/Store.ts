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
