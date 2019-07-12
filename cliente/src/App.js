import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Usuarios from './components/usuarios/Usuarios'
import Headers from './components/header/header'
import verUsuario from './components/usuarios/verUsuario'
import products from './components/productos/products'
import editProducts from './components/productos/editProducts';
import newProducts from './components/productos/newProducts';
import Login from './components/Auth/login'
import Session from './components/Session'

import PrivateRoute from './components/PrivateRoute'

const App = ({refetch, session}) => {
  const { obtenerUsuario } = session;
  console.log(obtenerUsuario)
    return(
      <Router>
          <Fragment>
                      <Headers session={session}/>
                      <div className="container"> 
                         <Switch>
                             <Route exact path="/login" usuarioAutenticado={obtenerUsuario} render={ () => <Login refetch={refetch} />} /> 
                             <PrivateRoute exact path="/usuarios" usuarioAutenticado={obtenerUsuario} component={Usuarios} />
                             <PrivateRoute exact path="/usuario/ver/:id" usuarioAutenticado={obtenerUsuario}  component={verUsuario} />
                             <PrivateRoute exact path="/productos" usuarioAutenticado={obtenerUsuario} component={products} />
                             <PrivateRoute exact path="/producto/editar/:ruta" usuarioAutenticado={obtenerUsuario} component={editProducts} />
                             <PrivateRoute exact path="/producto/nuevo" usuarioAutenticado={obtenerUsuario} component={newProducts} />
                             <PrivateRoute exact path="/" usuarioAutenticado={obtenerUsuario} component={Login} />
                             <PrivateRoute path="*" component={Login} />
                         </Switch> 
                      </div> 
          </Fragment> 
      </Router>     
  )
}

const RootSession = Session(App)

export { RootSession }