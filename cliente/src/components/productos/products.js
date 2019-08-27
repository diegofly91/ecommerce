import React, { Component,Fragment} from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { direct } from '../../index';
import Paginator from '../layout/paginator'
import { Icon } from 'semantic-ui-react'

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
                     <div style={{position:"absolute", top:"-30px",right:"10px", zIndex:"20"}}>             
                        <Link to={`/producto/nuevo`}>
                              <Icon 
                                  name='plus circle' 
                                  color="blue" 
                                  size="big" 
                                  style={{cursor:'pointer'}}
                                  title="agregar producto"
                                />
                        </Link>
                    </div>
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
                                          <span className="font-weight-bold" style={{fontSize:"17px"}}>Precio: ${item.precio}</span> 
                                          <span className="font-weight-bold" style={{fontSize:"17px"}}>Editado: {format(item.fecha)}</span>              
                                       </div>
                                        <div className="col-md-3 d-flex justify-content-center align-items-center flex-column"> 
                                          {item.oferta?
                                            <Link to={`/oferta/editar/${item.oferta.id}`} style={{position:"relative",fontSize:"12.5px", zIndex:2,marginBottom:"10px"}}> 
                                                <Icon 
                                                    name='star' 
                                                    color={item.oferta.activo?"red":"grey"} 
                                                    size="massive" 
                                                    style={{cursor:'pointer',position:"relative", zIndex:2}}
                                                    title={item.oferta.activo?"oferta activa":"oferta desactivada"} 
                                                >    
                                                  <span style={{position:'absolute',top:"50%",left:"50%",transform:'translate(-50%,-50%)',fontSize:"23px", color:"#fff"}}> 
                                                    {item.oferta.typoDescuent.simbolo} {item.oferta.descuento}
                                                  </span>
                                                </Icon>   
                                            </Link> 
                                            :''}
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