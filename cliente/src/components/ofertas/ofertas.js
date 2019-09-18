import React, { Component, Fragment, useState, useEffect } from 'react'
import {OFERTAS_QUERY} from '../../queries'
import {useQuery} from 'react-apollo-hooks'
import { direct } from '../../index';
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Error from '../Alertas/Error'
import Loading from '../Alertas/loader'
import { format } from 'timeago.js';
import RemoveOfert from './removeOferta'
import Paginator from 'react-hooks-paginator'

export const OfertasV =  () => {
        const limit = 3;
        const [offset,useOffset] = useState(0);
        const [activePage,useActual] = useState(1);
        const [ofertas,setData]= useState([]);
        const [countOfertas, setCount] = useState(0);
        const { data, loading, error, refetch } = useQuery(OFERTAS_QUERY,{variables:{limit, offset}, fetchPolicy:"network-only"})
        useEffect( () => {
          if(data && data.ofertas){
            setData(data.ofertas)
            setCount(data.countOfertas);
          }
        },[data]);
        if(loading && ofertas.lenght==0) return <Loading />
        if(error) return <Error error={error}/>
        return (
             <Fragment >
                      <h2 className="text-center">Lista de ofertas</h2>
                      <ul className="list-group col-md-10 mx-auto">
                       <div style={{position:"absolute", top:"-30px",right:"10px", zIndex:"20"}}>
                          <Link to={`/oferta/nueva`}>
                                <Icon 
                                    name='plus circle' 
                                    color="blue" 
                                    size="big" 
                                    style={{cursor:'pointer'}}
                                    title="agregar oferta"
                                  />
                          </Link>
                      </div>
                        {ofertas.map( item => (
                          <li className="list-group-item" key={item.id}> 
                                    <div className="row justify-content-between align-items-center">
                                          <div className="col-md-4 d-flex justify-content-center align-items-center text-uppercase">
                                            <Link to={`/producto/editar/${item.product.ruta}`}>
                                                <figure className="m-2">
                                                {item.product.image[0] !== undefined ?
                                                    <img src={`${direct}${item.product.image[0].imagen}`}  alt="" className="img-responsive"/> 
                                                    :  <img src={`${direct}/sin-img.jpg`}  alt="" className="img-responsive"/>           
                                                }
                                                </figure> 
                                            </Link>
                                          </div>
                                          <div className="col-md-4 d-flex flex-column text-center">
                                            <h4 className="text-ligth  text-uppercase"> {item.product.nombre}</h4> 
                                            <span  className="font-weight-bold" style={{fontSize:"17px"}}>fecha inicio: { (item.fecha_inicio)?format(item.fecha_inicio, 'es_AR'): 'Vacio'}</span>
                                            <span  className="font-weight-bold" style={{fontSize:"17px"}}>fecha fin: {(item.fecha_fin)?format(item.fecha_fin, 'es_AR'): 'Vacio'}</span>  
                                            <span  className="font-weight-bold" style={{fontSize:"17px"}}>Editado: {format(item.fecha, 'es_AR')}</span>           
                                          </div>
                                          <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
                                                    <h3 className="text-center">descuento</h3>
                                                    <Icon 
                                                        name='star' 
                                                        color={item.activo?"red":"grey"} 
                                                        size="massive" 
                                                        style={{cursor:'pointer',position:"relative", zIndex:2}}
                                                        title={item.activo?"oferta activa":"oferta desactivada"} 
                                                    >
                                                     <Link to={`/oferta/editar/${item.id}`} style={{position:"absolute",fontSize:"20px", zIndex:2}}>
                                                        <Icon 
                                                            name='edit' 
                                                            color="blue" 
                                                            style={{cursor:'pointer',}}
                                                            title="editar oferta"
                                                        />  
                                                     </Link>
                                                     <RemoveOfert id={item.id} name={item.product.nombre} refetch={refetch} />
                                                    <span style={{position:'absolute',top:"50%",left:"50%",transform:'translate(-50%,-50%)',fontSize:"23px", color:"#fff"}}> 
                                                     {item.typoDescuent.simbolo} {item.descuento}
                                                    </span>
                                                    </Icon>   
                                          </div>
                                    </div>  
                          </li>
                        ))} 
                      </ul>
                      <Paginator
                            totalRecords={countOfertas}
                            pageNeighbours={1}
                            pageLimit={limit}
                            currentPage={activePage}
                            setCurrentPage={useActual}
                            setOffset={useOffset}
                        />
                  </Fragment>
        )
}

class Ofertas extends Component{
    render(){
      return (
        <OfertasV />
      )
    }
  }
  export default Ofertas;

