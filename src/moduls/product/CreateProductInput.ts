import { Length } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateProductInput {
	@Field()
	name!: string;

	@Field()
	description!: string;

	@Field()
	price!: number;

	@Field()
	stock!: number;
}
