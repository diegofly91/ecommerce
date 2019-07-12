import express from 'express';

//graphqlnp

import { ApolloServer  } from 'apollo-server-express';

//resolvers y definitions
import { typeDefs } from './data/schema';
import { resolvers } from './data/resolvers';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config({path:'variables.env'});


const app = express();

const server = new ApolloServer({
                                 typeDefs,
                                 resolvers,
                                 context : async({req})=>{
                                     const token = req.headers['authorization']
                                     if(token !== "null"){
                                         try {
                                             //verificamos el token
                                             const usuarioActual = await jwt.verify(token,process.env.SECRETO)
                                             //agregamos el mail al request
                                             console.log(usuarioActual)
                                             req.mail = usuarioActual;
                                             return { usuarioActual }
                                         } catch (err) {
                                             console.error(err)
                                         }
                                     }
                                 }
                                });

server.applyMiddleware({app});

app.listen({port: 5000},  () => console.log(`servidor esta corriendo ${server.graphqlPath}`));

