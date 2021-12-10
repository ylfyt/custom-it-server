import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

import Products from '../models/Products';
import Stores from '../models/Stores';

import { ProductType, StoreType } from './ObjectTypes';

export const Mutation: GraphQLObjectType = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addProduct: {
			type: ProductType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				description: { type: new GraphQLNonNull(GraphQLString) },
				price: { type: new GraphQLNonNull(GraphQLInt) },
				stock: { type: new GraphQLNonNull(GraphQLInt) },
				storeId: { type: new GraphQLNonNull(GraphQLID) },
				image: { type: GraphQLString },
			},
			resolve: (parent, args) => {
				if (parseInt(args.stock) < 0) {
					throw new Error('Stock Error');
				}

				const newProduct = new Products({
					name: args.name,
					description: args.description,
					price: args.price,
					stock: args.stock,
					storeId: args.storeId,
					image: args.image,
				});

				return newProduct.save();
			},
		},
		addStore: {
			type: StoreType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				username: { type: new GraphQLNonNull(GraphQLString) },
				address: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve: (parent, args) => {
				const newStore = new Stores({
					name: args.name,
					username: args.username,
					address: args.address,
				});

				return newStore.save();
			},
		},
	},
});
