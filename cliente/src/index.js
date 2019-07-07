import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import * as serviceWorker from './serviceWorker';


import {RootSession} from './App';

import { ApolloClient } from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'
import {InMemoryCache} from 'apollo-cache-inmemory';
import { ApolloProvider }from 'react-apollo';

const direct = "http://localhost/ecommerce-graphQL/servidor";

// const getToken = async () => {
//   const token =  localStorage.getItem('token')
//   console.log(token)
//   return token
// }
// const token = getToken()

const link = createUploadLink({uri: "http://localhost:5000/graphql",
                               headers: {
                                authorization: localStorage.getItem('token')
                               },
                                // request: operation => {
                                //   const token = localStorage.getItem('token');
                                //   operation.setContext({
                                //     headers: {
                                //       authorization: token
                                //     },
                                //   })
                                // }   
                          });

const users = new ApolloClient({
    link,
    cache: new InMemoryCache({addTypename: false}),
    onError: (e) => { console.log(e) },
  });

ReactDOM.render(  <ApolloProvider client={users}><RootSession /></ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export {direct}
