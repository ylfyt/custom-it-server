import { GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { ProductInterface } from '../interfaces';

import Products from '../models/Products';
import Stores from '../models/Stores';

const ProductType: GraphQLObjectType = new GraphQLObjectType({
	name: 'Product',
	fields: () => ({
		_id: { type: GraphQLID },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		price: { type: GraphQLInt },
		stock: { type: GraphQLInt },
		storeId: { type: GraphQLID },
		image: { type: GraphQLString },
		store: {
			type: StoreType,
			resolve: (parent, args) => {
				return Stores.findById(parent.storeId);
			},
		},
	}),
});

const StoreType: GraphQLObjectType = new GraphQLObjectType({
	name: 'Store',
	fields: () => ({
		_id: { type: GraphQLID },
		name: { type: GraphQLString },
		username: { type: GraphQLString },
		address: { type: GraphQLString },
		products: {
			type: new GraphQLList(ProductType),
			resolve: async (parent, args) => {
				const BASE_URL = process.env.BASE_URL + '/img';
				const products: ProductInterface[] = await Products.find({ storeId: parent._id });
				products.map((product) => (product.image = `${BASE_URL}/${product.image}`));
				return products;
			},
		},
	}),
});

const RootQuery: GraphQLObjectType = new GraphQLObjectType({
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

const Mutation: GraphQLObjectType = new GraphQLObjectType({
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

export default new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
