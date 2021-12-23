import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Product } from '../entities/Product';
import { Store } from '../entities/Store';
import { MyContext } from '../types';

@Resolver(Product)
export class ProductResolver {
	@Query(() => [Product])
	async products(@Ctx() { em }: MyContext) {
		return await em.find(Product, {});
	}

	@Query(() => Product)
	async product(@Ctx() { em }: MyContext, @Arg('id') id: string) {
		return await em.findOne(Product, { id: id });
	}

	@FieldResolver(() => Store)
	async store(@Root() product: Product, @Ctx() { em }: MyContext) {
		return await em.findOne(Store, { id: product.storeId });
	}

	@Mutation(() => Product)
	async createProduct(
		@Arg('name') name: string,
		@Arg('description') description: string,
		@Arg('price') price: number,
		@Arg('stock') stock: number,
		@Arg('storeId') storeId: string,
		@Ctx() { em }: MyContext
	) {
		const newProduct = em.create(Product, {
			name: name,
			description: description,
			price: price,
			stock: stock,
			storeId: storeId,
			image: '',
		});
		await em.persistAndFlush(newProduct);
		return newProduct;
	}

	@Mutation(() => Product)
	async updateProduct(
		@Arg('id') id: string,
		@Arg('name', () => String, { nullable: true }) name: string,
		@Arg('description', () => String, { nullable: true }) description: string,
		@Ctx() { em }: MyContext
	) {
		const product = await em.findOne(Product, { id: id });
		if (!product) {
			return null;
		}

		if (typeof name !== 'undefined') {
			product.name = name;
		}
		if (typeof description !== 'undefined') {
			product.description = description;
		}
		await em.persistAndFlush(product);
		return product;
	}
}
