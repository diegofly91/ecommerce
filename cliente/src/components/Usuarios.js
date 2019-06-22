import React, {Fragment} from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';

import { USUARIOS_QUERY } from '../queries'

const Usuarios = () =>(
  <Query query={USUARIOS_QUERY}>
      {({ loading, error, data }) => {
          if(loading) return "Cargando ..";
          if(error){ 
            console.log(error);
            return `${error.message}`;
          };
          return (
            <Fragment >
                 <h2 className="text-center">Listado Clientes</h2>
                 <ul className="list-group col-md-10 mx-auto">
                   {data.users.map( item => (
                     <li className="list-group-item" key={item.id}> 
                               <div className="row justify-content-between align-items-center">
                                    <div className="col-md-4 flex-column align-item-center">
                                      <div>{item.nombre}</div> 
                                      <p>{format(item.fecha,'es')}</p>
                                    </div>
                                    <div className="col-md-4 d-flex justify-content-between align-items-center text-uppercase">
                                    {item.typoUsers[0].nombre} 
                                    </div>
                                    <div className="col-md-4 d-flex justify-content-center align-items-center"> 
                                        <Link to={`/usuario/ver/${item.id}`} className="btn btn-success d-block d-md-inline-block">Ver Cliente</Link>
                                    </div>
                               </div>  
                     </li>
                   ))} 
                 </ul>
            </Fragment>  
          )
      }}
  </Query>
);

export default Usuarios;