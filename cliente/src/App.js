import React, { Fragment } from 'react';


import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


//import Components
import Usuarios from './components/usuarios/Usuarios'
import Headers from './components/header/header'
import verUsuario from './components/usuarios/verUsuario'
import products from './components/productos/products'
import editProducts from './components/productos/editProducts';
import newProducts from './components/productos/newProducts';
import Login from './components/productos/login'
//import { async } from 'q';

import Session from './components/Session'



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

const App = ({refetch, session}) => {
  const { obtenerUsuario } = session;
 // console.log("refech",refetch)
  let mensage;
  console.log("app",session)
  if(window.location.pathname !== "/login"){
     mensage = (!obtenerUsuario) ? <Redirect to="/login" />: 'Bienvenido' ;
  }else{
     mensage = "holamundo"
  }
  return(
      <Router>
          <Fragment>
                      <Headers session={session}/>
                      <div className="container">
                        <p className="text-right">{mensage}</p> 
                         <Switch>
                             <Route exact path="/login" render={ () => <Login refetch={refetch} />} />
                             <Route exact path="/usuarios" component={Usuarios} />
                             <Route exact path="/usuario/ver/:id" component={verUsuario} />
                             <Route exact path="/productos" component={products} />
                             <Route exact path="/producto/editar/:ruta" component={editProducts} />
                             <Route exact path="/producto/nuevo" component={newProducts} />
                         </Switch> 
                      </div> 
          </Fragment> 
      </Router>     
  )
}

const RootSession = Session(App)

export { RootSession }