import { Length } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateLikeInput {
	@Field()
	productId!: string;
}
