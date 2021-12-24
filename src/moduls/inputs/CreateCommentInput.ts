import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateCommentInput {
	@Field()
	productId!: string;

	@Field()
	userId!: string;

	@Field()
	text!: string;
}
