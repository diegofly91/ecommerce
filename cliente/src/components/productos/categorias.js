import React, {  Fragment } from 'react';
import {CATEGORYS_QUERY} from '../../queries';
import { Query } from 'react-apollo';
import format from 'timeago.js'
import { direct } from '../../index'


const Categorys = () =>(
            <Query query={CATEGORYS_QUERY} >
                  {({loading, error, data}) =>{
                      if(loading) return "Cargando";
                      if(error) return `Error ${error}`;
                      console.log(data.category)
                      return (
                        <Fragment >
                             <h2 className="text-center">Listado Categorias</h2>
                             <ul className="list-group col-md-10 mx-auto">
                               {data.category.map( item => 
                                   item.id_categoria === null ? 
                                    <li className="list-group-item" key={item.id}> 
                                        <div className="col-md-12 d-flex flex-wrap">    
                                            <div className="col-md-6 d-flex justify-content-between align-items-center  flex-column p-0 m-0">
                                                    <h4 className="text-ligth  text-uppercase"> {item.nombre}</h4> 
                                                    <figure>
                                                        {item.image !== null ?
                                                            <img src={`${direct}${item.image}`}  alt="" className="img-responsive"/> 
                                                            :  <img src={`${direct}/sin-img.jpg`}  alt="" className="img-responsive"/>           
                                                        }
                                                    </figure> 
                                                    <span>Ruta: {item.ruta}</span> 
                                                        {item.fecha ? <span>Editado: format(item.fecha) </span> : ''}           
                                            </div>
                                            <div className="col-md-6 d-flex justify-space-around align-items-center  flex-column p-0 m-0">
                                                     {data.category.map( itemS => (
                                                         item.id == itemS.id_categoria ?
                                                         <h4 className="text-ligth  text-uppercase" key={itemS.id}> {itemS.nombre}</h4>   
                                                         : ''
                                                     ))}
                                            </div>
                                        </div>   
                                     </li> 
                                    : ''              
                               )} 
                             </ul>
                        </Fragment>  
                      );
                    }  
                    }     
                </Query>  
  )

export default Categorys;