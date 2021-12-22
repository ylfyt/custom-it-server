// import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

// import { ProductInterface } from '../interfaces';

// import Products from '../models/Products';
// import Stores from '../models/Stores';

// export const ProductType: GraphQLObjectType = new GraphQLObjectType({
// 	name: 'Product',
// 	fields: () => ({
// 		_id: { type: GraphQLID },
// 		name: { type: GraphQLString },
// 		description: { type: GraphQLString },
// 		price: { type: GraphQLInt },
// 		stock: { type: GraphQLInt },
// 		storeId: { type: GraphQLID },
// 		image: { type: GraphQLString },
// 		store: {
// 			type: StoreType,
// 			resolve: (parent, args) => {
// 				return Stores.findById(parent.storeId);
// 			},
// 		},
// 	}),
// });

// export const StoreType: GraphQLObjectType = new GraphQLObjectType({
// 	name: 'Store',
// 	fields: () => ({
// 		_id: { type: GraphQLID },
// 		name: { type: GraphQLString },
// 		username: { type: GraphQLString },
// 		address: { type: GraphQLString },
// 		products: {
// 			type: new GraphQLList(ProductType),
// 			resolve: async (parent, args) => {
// 				const BASE_URL = process.env.BASE_URL + '/img';
// 				const products: ProductInterface[] = await Products.find({ storeId: parent._id });
// 				products.map((product) => (product.image = `${BASE_URL}/${product.image}`));
// 				return products;
// 			},
// 		},
// 	}),
// });
