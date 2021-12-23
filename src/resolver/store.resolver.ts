import { Arg, FieldResolver, Query, Resolver } from 'type-graphql';
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
	@Query(() => [Store], { nullable: true })
	async stores() {
		// return await getMongoRepository(Store).find();
		return null;
	}
	// @Query(() => Store, { nullable: true })
	// async store(@Arg('id') id: string) {
	// 	console.log(id);
	// 	return await getManager().findOne(Store, { id: id });
	// }
}
