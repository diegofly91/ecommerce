import React, { Component,Fragment} from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { direct } from '../../index';
import Paginator from '../layout/paginator'

import { PRODUCTOS_QUERY } from '../../queries'

 class Products extends Component {
   limite = 3;
   state = {
         paginator : {
             offset : 0,
             actual : 1
         }
   }
   pagNext = () => {
     this.setState({
            paginator: {
              offset: this.state.paginator.offset + this.limite,
              actual: this.state.paginator.actual + 1,  
            }
       })
   }
   pagPrev = () => {
    this.setState({
          paginator: {
            actual: this.state.paginator.actual - 1,  
            offset: this.state.paginator.offset - this.limite,
          }
    })
   }
   render(){
      return (
          <Query query={PRODUCTOS_QUERY}  variables={{limit: this.limite, offset: this.state.paginator.offset}} pollInterval={1000}>
          {({ loading, error, data }) => {
              if(loading) return "Cargando ..";
              if(error){ 
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
                    <Paginator  total={data.countProducts} 
                                actual={this.state.paginator.actual} 
                                limite={this.limite} 
                                pagNext={this.pagNext}
                                pagPrev={this.pagPrev} />
                </Fragment>  
              );
              }}
          </Query>
        );
  }
}

export default Products;