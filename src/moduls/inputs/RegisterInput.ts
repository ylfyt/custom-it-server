import { Length } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class RegisterInput {
	@Field()
	@Length(3, 30)
	username!: string;

	@Field()
	@Length(3)
	password!: string;
}
