import { Length } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class UpdateStoreInput {
	@Field()
	name!: string;

	@Field()
	address!: string;
}
