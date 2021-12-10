import { GraphQLSchema } from 'graphql';

import { RootQuery } from './RootQueryType';
import { Mutation } from './MutationType';

export default new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
