import express from 'express';

//graphqlnp

import { ApolloServer  } from 'apollo-server-express';

//resolvers y definitions
import { typeDefs } from './data/schema';
import { resolvers } from './data/resolvers';


const app = express();

const server = new ApolloServer({typeDefs,resolvers,});

server.applyMiddleware({app});

app.listen({port: 5000},  () => console.log(`servidor esta corriendo ${server.graphqlPath}`));

