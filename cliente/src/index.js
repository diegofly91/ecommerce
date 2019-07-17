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
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';

const direct = "http://localhost/ecommerce-graphQL/servidor";


const errorLink = onError(({ graphQLErrors,networkError }) => {
  console.log('graphQLErrors', graphQLErrors);
  console.log('networkLErrors', networkError);
});

const authLink = setContext(async(_, { headers }) => {
const token = await localStorage.getItem('token');
return {
    headers: {
      ...headers,
      authorization: token,
    }
  }
});

const link = createUploadLink({uri: "http://localhost:5000/graphql",});

const users = new ApolloClient({
     link: errorLink.concat(authLink.concat(link)),
    cache: new InMemoryCache({addTypename: false})
  });

ReactDOM.render( 
   <ApolloProvider client={users}><RootSession /></ApolloProvider>, 
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export {direct}