// class Ofertas extends Component{
//     limite = 3;
//     state = {
//             paginator : {
//                 offset : 0,
//                 actual : 1
//             }
//     }
//     pagNext = () => {
//         this.setState({
//                 paginator: {
//                 offset: this.state.paginator.offset + this.limite,
//                 actual: this.state.paginator.actual + 1,  
//                 }
//         })
//     }
//     pagPrev = () => {
//         this.setState({
//             paginator: {
//                 actual: this.state.paginator.actual - 1,  
//                 offset: this.state.paginator.offset - this.limite,
//             }
//         })
//     }
//     render(){
//         return(
//             <Query query={OFERTAS_QUERY}  variables={{limit: this.limite, offset: this.state.paginator.offset}} fetchPolicy="network-only">
//             {({ loading, error, data, refetch }) => {
//                  if(loading) return <Loading />;
//                  if(error) return <Error  error={error} />;
//                 return (
//                   <Fragment >
//                       <h2 className="text-center">Lista de ofertas</h2>
//                       <ul className="list-group col-md-10 mx-auto">
//                        <div style={{position:"absolute", top:"-30px",right:"10px", zIndex:"20"}}>
//                           <Link to={`/oferta/nueva`}>
//                                 <Icon 
//                                     name='plus circle' 
//                                     color="blue" 
//                                     size="big" 
//                                     style={{cursor:'pointer'}}
//                                     title="agregar oferta"
//                                   />
//                           </Link>
//                       </div>
//                         {data.ofertas.map( item => (
//                           <li className="list-group-item" key={item.id}> 
//                                     <div className="row justify-content-between align-items-center">
//                                           <div className="col-md-4 d-flex justify-content-center align-items-center text-uppercase">
//                                             <Link to={`/producto/editar/${item.product.ruta}`}>
//                                                 <figure className="m-2">
//                                                 {item.product.image[0] !== undefined ?
//                                                     <img src={`${direct}${item.product.image[0].imagen}`}  alt="" className="img-responsive"/> 
//                                                     :  <img src={`${direct}/sin-img.jpg`}  alt="" className="img-responsive"/>           
//                                                 }
//                                                 </figure> 
//                                             </Link>
//                                           </div>
//                                           <div className="col-md-4 d-flex flex-column text-center">
//                                             <h4 className="text-ligth  text-uppercase"> {item.product.nombre}</h4> 
//                                             <span  className="font-weight-bold" style={{fontSize:"17px"}}>fecha inicio: { (item.fecha_inicio)?format(item.fecha_inicio, 'es_AR'): 'Vacio'}</span>
//                                             <span  className="font-weight-bold" style={{fontSize:"17px"}}>fecha fin: {(item.fecha_fin)?format(item.fecha_fin, 'es_AR'): 'Vacio'}</span>  
//                                             <span  className="font-weight-bold" style={{fontSize:"17px"}}>Editado: {format(item.fecha, 'es_AR')}</span>           
//                                           </div>
//                                           <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
//                                                     <h3 className="text-center">descuento</h3>
//                                                     <Icon 
//                                                         name='star' 
//                                                         color={item.activo?"red":"grey"} 
//                                                         size="massive" 
//                                                         style={{cursor:'pointer',position:"relative", zIndex:2}}
//                                                         title={item.activo?"oferta activa":"oferta desactivada"} 
//                                                     >
//                                                      <Link to={`/oferta/editar/${item.id}`} style={{position:"absolute",fontSize:"20px", zIndex:2}}>
//                                                         <Icon 
//                                                             name='edit' 
//                                                             color="blue" 
//                                                             style={{cursor:'pointer',}}
//                                                             title="editar oferta"
//                                                         />  
//                                                      </Link>
//                                                      <RemoveOfert id={item.id} name={item.product.nombre} refetch={refetch} />
//                                                     <span style={{position:'absolute',top:"50%",left:"50%",transform:'translate(-50%,-50%)',fontSize:"23px", color:"#fff"}}> 
//                                                      {item.typoDescuent.simbolo} {item.descuento}
//                                                     </span>
//                                                     </Icon>   
//                                           </div>
//                                     </div>  
//                           </li>
//                         ))} 
//                       </ul>
//                       <Paginator  total={data.countOfertas} 
//                                   actual={this.state.paginator.actual} 
//                                   limite={this.limite} 
//                                   pagNext={this.pagNext}
//                                   pagPrev={this.pagPrev} />
//                   </Fragment>  
//                 );
//                 }}
//             </Query>
//         )
//     }
// }
// export default Ofertas;