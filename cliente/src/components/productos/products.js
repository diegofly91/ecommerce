import React, {Fragment} from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { direct } from '../../index';

import { PRODUCTOS_QUERY } from '../../queries'

const Products = () =>(
  
  <Query query={PRODUCTOS_QUERY} pollInterval={1000}>
      {({ loading, error, data }) => {
          if(loading) return "Cargando ..";
          if(error){ 
            console.log(error);
            return `${error.message}`;
          };
          return (
            <Fragment >
                 <h2 className="text-center">Listado Productos</h2>
                 <ul className="list-group col-md-10 mx-auto">
                   {data.products.map( item => (
                     <li className="list-group-item" key={item.id}> 
                               <div className="row justify-content-between align-items-center">
                                    <div className="col-md-3 d-flex justify-content-between align-items-center text-uppercase">
                                      <figure>
                                         {item.image[0] !== undefined ?
                                             <img src={`${direct}${item.image[0].imagen}`}  alt="" className="img-responsive"/> 
                                             :  <img src={`${direct}/sin-img.jpg`}  alt="" className="img-responsive"/>           
                                         }
                                      </figure> 
                                    </div>
                                    <div className="col-md-6 d-flex flex-column text-center">
                                      <h4 className="text-ligth  text-uppercase"> {item.nombre}</h4> 
                                      <span>Precio: ${item.precio}</span> 
                                      <span>Editado: {format(item.fecha)}</span>           
                                    </div>
                                    <div className="col-md-3 d-flex justify-content-center align-items-center"> 
                                        <Link to={`/producto/editar/${item.ruta}`} className="btn btn-success d-block d-md-inline-block">
                                            Editar Producto
                                        </Link>
                                    </div>
                               </div>  
                     </li>
                   ))} 
                 </ul>
            </Fragment>  
          );
     }}
</Query>
);

export default Products;