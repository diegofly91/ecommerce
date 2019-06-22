import React from 'react';
import { Link } from 'react-router-dom';

const Headers = () =>(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between d-flex mb-5">
        <div className="container">
            <Link to="/"className="navbar-brand text-light font-weight-bold">CRM</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navegacion" aria-controls="navegacion" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navegacion">
                <ul className="navbar-nav ml-auto text-right">
                    <li className="nav-item active">
                        <Link to="/usuarios" className="btn btn-dark text-white">Usuarios</Link>
                    </li>
                    <li className="nav-item active dropdown ml-3">
                          <a className="nav-link dropdown-toggle" 
                              href="#" 
                             id="navbarDropdown" 
                             role="button" 
                             data-toggle="dropdown" 
                             aria-haspopup="true" 
                             aria-expanded="false">
                              productos
                          </a>
                            <div className="dropdown-menu text-white" aria-labelledby="navbarDropdown">
                                <Link to="/productos" className="btn dropdown-item text-right">Ver todos</Link>
                                <Link to="/productos" className="btn dropdown-item text-right">Agregar</Link>
                                <Link to="/productos" className="btn dropdown-item text-right">Ofertas</Link>
                            </div>
                       
                    </li>
                    <li className="nav-item active ml-3">
                        <Link to="/pedidos" className="btn btn-dark text-white">Pedidos</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

export default Headers;