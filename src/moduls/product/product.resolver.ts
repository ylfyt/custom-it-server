import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Product } from '../../entities/Product';
import { Store } from '../../entities/Store';
import { MyContext } from '../../utils/types';
import { isAuth } from '../user/isAuth';
import { CreateProductInput } from './CreateProductInput';
import { UpdateProductInput } from './UpdateProductInput';

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

	@Mutation(() => Product, { nullable: true })
	@UseMiddleware(isAuth)
	async createProduct(@Arg('data') { name, description, price, stock }: CreateProductInput, @Ctx() { em, req }: MyContext) {
		const str = await em.findOne(Store, { username: req.user?.username });

		if (!str) {
			// TODO: Throw Error
			return null;
		}

		const newProduct = em.create(Product, {
			name: name,
			description: description,
			price: price,
			stock: stock,
			storeId: str.id,
			image: 'default.png',
		});
		await em.persistAndFlush(newProduct);
		return newProduct;
	}

	@Mutation(() => Product)
	async updateProduct(@Arg('id') id: string, @Arg('data') { name, description }: UpdateProductInput, @Ctx() { em }: MyContext) {
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
