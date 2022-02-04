import { Entity, PrimaryKey, SerializedPrimaryKey, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Ctx, Field, ID, ObjectType, Root } from 'type-graphql';
import { MyContext } from '../utils/types';
import { Store } from './Store';

@ObjectType()
@Entity()
export class User {
	@PrimaryKey()
	_id!: ObjectId;

	@Field((type) => ID)
	@SerializedPrimaryKey()
	id!: string;

	@Field()
	@Property({ unique: true })
	username!: string;

	@Field(() => Boolean)
	async isStore(@Root() user: User, @Ctx() { em }: MyContext) {
		const str = await em.findOne(Store, { username: user.username });
		if (str) {
			return true;
		} else {
			return false;
		}
	}

	@Property()
	password!: string;
}
