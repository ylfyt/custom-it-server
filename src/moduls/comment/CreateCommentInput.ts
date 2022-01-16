import { Length } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateCommentInput {
	@Field()
	productId!: string;

	@Field()
	@Length(2)
	text!: string;
}
