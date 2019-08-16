import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import CerrarSession from '../layout/cerrarSesion'

const Headers = ({session}) =>{
    let barra = (session.obtenerUsuario)? <NavegationAuthentication/> : <NavegationNoAuthentication /> ;
    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between d-flex mb-5">
        <div className="container">
            {barra}
        </div>
    </nav>
    )
};

const NavegationNoAuthentication = () => (
    <h3 to="/"className="navbar-brand text-light font-weight-bold">CRM</h3>
);

const NavegationAuthentication = () => (
   <Fragment>
           <Link to="/"className="navbar-brand text-light font-weight-bold">CRM</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navegacion" aria-controls="navegacion" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navegacion">
                <ul className="navbar-nav ml-auto text-right">
                    <li className="nav-item active">
                        <Link to="/usuarios" className="btn btn-dark text-white">Usuarios</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/productos" className="btn btn-dark text-white">Productos</Link>
                    </li>
                    <li className="nav-item active ml-3">
                        <Link to="/categorias" className="btn btn-dark text-white">Categorias</Link>
                    </li>
                    <li className="nav-item active ml-3">
                        <Link to="/oferta/nueva" className="btn btn-dark text-white">Ofertas</Link>
                    </li>
                    <li className="nav-item active ml-3">
                        <Link to="/pedidos" className="btn btn-dark text-white">Pedidos</Link>
                    </li>
                    <li>
                        <CerrarSession />
                    </li>
                </ul>
            </div>
   </Fragment>
);

export default Headers;