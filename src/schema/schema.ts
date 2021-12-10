import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import _ from 'lodash';

const Products = [
	{
		_id: '12',
		name: 'Custom keyboard',
		description: 'Custom mechanical keyboard gateron',
		price: 600000,
		storeId: '1',
	},
	{
		_id: '13',
		name: 'Custom moodlamp',
		description: 'Beautiful moodlamp for night',
		price: 150000,
		storeId: '3',
	},
	{
		_id: '14',
		name: 'Custom Keycaps',
		description: 'Custom artisan keycaps',
		price: 60000,
		storeId: '1',
	},
];

const Stores = [
	{
		_id: '1',
		name: 'Toko Jaya Makmur',
		address: 'Jalan makmur nomor 3',
	},
	{
		_id: '3',
		name: 'Toko budi selalu',
		address: 'Jalan soekarno hatta',
	},
];

const ProductType: GraphQLObjectType = new GraphQLObjectType({
	name: 'Product',
	fields: () => ({
		_id: { type: GraphQLID },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		price: { type: GraphQLInt },
		storeId: { type: GraphQLID },
		image: { type: GraphQLString },
		store: {
			type: StoreType,
			resolve: (parent, args) => {
				return _.find(Stores, { _id: parent.storeId });
			},
		},
	}),
});

const StoreType: GraphQLObjectType = new GraphQLObjectType({
	name: 'Store',
	fields: () => ({
		_id: { type: GraphQLID },
		name: { type: GraphQLString },
		address: { type: GraphQLString },
		products: {
			type: new GraphQLList(ProductType),
			resolve: (parent, args) => {
				return _.filter(Products, { storeId: parent._id });
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
				return _.find(Products, { _id: args._id });
			},
		},
		store: {
			type: StoreType,
			args: { _id: { type: GraphQLID } },
			resolve: (parent, args) => {
				return _.find(Stores, { _id: args._id });
			},
		},
		products: {
			type: new GraphQLList(ProductType),
			resolve: (parent, args) => {
				return Products;
			},
		},
		stores: {
			type: new GraphQLList(StoreType),
			resolve: (parent, args) => {
				return Stores;
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
