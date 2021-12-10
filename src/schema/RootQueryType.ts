import { GraphQLID, GraphQLList, GraphQLObjectType } from 'graphql';
import { ProductInterface } from '../interfaces';

import Products from '../models/Products';
import Stores from '../models/Stores';

import { ProductType, StoreType } from './ObjectTypes';

export const RootQuery: GraphQLObjectType = new GraphQLObjectType({
	name: 'RootQuery',
	fields: {
		product: {
			type: ProductType,
			args: { _id: { type: GraphQLID } },
			resolve: async (parent, args) => {
				const BASE_URL = process.env.BASE_URL + '/img';
				const product: ProductInterface = await Products.findById(args._id);
				product.image = `${BASE_URL}/${product.image}`;
				return product;
			},
		},
		store: {
			type: StoreType,
			args: { _id: { type: GraphQLID } },
			resolve: (parent, args) => {
				return Stores.findById(args._id);
			},
		},
		products: {
			type: new GraphQLList(ProductType),
			resolve: async (parent, args) => {
				const BASE_URL = process.env.BASE_URL + '/img';
				const products: ProductInterface[] = await Products.find();
				products.map((product) => (product.image = `${BASE_URL}/${product.image}`));
				return products;
			},
		},
		stores: {
			type: new GraphQLList(StoreType),
			resolve: (parent, args) => {
				return Stores.find();
			},
		},
	},
});
