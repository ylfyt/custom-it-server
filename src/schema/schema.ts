import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

import Products from '../models/Products';
import Stores from '../models/Stores';

const ProductType: GraphQLObjectType = new GraphQLObjectType({
	name: 'Product',
	fields: () => ({
		_id: { type: GraphQLID },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		price: { type: GraphQLInt },
		storeId: { type: GraphQLID },
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
			resolve: (parent, args) => {
				return Products.find({ storeId: parent._id });
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
			resolve: (parent, args) => {
				return Products.findById(args._id);
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
			resolve: (parent, args) => {
				return Products.find();
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
				_id: { type: GraphQLID },
				name: { type: GraphQLString },
				description: { type: GraphQLString },
				price: { type: GraphQLInt },
				storeId: { type: GraphQLID },
			},
			resolve: (parent, args) => {
				console.log(args);
				return 'dsad';
			},
		},
	},
});

export default new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
