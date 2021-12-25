import { Length } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateStoreInput {
	@Field()
	name!: string;

	@Field()
	username!: string;

	@Field()
	address!: string;
}
