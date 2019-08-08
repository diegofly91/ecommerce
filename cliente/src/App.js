import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/home/home'
import Usuarios from './components/usuarios/Usuarios'
import Headers from './components/header/header'
import verUsuario from './components/usuarios/verUsuario'
import products from './components/productos/products'
import editProducts from './components/productos/editProducts';
import newProducts from './components/productos/newProducts';
import Login from './components/Auth/login'
import Session from './components/Session'
import Market from './components/makers/Market'
import EditCategory from './components/categoria/editCategory'
import NewCategory from './components/categoria/newCategory'
import UploadImage from './components/categoria/imgCategory'
import Ofertas from './components/ofertas/ofertas'
import NewOferta from './components/ofertas/newOfertas'

import PrivateRoute from './components/PrivateRoute'
import Categorys from './components/categoria/category';

const App = ({refetch, session}) => {
  const { obtenerUsuario } = session;
    return(
      <Router>
          <Fragment>
                      <Headers session={session}/>
                      <div className="container"> 
                         <Switch>
                             <Route exact path="/login" usuarioAutenticado={obtenerUsuario}  render={ () => <Login refetch={refetch} />} /> 
                             <PrivateRoute exact path="/usuarios"  refetch={refetch} usuarioAutenticado={obtenerUsuario} component={Usuarios} />
                             <PrivateRoute exact path="/categorias"  refetch={refetch} usuarioAutenticado={obtenerUsuario} component={Categorys} />
                             <PrivateRoute exact path="/usuario/ver/:id" refetch={refetch}  usuarioAutenticado={obtenerUsuario}  component={verUsuario} />
                             <PrivateRoute exact path="/productos" refetch={refetch}  usuarioAutenticado={obtenerUsuario} component={products} />
                             <PrivateRoute exact path="/producto/editar/:ruta" refetch={refetch}  usuarioAutenticado={obtenerUsuario} component={editProducts} />
                             <PrivateRoute exact path="/producto/nuevo" refetch={refetch}  usuarioAutenticado={obtenerUsuario} component={newProducts} />
                             <PrivateRoute exact path="/categoria/editar/:id" refetch={refetch}  usuarioAutenticado={obtenerUsuario} component={EditCategory} />
                             <PrivateRoute exact path="/categoria/nueva/:id" refetch={refetch}  usuarioAutenticado={obtenerUsuario} component={NewCategory} />
                             <PrivateRoute exact path="/categoria/imagen" refetch={refetch}  usuarioAutenticado={obtenerUsuario} component={UploadImage} />
                             <PrivateRoute exact path="/ofertas" refetch={refetch}  usuarioAutenticado={obtenerUsuario} component={Ofertas} />
                             <PrivateRoute exact path="/oferta/nueva" refetch={refetch}  usuarioAutenticado={obtenerUsuario} component={NewOferta} />
                             <PrivateRoute exact path="/" refetch={refetch}  usuarioAutenticado={obtenerUsuario} component={Home} />
                             <Route exact path="/Tienda" component={Market} />
                         </Switch> 
                      </div> 
          </Fragment> 
      </Router>     
  )
}

const RootSession = Session(App)

export { RootSession }