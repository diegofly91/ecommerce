import React, { Fragment } from 'react';
import { ApolloProvider }from 'react-apollo';
import { ApolloClient } from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'
import {InMemoryCache} from 'apollo-cache-inmemory';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


//import Components
import Usuarios from './components/Usuarios'
import Headers from './components/header'
import verUsuario from './components/verUsuario'
import products from './components/products'
import editProducts from './components/editProducts';

const link = createUploadLink({uri: "http://localhost:5000/graphql"});

const users = new ApolloClient({
    link,
    cache: new InMemoryCache({addTypename: false}),
    onError: (e) => { console.log(e) },
  });

// const users = new ApolloClient({
//   uri: "http://localhost:5000/graphql",
//   cache: new InMemoryCache({
//   addTypename: false
//   }),
//   onError: ({networkError, graphQLErrors}) => {
//     console.log('graphQLErrors', graphQLErrors);
//     console.log('networkError', networkError);
//   }
// });

function App() {
  return (
    <ApolloProvider client={users}>
      <Router>
          <Fragment>
                      <Headers /> 
                      <div className="container">
                         <Switch>
                             <Route exact path="/usuarios" component={Usuarios} />
                             <Route exact path="/usuario/ver/:id" component={verUsuario} />
                             <Route exact path="/productos" component={products} />
                             <Route exact path="/producto/editar/:ruta" component={editProducts} />
                         </Switch> 
                      </div> 
          </Fragment> 
      </Router>     
    </ApolloProvider>
  );
}

export default App;
