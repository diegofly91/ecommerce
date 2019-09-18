import React, { Component,Fragment,useState, useEffect} from 'react';
import {useQuery} from 'react-apollo-hooks'
import Loading from '../Alertas/loader'
import Error from '../Alertas/Error'
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { direct } from '../../index';
import Paginator from 'react-hooks-paginator'
import { Icon } from 'semantic-ui-react'

import { PRODUCTOS_QUERY } from '../../queries'

 const ProductsV =  () => {
  const limit = 3;
  const [offset,useOffset] = useState(0);
  const [activePage,useActual] = useState(1);
  const [products,setData]= useState([]);
  const [countProducts, setCount] = useState(0);
  const { data, loading, error } = useQuery(PRODUCTOS_QUERY,{variables:{limit, offset}})
  useEffect( () => {
    if(data && data.products){
      setData(data.products)
      setCount(data.countProducts);
    }
  },[data]);
  if(loading && products.lenght==0) return <Loading />
  if(error) return <Error error={error}/>
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
          {products.map( item => (
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
        <div className="container pt-3 d-flex justify-content-center">
          <Paginator
            totalRecords={countProducts}
            pageNeighbours={1}
            pageLimit={limit}
            currentPage={activePage}
            setCurrentPage={useActual}
            setOffset={useOffset}
          />
        </div>   
    </Fragment>  
  )

}
class Products extends Component{
  render(){
    return (
      <ProductsV />
    )
  }
}
export default Products;