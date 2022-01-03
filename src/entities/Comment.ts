import { Entity, PrimaryKey, SerializedPrimaryKey, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Ctx, Field, ID, ObjectType, Root } from 'type-graphql';
import { MyContext } from '../utils/types';
import { User } from './User';

@ObjectType()
@Entity()
export class Comment {
	@PrimaryKey()
	_id!: ObjectId;

	@Field((type) => ID)
	@SerializedPrimaryKey()
	id!: string;

	@Field()
	@Property()
	userId!: string;

	@Field()
	@Property()
	productId!: string;

	@Field()
	@Property()
	text!: string;

	@Field()
	@Property()
	createAt!: string;

	@Field(() => User)
	async user(@Root() comment: Comment, @Ctx() { em }: MyContext) {
		return await em.findOne(User, { id: comment.userId });
	}
}
