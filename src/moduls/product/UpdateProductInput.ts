import { Length } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class UpdateProductInput {
	@Field({ nullable: true })
	name!: string;

	@Field({ nullable: true })
	description!: string;
}
