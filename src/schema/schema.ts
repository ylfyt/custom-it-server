import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
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

const ProductType: GraphQLObjectType = new GraphQLObjectType({
	name: 'Product',
	fields: () => ({
		_id: { type: GraphQLID },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		price: { type: GraphQLInt },
		storeId: { type: GraphQLID },
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
	},
});

export default new GraphQLSchema({
	query: RootQuery,
});
