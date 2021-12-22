import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Product {
	@ObjectIdColumn()
	id!: ObjectID;

	@Column()
	name!: string;

	@Column()
	description!: string;

	@Column()
	price!: number;

	@Column()
	stock!: number;

	@Column()
	storeId!: string;

	@Column()
	image!: string;
}
