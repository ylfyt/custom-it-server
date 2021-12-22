import { Arg, FieldResolver, Query, Resolver } from 'type-graphql';
import { getManager, getMongoRepository } from 'typeorm';
import { Store } from '../entities/Store';

@Resolver(Store)
export class StoreResolver {
	//   @Query(returns => Recipe)
	//   async recipe(@Arg("id") id: string) {
	//     const recipe = await this.recipeService.findById(id);
	//     if (recipe === undefined) {
	//       throw new RecipeNotFoundError(id);
	//     }
	//     return recipe;
	//   }

	@Query(() => [Store])
	async stores() {
		return await getMongoRepository(Store).find();
	}

	// @Query(() => Store, { nullable: true })
	// async store(@Arg('id') id: string) {
	// 	console.log(id);
	// 	return await getManager().findOne(Store, { id: id });
	// }
}
